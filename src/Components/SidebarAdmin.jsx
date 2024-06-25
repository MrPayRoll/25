import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar-admin">
      <h2>PekDash</h2>
      <ul>
        <Link to='/admin'><li><button>Добавить</button></li></Link>
        <Link to='/delete'><li><button>Удалить</button></li></Link>
        <Link to='/put'><li><button>Изменить</button></li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
