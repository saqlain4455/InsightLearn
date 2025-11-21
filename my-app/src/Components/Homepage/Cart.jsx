import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveId } from "../../Slice/Cart.js";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);

  const handleRemove = (id) => {
    dispatch(RemoveId(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart size={32} className="text-sky-400" />
          <h2 className="text-3xl md:text-4xl font-bold">My Cart</h2>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-12 border border-slate-700 text-center">
            <ShoppingCart size={64} className="mx-auto text-slate-600 mb-4" />
            <p className="text-xl text-slate-400">Your cart is empty</p>
            <p className="text-sm text-slate-500 mt-2">Add some courses to get started!</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 
                         hover:border-sky-500/50 transition-all duration-300 shadow-lg hover:shadow-sky-500/10"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                
                {/* Course Thumbnail */}
                <img
                  src={item.thumbnail}
                  alt={item.courseName}
                  className="w-full md:w-40 h-28 object-cover rounded-lg"
                />

                {/* Course Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 hover:text-sky-400 transition-colors">
                    {item.courseName}
                  </h3>
                  <p className="text-slate-400 text-sm mb-2 line-clamp-3">
                    {item.courseDescription}
                  </p>
                  <p className="text-slate-300 text-sm mb-1">
                    <span className="font-semibold">Price:</span> ${item.price}
                  </p>
                  <p className="text-slate-300 text-sm mb-1">
                    <span className="font-semibold">What you will learn:</span> {item.whatYouWillLearn}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {item.tag?.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 
                             hover:bg-red-500 text-red-400 hover:text-white 
                             border border-red-500/30 hover:border-red-500
                             rounded-lg transition-all duration-300 shadow-sm hover:shadow-red-500/50
                             self-start md:self-center group"
                >
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-sky-500/10 to-blue-500/10 backdrop-blur rounded-xl p-6 border border-sky-500/30">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-slate-400 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-sky-400">{cartItems.length}</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 
                               hover:from-sky-600 hover:to-blue-600
                               text-white font-semibold rounded-lg shadow-lg shadow-sky-500/50 hover:shadow-sky-500/70
                               transition-all duration-300 hover:scale-105">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
