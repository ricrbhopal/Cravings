import express from "express";
import {
  createRestaurant,
  getRestaurantByUserId,
  updateRestaurant,
} from "../controller/restaurantController.js";

const router = express.Router();

router.post("/:userId", createRestaurant);
router.get("/:userId", getRestaurantByUserId);
router.put("/:userId", updateRestaurant);

export default router;
