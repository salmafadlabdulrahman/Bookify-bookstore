const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        title: String,
        price: Number,
        quantity: { type: Number, required: true, default: 1 },
      },
    ],

    shippingAddress: {
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },

    paymentMethod: { type: String, required: true },

    shippingPrice: Number,
    isPaid: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);