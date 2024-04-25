const translateRouter = require("express").Router();

require("dotenv").config();

const API_KEY = process.env.API_KEY;

translateRouter.post("/", async (req, res) => {
  const { text } = req.body;
  const targetLang = req.body.targetLang || "ru";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
      }),
    });
    const data = await response.json();
    res.send({ translatedText: data.data.translations[0].translatedText });
  } catch (error) {
    console.log("Error translating text:", error);
    res.status(500).send("Error translating text");
  }
});

module.exports = translateRouter;
