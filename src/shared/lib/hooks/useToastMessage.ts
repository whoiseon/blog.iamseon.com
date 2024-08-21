import { useTheme } from 'next-themes';
import { toast, ToastOptions } from 'react-toastify';

export function useToastMessage() {
  const { theme, systemTheme } = useTheme();

  const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 1500,
    pauseOnHover: false,
    theme: theme || systemTheme,
  };

  const successToast = (message: string, customOptions?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...customOptions });
  };

  const errorToast = (message: string, customOptions?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...customOptions });
  };

  const warnToast = (message: string, customOptions?: ToastOptions) => {
    toast.warn(message, { ...defaultOptions, ...customOptions });
  };

  const infoToast = (message: string, customOptions?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...customOptions });
  };

  return {
    successToast,
    errorToast,
    warnToast,
    infoToast,
  };
}
