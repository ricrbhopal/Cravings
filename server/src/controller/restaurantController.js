import Restaurant from "../model/restaurantModel.js";

export const createRestaurant = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const restaurantData = req.body;

    // Check if restaurant already exists for this user
    const existingRestaurant = await Restaurant.findOne({ userId });
    if (existingRestaurant) {
      const error = new Error("Restaurant profile already exists for this user");
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
    const userId = req.params.userId;

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
    const userId = req.params.userId;
    const updates = req.body;

    const restaurant = await Restaurant.findOneAndUpdate(
      { userId },
      updates,
      { new: true, runValidators: true }
    );

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
