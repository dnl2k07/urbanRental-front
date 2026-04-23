import React, { createContext, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now().toString();

    const toastConfig = {
      onClose: () => removeToast(id),
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case "success":
        toast.success(message, { ...toastConfig, theme: "colored" });
        break;
      case "error":
        toast.error(message, { ...toastConfig, theme: "colored" });
        break;
      case "warning":
        toast.warning(message, { ...toastConfig, theme: "colored" });
        break;
      default:
        toast.info(message, { ...toastConfig, theme: "colored" });
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    toast.dismiss();
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ToastContext.Provider>
  );
}

export default ToastContext;
