import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../Toast'; 

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  const showToast = useCallback((msg, tipo = 'success') => {
    setMessage(msg);
    setType(tipo);
  }, []);

  const handleClose = () => {
    setMessage('');
    setType('');
  };

  return (
    <ToastContext.Provider value={{ showToast, message, type, handleClose }}>
        {children}
        <Toast />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);