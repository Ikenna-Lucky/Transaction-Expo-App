import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // In a real world app, you'd like to put the userId or IP Address as your key
    const identifier = req.ip || "127.0.0.1";
    const { success } = await rateLimit.limit(identifier);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    return next(error);
  }
};

export default rateLimiter;
