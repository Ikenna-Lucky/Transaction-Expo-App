import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // In a real world app, you'd like to put the userId or IP Address as your key
    const { success } = await rateLimit.limit("my-rate-limit");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
