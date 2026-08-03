const PurchaseOrder = require('../model/purchaseOrderModel.js');
const Supplier = require('../model/supplierModel.js');
const Product = require('../model/productModel.js');
const Warehouse = require('../model/warehouseModel.js');


// Register Purchase Order
const registerPurchaseOrder = async (req, res) => {
    try {
        const {
            supplier,
            orderDate,
            expectedDeliveryDate,
            items,
            shippingCharges,
            otherCharges,
            currency,
            paymentTerms,
            shippingAddress,
            notes
        } = req.body;

        // Required field validation
        if (
            !supplier ||
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Supplier and Purchase Order Items are Required'
            });
        }

        const adminID = req.adminID;

        const createdBy = req.employeeID;

        if (!createdBy) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Employee Authentication Required'
            });
        }

        // Check Supplier
        const existSupplier = await Supplier.findOne({
            _id: supplier,
            adminID
        });

        if (!existSupplier) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Supplier'
            });
        }

        // Check Shipping Warehouse
        if (
            shippingAddress &&
            shippingAddress.warehouse
        ) {
            const existWarehouse = await Warehouse.findOne({
                _id: shippingAddress.warehouse,
                adminID
            });

            if (!existWarehouse) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Invalid Shipping Warehouse'
                });
            }
        }

        // Validate Expected Delivery Date
        if (
            expectedDeliveryDate &&
            orderDate &&
            new Date(expectedDeliveryDate) < new Date(orderDate)
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Expected Delivery Date cannot be before Order Date'
            });
        }

        // Validate and Calculate Items
        const processedItems = [];

        let subtotal = 0;
        let discountAmount = 0;
        let taxAmount = 0;

        for (const item of items) {

            if (
                !item.product ||
                !item.quantity ||
                item.unitPrice === undefined
            ) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Product, Quantity and Unit Price are Required for Every Item'
                });
            }

            // Check Product belongs to Admin
            const existProduct = await Product.findOne({
                _id: item.product,
                adminID
            });

            if (!existProduct) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Invalid Product in Purchase Order'
                });
            }

            const quantity = Number(item.quantity);
            const unitPrice = Number(item.unitPrice);
            const taxRate = Number(item.taxRate || 0);
            const discount = Number(item.discount || 0);

            // Calculate base amount
            const baseAmount = quantity * unitPrice;

            // Calculate discount
            const itemDiscount =
                baseAmount * (discount / 100);

            // Calculate amount after discount
            const amountAfterDiscount =
                baseAmount - itemDiscount;

            // Calculate tax
            const itemTax =
                amountAfterDiscount * (taxRate / 100);

            // Calculate total amount
            const totalAmount =
                amountAfterDiscount + itemTax;

            subtotal += baseAmount;

            discountAmount += itemDiscount;

            taxAmount += itemTax;

            processedItems.push({
                product: item.product,
                quantity,
                unitPrice,
                taxRate,
                discount,
                totalAmount
            });
        }

        // Calculate Charges
        const finalShippingCharges =
            Number(shippingCharges || 0);

        const finalOtherCharges =
            Number(otherCharges || 0);

        // Calculate Grand Total
        const grandTotal =
            subtotal -
            discountAmount +
            taxAmount +
            finalShippingCharges +
            finalOtherCharges;


        // Generate Purchase Order Number
        let nextSeq = 1;

        const lastPurchaseOrder = await PurchaseOrder
            .findOne({ adminID })
            .sort({ _id: -1 });

        if (
            lastPurchaseOrder &&
            lastPurchaseOrder.purchaseOrderNumber
        ) {
            const lastCode =
                parseInt(
                    lastPurchaseOrder.purchaseOrderNumber
                        .split('-')[1],
                    10
                );

            nextSeq = lastCode + 1;
        }

        const purchaseOrderNumber =
            `PO-${nextSeq
                .toString()
                .padStart(5, '0')}`;


        // Create Purchase Order
        const response = await PurchaseOrder.create({
            adminID,
            purchaseOrderNumber,
            supplier,
            orderDate,
            expectedDeliveryDate,
            items: processedItems,
            subtotal,
            discountAmount,
            taxAmount,
            shippingCharges: finalShippingCharges,
            otherCharges: finalOtherCharges,
            grandTotal,
            currency,
            paymentTerms,
            shippingAddress,
            status: 'Draft',
            notes,
            createdBy
        });


        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Purchase Order Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Purchase Order Created Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Purchase Order Registration failed...!',
            error: error.message
        });
    }
};


// View Purchase Orders
const viewPurchaseOrder = async (req, res) => {
    try {
        const adminID = req.adminID;

        const PurchaseOrderData =
            await PurchaseOrder.find({ adminID })
                .populate(
                    'supplier',
                    'supplierCode companyName contactPerson email phone'
                )
                .populate(
                    'items.product',
                    'productCode productName productType'
                )
                .populate(
                    'shippingAddress.warehouse',
                    'warehouseCode warehouseName warehouseType'
                )
                .populate(
                    'createdBy',
                    'employeeCode firstName lastName'
                )
                .populate(
                    'approvedBy',
                    'employeeCode firstName lastName'
                )
                .populate(
                    'updatedBy',
                    'employeeCode firstName lastName'
                )
                .sort({
                    createdAt: -1
                });


        if (!PurchaseOrderData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Purchase Order Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Purchase Order Data Fetched Successfully',
            data: PurchaseOrderData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Purchase Order Data',
            error: error.message
        });
    }
};


// Approve Purchase Order
const approvePurchaseOrder = async (req, res) => {
    try {
        const {
            purchaseOrderID
        } = req.body;

        if (!purchaseOrderID) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Purchase Order ID is Required'
            });
        }

        const adminID = req.adminID;

        const purchaseOrder =
            await PurchaseOrder.findOne({
                _id: purchaseOrderID,
                adminID
            });

        if (!purchaseOrder) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Purchase Order not found'
            });
        }

        if (
            purchaseOrder.status !== 'Pending Approval'
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: `Purchase Order cannot be approved because current status is ${purchaseOrder.status}`
            });
        }

        const response =
            await PurchaseOrder.findOneAndUpdate(
                {
                    _id: purchaseOrderID,
                    adminID
                },
                {
                    status: 'Approved',
                    approvedBy: req.employeeID,
                    updatedBy: req.employeeID
                },
                {
                    new: true
                }
            );

        return res.status(200).json({
            status: 'Success',
            message: 'Purchase Order Approved Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Purchase Order Approval failed...!',
            error: error.message
        });
    }
};


// Cancel Purchase Order
const cancelPurchaseOrder = async (req, res) => {
    try {
        const {
            purchaseOrderID
        } = req.body;

        if (!purchaseOrderID) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Purchase Order ID is Required'
            });
        }

        const adminID = req.adminID;

        const purchaseOrder =
            await PurchaseOrder.findOne({
                _id: purchaseOrderID,
                adminID
            });

        if (!purchaseOrder) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Purchase Order not found'
            });
        }

        if (
            purchaseOrder.status === 'Received' ||
            purchaseOrder.status === 'Closed' ||
            purchaseOrder.status === 'Cancelled'
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: `Purchase Order cannot be cancelled because current status is ${purchaseOrder.status}`
            });
        }

        const response =
            await PurchaseOrder.findOneAndUpdate(
                {
                    _id: purchaseOrderID,
                    adminID
                },
                {
                    status: 'Cancelled',
                    updatedBy: req.employeeID
                },
                {
                    new: true
                }
            );

        return res.status(200).json({
            status: 'Success',
            message: 'Purchase Order Cancelled Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Purchase Order Cancellation failed...!',
            error: error.message
        });
    }
};


module.exports = {
    registerPurchaseOrder,
    viewPurchaseOrder,
    approvePurchaseOrder,
    cancelPurchaseOrder
};