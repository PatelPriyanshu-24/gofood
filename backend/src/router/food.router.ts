import { Router } from "express";
import { sample_foods, sample_tags, sample_users } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodcount = await FoodModel.countDocuments();
    if (foodcount > 0) {
      res.send("seed  is already done !");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("seed is done");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.find();
    res.send(food);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const food = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(food);
  })
);

router.get(
  "/tag",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.find({ tags: req.params.tagName });
    res.send(food);
  })
);

router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  })
);
export default router;
