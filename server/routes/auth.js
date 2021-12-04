const router = require("express").Router();
const pool = require("../database.js");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const {username, email, password, profile} = await req.body;
        const role = "user";
        const isActive = true;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await pool.query(`INSERT INTO users(username, email, password, profile_pic, role, is_active) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [username, email, hashedPass, profile, role, isActive]);
        res.status(200).json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Register error: " + error.message);
    };
});

router.post("/login", async (req, res) => {
    try {
        const {email} = await req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
        if(user.rows[0].is_active) {
            if(!user) res.status(400).json("Wrong credentials: email");
            const validate = await bcrypt.compare(req.body.password, user.rows[0].password);
            if(!validate) res.status(400).json("Wrong credentials: password");
            const {password, ...others}  = user.rows[0];
            res.status(200).json(others);
        };
        if(!user.rows[0].is_active) {
            res.status(400).json("Account has been blocked");
        };
    } catch (error) {
        res.status(500).json(error);
        console.error("Login error: " + error.message);
    };
});

module.exports = router;