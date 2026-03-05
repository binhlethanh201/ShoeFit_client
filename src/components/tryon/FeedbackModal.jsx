import React from "react";
import "../../assets/css/tryon2d/tryon2d.css";

const FeedbackModal = ({ isOpen, onClose, formLink }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay feedback-modal active"
      onClick={(e) => {
        if (e.target.className.includes("modal-overlay")) onClose();
      }}
    >
      <div className="modal-content feedback-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <div className="feedback-body text-center">
          <div className="feedback-icon">📝</div>
          <h3>Cho ShoeFit xin 1 phút góp ý</h3>
          <p>
            Những phản hồi chân thật từ bạn sẽ giúp ShoeFit hoàn thiện sản phẩm
            hơn. Cảm ơn bạn đã đồng hành cùng ShoeFit ngay từ những bước đầu
            tiên.
          </p>
          <a
            href={formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-feedback-go"
            onClick={onClose}
          >
            Làm khảo sát ngay (chỉ mất 1 phút)
          </a>
          <button className="btn-feedback-later" onClick={onClose}>
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
