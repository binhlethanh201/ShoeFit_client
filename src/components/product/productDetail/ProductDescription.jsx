import React from "react";

const ProductDescription = ({ description, specs, aiDescription }) => {
  return (
    <div className="content-block">
      <span className="block-title">Mô tả sản phẩm</span>
      <p className="desc-text">
        {description || "Chưa có mô tả chi tiết cho sản phẩm này."}
      </p>

      {aiDescription && (
        <div className="alert alert-light border mb-4">
          <strong>
            <i className="fas fa-robot me-2"></i>AI Analysis:
          </strong>
          <p className="fst-italic mb-0 mt-1 small">"{aiDescription}"</p>
        </div>
      )}

      {specs && (
        <table className="specs-table">
          <tbody>
            {specs.map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductDescription;
