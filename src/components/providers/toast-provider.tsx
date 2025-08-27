"use client";

import { useEffect } from "react";
import { toast as sonnerToast } from "sonner";
import { useToasts } from "@/stores/ui-store";

export function ToastProvider() {
  const { toasts, remove } = useToasts();

  useEffect(() => {
    toasts.forEach((toast) => {
      const toastId = toast.id;

      switch (toast.type) {
        case "success":
          sonnerToast.success(toast.title, {
            description: toast.message,
            action: toast.action
              ? {
                  label: toast.action.label,
                  onClick: toast.action.onClick
                }
              : undefined,
            onDismiss: () => remove(toastId)
          });
          break;
        case "error":
          sonnerToast.error(toast.title, {
            description: toast.message,
            action: toast.action
              ? {
                  label: toast.action.label,
                  onClick: toast.action.onClick
                }
              : undefined,
            onDismiss: () => remove(toastId)
          });
          break;
        case "warning":
          sonnerToast.warning(toast.title, {
            description: toast.message,
            action: toast.action
              ? {
                  label: toast.action.label,
                  onClick: toast.action.onClick
                }
              : undefined,
            onDismiss: () => remove(toastId)
          });
          break;
        case "info":
          sonnerToast.info(toast.title, {
            description: toast.message,
            action: toast.action
              ? {
                  label: toast.action.label,
                  onClick: toast.action.onClick
                }
              : undefined,
            onDismiss: () => remove(toastId)
          });
          break;
      }

      // Remove from store after displaying
      remove(toastId);
    });
  }, [toasts, remove]);

  return null;
}
