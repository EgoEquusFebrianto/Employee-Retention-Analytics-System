import React from 'react';
import { FiGrid, FiUser } from 'react-icons/fi';
import "./sidebar.css";
import { NavLink } from 'react-router-dom';

export const Sidebar = ({isOpen, onClose}) => {
    return (
        <>
            {isOpen && (
                <div className='sidebar-overlay' onClick={onClose}/>
            )}

            <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
                <div className='sidebar-brand'>
                    <h1>Retention</h1>
                    <span>Analytics</span>
                </div>

                <nav className='sidebar-navigation'>
                    <NavLink 
                        to='/'
                        end
                        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        onClick={onClose}
                    >
                        <span className='sidebar-icon'>
                            <FiGrid size={20} />
                        </span>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink 
                        to='/employees'
                        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        onClick={onClose}
                    >
                        <span className='sidebar-icon'>
                            <FiUser size={20} />
                        </span>
                        <span>Employees</span>
                    </NavLink>
                </nav>
            </aside>
        </>
    )
}