import React, { useRef, useState }  from 'react'
import "./employee-import.css"
import { FiUpload, FiX, FiFile } from 'react-icons/fi';
import { ImportResult } from './import-result';
import { useEmployee } from '../../context/hook/employee-hook';

export const ImportEmployeeModal = ({ open, onClose, onImport, loading = false, result = null, onDoneBegin, loadingData}) => {
    /**
     * @type {React.RefObject<HTMLInputElement>}
     */
    const fileInputRef = useRef(null);

    /**
     * State untuk file yang diupload
     * 
     * @type {[File, function]}
     */
    const [file, setFile] = useState(null);

    /**
     * 
     * @import {ChangeEvent} from "react"
     * 
     * @param {ChangeEvent<HTMLInputElement>} e 
     */
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        const allowedExtentions = [
            ".csv",
            ".xls",
            ".xlsx"
        ]

        const fileName = selectedFile.name.toLocaleLowerCase();

        const isValid = allowedExtentions.some(
            (ex) => fileName.endsWith(ex)
        );

        if (!isValid) {
            setFile(null);
            return;
        }

        setFile(selectedFile);
    };

    const handleBrowse = () => {
        fileInputRef.current?.click();
    };

    /**
     * @import { DragEvent } from 'react';
     * 
     * @param {DragEvent} e 
     */
    const handleDrop = (e) => {
        e.preventDefault();

        const droppedFile = e.dataTransfer.files?.[0];

        if (!droppedFile) return;

        const allowedExtentions = [
            ".csv",
            ".xls",
            ".xlsx"
        ]

        const fileName = droppedFile.name.toLocaleLowerCase();

        const isValid = allowedExtentions.some(
            (ex) => fileName.endsWith(ex)
        )

        if (!isValid) {
            setFile(null);
            return;
        }

        setFile(droppedFile);
    };

    const handleImport = async () => {
        if (!file) return;

        await onImport(file);
    }

    const handleClose = () => {
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }

        onClose();
    }

    if (!open) return null;

    if (result?.status) {
        return(
            <div 
                className='import-modal-overlay'
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className='import-modal'
                    onClick={(e) => e.stopPropagation()}
                >
                    <ImportResult 
                        result={result}
                        onDone={() => {
                            onDoneBegin();
                            loadingData();
                            handleClose();
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            className='import-modal-overlay'
            onClick={handleClose}
        >
            <div
                className='import-modal'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='import-modal-header'>
                    <div>
                        <h2>Import Employee Data</h2>
                        <p>Upload Employee Data to Generate retention predictions.</p>
                    </div>

                    <button
                        type='button'
                        className='import-modal-close'
                        onClick={handleClose}
                        aria-label='Close import dialog'
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className='import-modal-body'>
                    <input 
                        ref={fileInputRef}
                        type='file'
                        accept='.csv,.xls,.xlsx'
                        onChange={handleFileChange}
                        hidden
                    />

                    <div
                        className='import-dropzone'
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={handleBrowse}
                    >
                        <div className='import-upload-icon'>
                            <FiUpload size={24}/>
                        </div>

                        <strong>
                            Drop your file here
                        </strong>

                        <span>
                            or click to browse
                        </span>

                        <small>
                            Supported format: CSV, XLS, XLSX
                        </small>
                    </div>

                    {file && (
                        <div className='import-selected-file'>
                            <div className='import-file-icon'>
                                <FiFile size={18} />
                            </div>

                            <div className='import-file-info'>
                                <strong>
                                    {file.name}
                                </strong>
                                
                                <span>
                                    {(file.size / 1024).toFixed(1)} KB
                                </span>
                            </div>

                            <button
                                type='button'
                                onClick={() => {
                                    setFile(null);

                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                    }
                                }}
                                aria-label='Remove selecte file'
                            >
                                <FiX size={16} />
                            </button>
                        </div>
                    )}
                </div>
                <div className='import-modal-footer'>
                    <button
                        type='button'
                        className='import-button import-button-secondary'
                        onClick={handleClose}
                    >
                        Cancel
                    </button>

                    <button
                        type='button'
                        className='import-button import-button-primary'
                        onClick={handleImport}
                        disabled={!file}
                    >
                        Import data
                    </button>
                </div>
            </div>
        </div>
    );
};