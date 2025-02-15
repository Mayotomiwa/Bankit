import { AlertCircle, Check, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';



interface ToastContentProps {
  message: string;
  action?: string;
  onActionClick?: () => void;
}

export const ToastContent: React.FC<ToastContentProps> = ({ 
  message, 
  action, 
  onActionClick 
}) => (
  <div className="flex items-center gap-3 w-full">
    <div className="shrink-0">
      <Check className="w-5 h-5 text-white" />
    </div>
    <p className="text-sm font-medium flex-grow truncate">{message}</p>
    {action && (
      <button 
        onClick={onActionClick}
        className="text-sm font-medium text-white/80 hover:text-white ml-4 whitespace-nowrap"
      >
        {action}
      </button>
    )}
    <button 
      onClick={() => toast.dismiss()}
      className="shrink-0 ml-2 text-white/60 hover:text-white"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);

export const ErrorToastContent: React.FC<ToastContentProps> = ({ 
  message,
  action,
  onActionClick 
}) => (
  <div className="flex items-center gap-3 w-full">
    <div className="shrink-0">
      <AlertCircle className="w-5 h-5 text-red-400" />
    </div>
    <p className="text-sm font-medium flex-grow truncate">{message}</p>
    {action && (
      <button 
        onClick={onActionClick}
        className="text-sm font-medium text-white/80 hover:text-white ml-4 whitespace-nowrap"
      >
        {action}
      </button>
    )}
    <button 
      onClick={() => toast.dismiss()}
      className="shrink-0 ml-2 text-white/60 hover:text-white"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);

export const ToastifyContainer = () => (
  <ToastContainer
    toastClassName={() =>
      "relative flex p-1 rounded-md justify-between overflow-hidden cursor-pointer"
    }
    className="fixed top-0 right-0 p-4 w-full max-w-md z-50"
    position="top-right"
    closeButton={false}
  />
);

