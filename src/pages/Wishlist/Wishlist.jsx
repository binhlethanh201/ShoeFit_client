import React, { useState, useEffect } from "react";

// Import Services & CSS
import wishlistService from "../../services/wishlist/wishlistService";
import "../../assets/css/wishlist/Wishlist.css";

// Import Components
import WishlistHeader from "../../components/wishlist/WishlistHeader";
import WishlistItem from "../../components/wishlist/WishlistItem";
import WishlistEmpty from "../../components/wishlist/WishlistEmpty";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const data = await wishlistService.getAll();
        setWishlistItems(data);
      } catch (error) {
        console.error("Lỗi tải wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Handle Remove
  const handleRemove = async (id, name) => {
    const confirmed = window.confirm(`Xoá "${name}" khỏi danh sách yêu thích?`);
    if (confirmed) {
      // Optimistic update: Xóa trên UI trước
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));

      // Gọi API xóa ngầm
      await wishlistService.removeItem(id);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 className="cart-title">
        Danh Sách Yêu Thích ({wishlistItems.length})
      </h1>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-layout">
          <div className="cart-list">
            {/* Header Row */}
            <WishlistHeader />

            {/* List Items */}
            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        </div>
      ) : (
        <WishlistEmpty />
      )}
    </div>
  );
};

export default Wishlist;
