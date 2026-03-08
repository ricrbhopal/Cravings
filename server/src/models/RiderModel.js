import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vehicleDetails: {
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  Ratings: [
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
});

const Rider = mongoose.model("Rider", riderSchema);

export default Rider;
