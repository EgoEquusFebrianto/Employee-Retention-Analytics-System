import React from 'react'
import "./employee-pagination.css"
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

export const EmployeePagination = ({page, pagination, onPageChange}) => {
    if (!pagination || pagination.total_pages <= 1) return null;

    const {
        total,
        total_pages,
        has_next,
        has_previous,
    } = pagination;

    return (
        <div className='employee-pagination'>
            <div className='employee-pagination-info'>
                Showing page {page} of {total_pages} {" . "}  {total} employees
            </div>

            <div className='employee-pagination-controls'>
                <button
                    type='button'
                    className='employee-pagination-button'
                    disabled={!has_previous}
                    onClick={() => onPageChange(page - 1)}
                    aria-label='Previous Page'
                >
                    <FiChevronsLeft size={16}/>
                </button>

                <span className='employee-pagination-current'>
                    {page}
                </span>

                <button
                    type='button'
                    className='employee-pagination-button'
                    disabled={!has_next}
                    onClick={() => onPageChange(page + 1)}
                    aria-label='Previous Page'
                >
                    <FiChevronsRight size={16}/>
                </button>
                
            </div>
        </div>
    )
}
