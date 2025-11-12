const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const { URLModel } = require("../models/url.model");
const { generateShortId } = require("../utils");

const baseUrl = process.env.BASEURI;


const generateUniqueShortId = async () => {
    let shortId;
    let existingURL;

    while (true) {
        shortId = generateShortId();
        existingURL = await URLModel.findOne({ urlCode: shortId });

        if (!existingURL) {
            break;
        }
    }
    return shortId;
};


router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;

    try {

        if (!validUrl.isUri(longUrl)) {
            return res.status(401).json({ error: "Invalid Url" });
        }



        const existingURL = await URLModel.findOne({ longUrl });

        if (existingURL) {
            return res.json({ urlCode: existingURL.urlCode });
        }

        const generatedCode = await generateUniqueShortId();
        const shortUrl = `${baseUrl}/${generatedCode}`;

        const newURL = new URLModel({
            urlCode: generatedCode,
            longUrl,
            shortUrl,
        });
        await newURL.save();
        res.status(201).json({ urlCode: generatedCode });
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }

});

module.exports = router;