import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        itemName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        foodType: {
          type: String,
          enum: ["veg", "nonveg", "egg", "vegan"],
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
        ratings: [
          {
            customerId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Customer",
              required: true,
            },
            rating: {
              type: Number,
              required: true,
            },
            review: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

export default MenuItem;
