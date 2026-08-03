const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/dbConnect');

const userRoute = require('./routes/userRoute.js');
const authRoute = require('./routes/authRoute.js');
const employeeRoute = require('./routes/employeeRoute.js');
const customerRoute = require('./routes/customerRoute.js');
const supplierRoute = require('./routes/supplierRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const unitRoute = require('./routes/unitRoute.js');
const productRoute = require('./routes/productRoute.js');
const leaveRoute = require('./routes/leaveRoute.js');
const warehouseRoute = require('./routes/warehouseRoute.js');
const inventoryRoute = require('./routes/inventoryRoute.js');
const purchaseOrderRoute = require('./routes/purchaseOrderRoute.js');

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/customer', customerRoute);
app.use('/api/supplier', supplierRoute);
app.use('/api/category', categoryRoute);
app.use('/api/unit', unitRoute);
app.use('/api/product', productRoute);
app.use('/api/leave', leaveRoute);
app.use('/api/warehouse', warehouseRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/purchaseOrder', purchaseOrderRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})