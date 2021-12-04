const router = require("express").Router();
const pool = require("../database.js");
const DRINKS_TYPE = "drinks";

router.get("/", async (req, res) => {
    try {
        const drinks = await pool.query(`SELECT * FROM product WHERE product_type='${DRINKS_TYPE}'`);
        if(!drinks) drinks.status(400).json("Can't get drinks list");
        res.status(200).json(drinks.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log("Get drinks list error: "+error.message);  
    };
});

module.exports = router;
