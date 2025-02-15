import { ToastOptions } from "react-toastify";

export const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
    icon: false,
    className: "!bg-blue-900 !text-white !rounded-lg !p-4 !min-h-0 !min-w-0 !max-w-md",
    style: { 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  };