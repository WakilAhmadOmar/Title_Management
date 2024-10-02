import { useEffect } from "react";

export type MessageType = "error" | "success" | "warning" | "info";

const Message = ({
  type,
  message,
  autoCloseDuration = 5000,
  handleClose,
}: {
  type: MessageType;
  message: string;
  autoCloseDuration?: number;
  handleClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [autoCloseDuration]);

  let baseClasses = "p-4 rounded-md text-sm w-fit ";
  let typeClasses = "";

  switch (type) {
    case "error":
      typeClasses = "bg-red-100 text-red-700 border border-red-400";
      break;
    case "success":
      typeClasses = "bg-green-100 text-green-700 border border-green-400";
      break;
    case "warning":
      typeClasses = "bg-yellow-100 text-yellow-700 border border-yellow-400";
      break;
    case "info":
      typeClasses = "bg-blue-100 text-blue-700 border border-blue-400";
      break;
    default:
      typeClasses = "  text-gray-700 border border-gray-400";
  }

  return (
    <div className="fixed grid top-[80px] justify-center w-full z-40 left-0">
      <div className={`${baseClasses} ${typeClasses}`}>
        <span>{message}</span>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 ml-4"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Message;
