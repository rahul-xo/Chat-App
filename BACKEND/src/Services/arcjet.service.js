import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";


const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    slidingWindow({
        mode:"LIVE",
        max:100,
        interval:60,
    })
  ],
});

export default aj;
