import { toast } from "react-toastify";
import { ErrorToastContent, ToastContent } from "./toast";
import { toastConfig } from "./toastConfig";

export const showToast = {
    success: (message: string, action?: string, onActionClick?: () => void) => {
      toast(<ToastContent message={message} action={action} onActionClick={onActionClick} />, {
        ...toastConfig,
      });
    },
    error: (message: string, action?: string, onActionClick?: () => void) => {
      toast(<ErrorToastContent message={message} action={action} onActionClick={onActionClick} />, {
        ...toastConfig,
      });
    }
  };