import Rider from "../model/riderModel.js";

export const createRider = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let riderData = req.body;

    // Parse nested JSON strings if they exist
    if (typeof riderData.vehicleDetails === 'string') {
      riderData.vehicleDetails = JSON.parse(riderData.vehicleDetails);
    }
    if (typeof riderData.bankingDetails === 'string') {
      riderData.bankingDetails = JSON.parse(riderData.bankingDetails);
    }

    // Check if rider profile already exists
    const existingRider = await Rider.findOne({ userId });
    if (existingRider) {
      const error = new Error("Rider profile already exists for this user");
      error.status = 400;
      return next(error);
    }

    // Create new rider
    const newRider = new Rider({
      userId,
      vehicleDetails: riderData.vehicleDetails || {},
      bankingDetails: riderData.bankingDetails || {},
      isProfileComplete: true,
    });

    await newRider.save();
    res.status(201).json({
      message: "Rider profile created successfully",
      data: newRider,
    });
  } catch (error) {
    next(error);
  }
};

export const getRiderByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const rider = await Rider.findOne({ userId });
    if (!rider) {
      const error = new Error("Rider profile not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Rider data retrieved successfully",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRider = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let updates = req.body;

    // Parse nested JSON strings if they exist
    if (typeof updates.vehicleDetails === 'string') {
      updates.vehicleDetails = JSON.parse(updates.vehicleDetails);
    }
    if (typeof updates.bankingDetails === 'string') {
      updates.bankingDetails = JSON.parse(updates.bankingDetails);
    }

    const rider = await Rider.findOneAndUpdate({ userId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!rider) {
      const error = new Error("Rider profile not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Rider updated successfully",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVehicleDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { vehicleType, vehicleNumber } = req.body;

    const rider = await Rider.findOne({ userId });
    if (!rider) {
      const error = new Error("Rider profile not found");
      error.status = 404;
      return next(error);
    }

    rider.vehicleDetails = {
      vehicleType,
      vehicleNumber,
    };

    await rider.save();
    res.status(200).json({
      message: "Vehicle details updated successfully",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBankingDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { accountNumber, IFSC, bankName, UPI } = req.body;

    const rider = await Rider.findOne({ userId });
    if (!rider) {
      const error = new Error("Rider profile not found");
      error.status = 404;
      return next(error);
    }

    rider.bankingDetails = {
      accountNumber,
      IFSC,
      bankName,
      UPI,
    };

    await rider.save();
    res.status(200).json({
      message: "Banking details updated successfully",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvailability = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { isAvailable } = req.body;

    const rider = await Rider.findOneAndUpdate(
      { userId },
      { isAvailable },
      { new: true }
    );

    if (!rider) {
      const error = new Error("Rider profile not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Availability updated successfully",
      data: rider,
    });
  } catch (error) {
    next(error);
  }
};
