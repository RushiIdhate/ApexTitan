import { Routes, Route } from 'react-router-dom'
import TopBar from '../components/TopBar';
import Dashboard from '../pages/Dashboard';
import EmployeeManage from '../pages/EmployeeManage';
import RegisterEmployee from '../components/forms/RegisterEmployee';
import RegisterCustomer from '../components/forms/RegisterCustomer';
import CustomerManage from '../pages/CustomerManage';
import RegisterSupplier from '../components/forms/RegisterSupplier';
import SupplierManage from '../pages/SupplierManage';
import CategoryManage from '../pages/CategoryManage';
import RegisterCategory from '../components/forms/RegisterCategory';
import UnitManage from '../pages/UnitManage';
import RegisterUnit from '../components/forms/RegisterUnit';
import ProductManage from '../pages/ProductManage';
import RegisterProduct from '../components/forms/RegisterProduct';
import WarehouseManage from '../pages/WarehouseManage';
import RegisterWarehouse from '../components/forms/RegisterWarehouse';
import InventoryManage from '../pages/InventoryManage';
import RegisterInventory from '../components/forms/RegisterInventory';
import LeaveManage from '../pages/LeaveManage';

function AdminLayout() {
  return (
    <>
      <div className="main-wrap">
        <TopBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee-manage" element={<EmployeeManage />} />
            <Route path="/employee-manage/register-employee" element={<RegisterEmployee />} />

            <Route path="/customer-manage" element={<CustomerManage />} />
            <Route path="/customer-manage/register-customer" element={<RegisterCustomer />} />

            <Route path="/supplier-manage" element={<SupplierManage />} />
            <Route path="/supplier-manage/register-supplier" element={<RegisterSupplier />} />

            <Route path="/category-manage" element={<CategoryManage />} />
            <Route path="/category-manage/register-category" element={<RegisterCategory />} />

            <Route path="/unit-manage" element={<UnitManage />} />
            <Route path="/unit-manage/register-unit" element={<RegisterUnit />} />

            <Route path="/product-manage" element={<ProductManage />} />
            <Route path="/product-manage/register-product" element={<RegisterProduct />} />

            <Route path="/employee-leave-manage" element={<LeaveManage />} />
            <Route path="/product-manage/register-product" element={<RegisterProduct />} />

            <Route path="/warehouse-manage" element={<WarehouseManage />} />
            <Route path="/warehouse-manage/register-warehouse" element={<RegisterWarehouse />} />

            <Route path="/inventory-manage" element={<InventoryManage />} />
            <Route path="/inventory-manage/register-inventory" element={<RegisterInventory />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default AdminLayout
