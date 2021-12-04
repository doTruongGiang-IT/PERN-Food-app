const router = require("express").Router();
const pool = require("../database.js");

router.post("/", async (req, res) => {
    try {
        const {name, price} = await req.body;
        const newAccompany = await pool.query(`INSERT INTO accompanying_food(accompanying_name, accompanying_price) VALUES($1, $2) RETURNING *`, 
            [name, price]);
        res.status(200).json(newAccompany.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create accompanying food error: " + error.message);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const accompany = await req.body;
        let updateAccompany = null;
        updateAccompany = await pool.query(`UPDATE accompanying_food SET ${accompany.name ? `accompanying_name='${accompany.name}, '` : ' '}${accompany.price ? `accompanying_price='${accompany.price}'` : ' '} WHERE accompanyingfoodid=${req.params.id} RETURNING *;`);
        if(!updateAccompany) res.status(400).json("Cannot update");
        res.status(200).json(updateAccompany.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update accompanying food error: "+error.message);
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteAccompany = await pool.query(`DELETE FROM accompanying_food WHERE accompanyingfoodid=${req.params.id}`);
        if(!deleteAccompany) res.status(400).json("Error ocurred");
        res.status(200).json("Accompanying food has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete accompanying food error: "+error.message);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const accompany = await pool.query(`SELECT * FROM accompanying_food WHERE accompanyingfoodid=${req.params.id}`);
        if(!accompany) res.status(400).json("Error ocurred");
        res.status(200).json(accompany.rows[0])
    } catch (error) {
        res.status(500).json(error);
        console.log("Get supplier error: "+error.message);
    } 
});

router.get("/", async (req, res) => {
    try {
        const accompanys = await pool.query(`SELECT * FROM accompanying_food`);
        if(!accompanys) res.status(400).json("Error ocurred");
        res.status(200).json(accompanys.rows)
    } catch (error) {
        res.status(500).json(error);
        console.log("Get accompanys error: "+error.message);
    } 
});

module.exports = router;