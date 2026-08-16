import React, { Children, useState } from 'react';
import "./app-layout.css";
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='app-layout'>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className='app-main'>
            <Header onMenuClick={toggleSidebar} />

            <main className='app-context'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}
