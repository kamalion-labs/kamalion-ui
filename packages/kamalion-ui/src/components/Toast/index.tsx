import { ReactNode } from "react";
import {
  FaCheck,
  FaExclamation,
  FaInfo,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export type ToastType = "success" | "danger" | "info" | "warning";

export type ToastTypeMap = {
  [key in ToastType]: {
    color: string;
    icon: ReactNode;
    iconBg: string;
    border: string;
  };
};

const typeStyles: ToastTypeMap = {
  success: {
    color: "text-emerald-400",
    icon: <FaCheck size={24} />,
    iconBg: "bg-emerald-400",
    border: "border-emerald-400",
  },
  danger: {
    color: "text-pink-400",
    icon: <FaTimesCircle size={24} />,
    iconBg: "bg-pink-400",
    border: "border-pink-400",
  },
  info: {
    color: "text-cyan-400",
    icon: <FaInfo size={24} />,
    iconBg: "bg-cyan-400",
    border: "border-cyan-400",
  },
  warning: {
    color: "text-yellow-400",
    icon: <FaExclamation size={24} />,
    iconBg: "bg-yellow-400",
    border: "border-yellow-400",
  },
};

interface Props {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  onFinished: (e: unknown) => void;
}

const motionVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  onFinished,
}: Props) {
  return (
    <motion.div
      className={`absolute bottom-[40px] right-4 z-50 flex max-w-[350px] text-lg shadow-md ${typeStyles[type].color}`}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      animate={isVisible ? "open" : "closed"}
      onAnimationComplete={(e) => onFinished(e)}
      variants={motionVariants}
    >
      <div
        className={`flex w-[60px] items-center justify-center rounded-l-md text-white ${typeStyles[type].iconBg}`}
      >
        {typeStyles[type].icon}
      </div>
      <div
        className={`flex flex-1 space-x-5 rounded-r-md border bg-white p-4 leading-tight ${typeStyles[type].border}`}
      >
        <div>{message}</div>

        <div
          className="cursor-pointer transition-opacity hover:opacity-70"
          onClick={onClose}
        >
          <FaTimes />
        </div>
      </div>
    </motion.div>
  );
}
