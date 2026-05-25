import React, { useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function ToastContainer({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none" id="toast-wrapper">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: () => void; key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: {
      bg: "bg-stone-900/95 border-emerald-500/50 shadow-emerald-950/20",
      text: "text-emerald-300",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    },
    error: {
      bg: "bg-stone-900/95 border-rose-500/50 shadow-rose-950/20",
      text: "text-rose-300",
      icon: <XCircle className="w-5 h-5 text-rose-400" />,
    },
    warning: {
      bg: "bg-stone-900/95 border-amber-500/50 shadow-amber-950/20",
      text: "text-amber-300",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    },
    info: {
      bg: "bg-stone-900/95 border-gold-500/50 shadow-stone-950/20",
      text: "text-zinc-300",
      icon: <Info className="w-5 h-5 text-yellow-500" />,
    },
  };

  const style = typeStyles[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      layout
      className={`pointer-events-auto flex items-start gap-4 p-4 rounded-xl border backdrop-blur-md shadow-2xl ${style.bg}`}
      id={`toast-item-${toast.id}`}
    >
      <div className="mt-0.5">{style.icon}</div>
      <div className="flex-1 text-sm font-medium leading-relaxed pr-2 text-stone-200">
        {toast.message}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-stone-400 hover:text-stone-200 transition-colors pointer-events-auto p-0.5 rounded-md hover:bg-stone-800"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
