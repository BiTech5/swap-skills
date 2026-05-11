import Notification from "../models/Notification.js";
import User from "../models/User.js";

const SYSTEM_TYPE = "system";

const getUserName = async (userId) => {
  const user = await User.findById(userId).select("name");
  return user?.name || "Someone";
};

export const createNotification = async ({ user, message, type = SYSTEM_TYPE }) => {
  if (!user || !message) return null;

  return Notification.create({
    user,
    message,
    type,
  });
};

export const notifyRequestCreated = async ({ receiverId, senderId, skill }) => {
  const senderName = await getUserName(senderId);
  return createNotification({
    user: receiverId,
    type: "request",
    message: `${senderName} sent you a skill request for ${skill}.`,
  });
};

export const notifyRequestStatusChanged = async ({
  senderId,
  receiverId,
  status,
  skill,
}) => {
  const receiverName = await getUserName(receiverId);
  return createNotification({
    user: senderId,
    type: "request",
    message: `${receiverName} ${status} your request for ${skill}.`,
  });
};

export const notifyReviewCreated = async ({ reviewedUserId, reviewerId, rating }) => {
  const reviewerName = await getUserName(reviewerId);
  return createNotification({
    user: reviewedUserId,
    type: "reviews",
    message: `${reviewerName} left you a ${rating}-star review.`,
  });
};
