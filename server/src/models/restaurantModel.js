import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  resturantname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  Geolocation: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  cuisineType: {
    type: String,
    required: true,
  },
  images: [
    {
      URL: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
  ],
  openingHours: {
    type: String,
    required: true,
  },
  closingHours: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  Licence: {
    fssai: {
      type: String,
      required: true,
    },
    GST: {
      type: String,
      required: true,
    },    
  },
  BankingDetails: {
    accountNumber: {
      type: String,
      required: true,
    },
    IFSC: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    UPI: {
      type: String,
      required: true,
    },
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
