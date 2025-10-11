import aj from "../Services/arcjet.service.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision =await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too many requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "bot access denied." });
      } else {
        return res.status(403).json({message:"access denied"});
      }
    }

    //check for spoof bots 
    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({
            error:"spoof bot detected",
            message:"malicious bot actvity detected"
        })
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
};
