import React from "react";
import Icon from "../Icon";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  isOpen: boolean;
  size?: "sm" | "md" | "lg" | "xlg"; // Add size prop with available options
};

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onCancel,
  isOpen,
  size = "md", // Default to "md" if size is not provided
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content modal-${size}`}>
        {" "}
        {/* Add dynamic class based on size */}
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <button className="modal__close" onClick={onCancel}>
          <Icon id="cancel" size="20" />
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
