import Restaurant from "../model/restaurantModel.js";

export const createRestaurant = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let restaurantData = req.body;

    // Parse nested JSON strings if they exist (from FormData submission)
    if (typeof restaurantData.geolocation === 'string') {
      restaurantData.geolocation = JSON.parse(restaurantData.geolocation);
    }
    if (typeof restaurantData.licence === 'string') {
      restaurantData.licence = JSON.parse(restaurantData.licence);
    }
    if (typeof restaurantData.bankingDetails === 'string') {
      restaurantData.bankingDetails = JSON.parse(restaurantData.bankingDetails);
    }

    // Check if restaurant already exists for this user
    const existingRestaurant = await Restaurant.findOne({ userId });
    if (existingRestaurant) {
      const error = new Error(
        "Restaurant profile already exists for this user",
      );
      error.status = 400;
      return next(error);
    }

    // Create new restaurant
    const newRestaurant = new Restaurant({
      userId,
      ...restaurantData,
      isProfileComplete: true,
    });

    await newRestaurant.save();
    res.status(201).json({
      message: "Restaurant profile created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) {
      const error = new Error("Restaurant not found for this user");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Restaurant data retrieved successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let updates = req.body;

    // Parse nested JSON strings if they exist (from FormData submission)
    if (typeof updates.geolocation === 'string') {
      updates.geolocation = JSON.parse(updates.geolocation);
    }
    if (typeof updates.licence === 'string') {
      updates.licence = JSON.parse(updates.licence);
    }
    if (typeof updates.bankingDetails === 'string') {
      updates.bankingDetails = JSON.parse(updates.bankingDetails);
    }

    const restaurant = await Restaurant.findOneAndUpdate({ userId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!restaurant) {
      const error = new Error("Restaurant not found for this user");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};
