import { useState } from 'react'
import Sidebar from './Sidebar';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const token = sessionStorage.getItem('token') || "";
  const decodedToken = jwtDecode(token);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <header className="topbar d-flex align-items-center gap-3">
      <button className="btn btn-icon d-lg-none" id="sidebarToggle" onClick={toggleSidebar}><i className="bi bi-list"></i></button>

      <Sidebar isOpen={isOpen} />

      <div className="input-group search-box">
        <input type="search" className="form-control" placeholder="Search orders, customers, reports…" />
      </div>

      <div className="d-flex align-items-center gap-2 ms-auto">
        <button className="btn btn-icon">
          <i className="bi bi-bell"></i>
          <span className="badge-dot"></span>
        </button>

        <button className="btn btn-icon"><i className="bi bi-question-circle"></i></button>

        <div className="dropdown-center ms-2 p-1 px-3 rounded-3" style={{background : '#5877ff'}}>
          <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="fw-semibold text-white" style={{ fontSize: "13.5px" }}>{decodedToken.name}</div>
            <div className="text-white" style={{ fontSize: "11.5px" }}>Workspace admin</div>
          </div>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default TopBar