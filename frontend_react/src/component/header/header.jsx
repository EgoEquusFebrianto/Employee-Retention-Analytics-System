import React from 'react';
import "./header.css";
import { FiMenu } from 'react-icons/fi';

export const Header = ({ onMenuClick }) => {
  return (
    <header className='app-header'>
        <div className='header-left'>
            <button 
                className='mobile-menu-button'
                type='button'
                onClick={onMenuClick}
                aria-label='Open navigation menu'
            >
                <FiMenu size={15}/>
            </button>

            <div>
                <h2>Employee Retention Analytics</h2>
                <p>Monitor employee retention and attrition risk</p>
            </div>
        </div>

        <div className='header-right'>
            <span className='system-status'>
                System Online
            </span>
        </div>
    </header>
  )
}
