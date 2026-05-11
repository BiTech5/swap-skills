import Review from "../models/Review.js";
import { notifyReviewCreated } from "../services/notificationService.js";

export const createReviews = async (req, res) => {
  try {
    const { reviewedUser, rating, comment } = req.body;
    const review = await Review.create({
      reviewer: req.user.id,
      reviewedUser,
      rating,
      comment,
    });

    await notifyReviewCreated({
      reviewedUserId: review.reviewedUser,
      reviewerId: review.reviewer,
      rating: review.rating,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUserReview = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewedUser: req.params.userId,
    }).populate("reviewer", "name");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
