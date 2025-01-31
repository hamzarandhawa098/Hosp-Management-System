const Modal = ({ children, onClose }) => {
    return (
      <div
        className="fixed inset-0 bg-black/80  flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 max-w-4xl mx-auto w-full rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  };

  export default Modal;
  