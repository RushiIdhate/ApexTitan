import React from 'react'

function Sidebar({ isOpen }) {
    document.querySelectorAll('.pulse-link').forEach(link => {
        link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.pulse-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        });
    });
    
    document.querySelectorAll('.btn-range').forEach(btn => {
        btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-range').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        });
    });
    return (
        <aside id="sidebar" className={`sidebar ${isOpen ? 'show' : ''}`}>
            <div className="brand">
                <div className="brand-mark"><i className="bi bi-box-seam"></i></div>
                <div className="brand-name">ApexTitan</div>
            </div>

            <div className="sidebar-scroll-content">
                <div className="nav-label">Workspace</div>

                <nav className="nav flex-column">
                    <a className="nav-link pulse-link active" href="/">
                        <i className="bi bi-grid-1x2"></i>
                        Dashboard
                    </a>

                    <div className="nav-label">
                        MASTER DATA
                    </div>

                    <a className="nav-link pulse-link" href="/employee-manage">
                        <i className="bi bi-person-badge"></i>
                        Employee Management
                    </a>

                    <a className="nav-link pulse-link" href="/customer-manage">
                        <i className="bi bi-people"></i>
                        Customer Management
                    </a>

                    <a className="nav-link pulse-link" href="/supplier-manage">
                        <i className="bi bi-truck"></i>
                        Supplier Management
                    </a>

                    <a className="nav-link pulse-link" href="/category-manage">
                        <i className="bi bi-tags"></i>
                        Category Management
                    </a>

                    <a className="nav-link pulse-link" href="/unit-manage">
                        <i className="bi bi-rulers"></i>
                        Unit Management
                    </a>

                    <a className="nav-link pulse-link" href="/product-manage">
                        <i className="bi bi-box-seam"></i>
                        Product Management
                    </a>

                    <a className="nav-link pulse-link" href="/employee-leave-manage">
                        <i className="bi bi-person-badge"></i>
                        Leave Management
                    </a>

                    <div className="nav-label">
                        INVENTORY
                    </div>

                    <a className="nav-link pulse-link" href="/warehouse-manage">
                        <i className="bi bi-buildings"></i>
                        Warehouse Management
                    </a>

                    <a className="nav-link pulse-link" href="/inventory-manage">
                        <i className="bi bi-boxes"></i>
                        Inventory
                    </a>

                    <a className="nav-link pulse-link" href="/stock-movement">
                        <i className="bi bi-arrow-left-right"></i>
                        Stock Movement
                    </a>

                    <a className="nav-link pulse-link" href="/stock-transfer">
                        <i className="bi bi-arrow-repeat"></i>
                        Stock Transfer
                    </a>

                    <div className="nav-label">
                        PROCUREMENT
                    </div>

                    <a className="nav-link pulse-link" href="/purchase-orders">
                        <i className="bi bi-cart-plus"></i>
                        Purchase Orders
                    </a>

                    <a className="nav-link pulse-link" href="/goods-receipt">
                        <i className="bi bi-box-arrow-in-down"></i>
                        Goods Receipt
                    </a>

                    <div className="nav-label">
                        FINANCE
                    </div>

                    <a className="nav-link pulse-link" href="/invoices">
                        <i className="bi bi-receipt"></i>
                        Invoices
                    </a>

                    <a className="nav-link pulse-link" href="/payments">
                        <i className="bi bi-credit-card"></i>
                        Payments
                    </a>

                    <a className="nav-link pulse-link" href="/employee-payroll">
                        <i className="bi bi-cash"></i>
                        Employee Payroll
                    </a>

                    <div className="nav-label">
                        REPORTING
                    </div>

                    <a className="nav-link pulse-link" href="/reports">
                        <i className="bi bi-clipboard-data"></i>
                        Reports & Analytics
                    </a>

                    <div className="nav-label">
                        ADMINISTRATION
                    </div>

                    <a className="nav-link pulse-link" href="/users">
                        <i className="bi bi-person-gear"></i>
                        User Management
                    </a>

                    <a className="nav-link pulse-link" href="/notifications">
                        <i className="bi bi-bell"></i>
                        Notifications
                    </a>
                </nav>

                <div className="nav-label">System</div>
                <nav className="nav flex-column">
                    <a className="nav-link pulse-link" href="#"><i className="bi bi-gear"></i> Settings</a>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
