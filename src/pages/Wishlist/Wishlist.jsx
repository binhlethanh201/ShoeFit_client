import React, { useState, useEffect } from "react";
import wishlistService from "../../services/wishlistService";
import "../../assets/css/wishlist/Wishlist.css";

import WishlistHeader from "../../components/wishlist/WishlistHeader";
import WishlistItem from "../../components/wishlist/WishlistItem";
import WishlistEmpty from "../../components/wishlist/WishlistEmpty";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const rawData = await wishlistService.getAll();

        const formattedData = rawData.map((item) => ({
          id: item.id,
          shoeId: item.shoeId,
          title: item.shoeName,
          name: item.shoeName,
          image: item.thumbnail,
          description: item.description,
          price: item.price || 0,
        }));

        setWishlistItems(formattedData);
      } catch (error) {
        console.error("Lỗi tải wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (shoeId, name, recordId) => {
    const confirmed = window.confirm(`Xoá "${name}" khỏi danh sách yêu thích?`);
    if (confirmed) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== recordId));
      try {
        await wishlistService.removeItem(shoeId);
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
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
        Danh Sách Yêu Thích
        <span className="title-badge">{wishlistItems.length}</span>
      </h1>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-layout">
          <div className="cart-list">
            <WishlistHeader />
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemove={() => handleRemove(item.shoeId, item.title, item.id)}
              />
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
