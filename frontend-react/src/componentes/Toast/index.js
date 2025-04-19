import React, { useEffect } from 'react'; 
import styled, { keyframes } from 'styled-components';
import { useToast } from './ToastContext';

const fadein = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }`;

const fadeout = keyframes` 
  from { opacity: 1; transform: translateY(0); } 
  to { opacity: 0; transform: translateY(20px); }`;

const ToastWrapper = styled.div` 
  position: fixed; 
  bottom: 20px; 
  right: 20px; 
  background-color: ${({ type }) => type === 'success' ? 'rgba(18, 124, 4, 0.7)' : type === 'error' ? 'rgba(158, 15, 15, 0.57)' : type === 'warning' ? 'rgba(250, 234, 8, 0.94)' : '#333'}; 
  color: white; 
  padding: 16px 24px; 
  border-radius: 8px; 
  font-family: Bookochi;
  letter-spacing: 0.22em; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.2); 
  z-index: 1000000; 
  animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
`;

const Toast = () => {
    const { message, type, handleClose } = useToast();
  
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          handleClose?.();
        }, 4000);
        return () => clearTimeout(timer);
      }
    }, [message, handleClose]);
  
    if (!message) return null;
    return <ToastWrapper type={type}>{message}</ToastWrapper>;
  };

export default Toast;