const router = require("express").Router();
const pool = require("../database.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const {username, email, password, profile} = await req.body;
        const role = "user";
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await pool.query(`INSERT INTO users(username, email, password, profile_pic, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, 
            [username, email, hashedPass, profile, role]);
        res.status(200).json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create error: " + error.message);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const {id, username, email, is_active} = await req.body;
        let updateUser = null;
        updateUser = await pool.query(`UPDATE users SET username='${username}', email='${email}', is_active=${is_active} WHERE userid=${id} RETURNING *`);
        // if(user.password) {
        //     const salt = await bcrypt.genSalt(10);
        //     const hashedPass = await bcrypt.hash(user.password, salt);
        //     updateUser = await pool.query(`UPDATE users SET${user.username ? ` username='${user.username}', ` : ' '}${user.email ? `email='${user.email}', ` : ' '}password='${hashedPass}' ${user.profile ? `, profile_pic='${user.profile}'` : ''} WHERE userid=${req.params.id} RETURNING *;`);
        // }else {
        //     updateUser = await pool.query(`UPDATE users SET userid=${req.params.id}${user.username ? `, username='${user.username}'` : ' '}${user.email ? `, email='${user.email}'` : ' '}${user.is_active !== null ? `, is_active=${user.is_active}` : ''} WHERE userid=${req.params.id} RETURNING *;`);
        // };
        if(!updateUser) res.status(400).json("Wrong credentials");
        res.status(200).json(updateUser.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update user error: "+error.message);
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteUser = await pool.query(`DELETE FROM users WHERE userid=${req.params.id}`);
        if(!deleteUser) res.status(400).json("Error ocurred");
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete user error: "+error.message);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE userid=${req.params.id}`);
        if(!user) res.status(400).json("Error ocurred");
        res.status(200).json(user.rows[0])
    } catch (error) {
        res.status(500).json(error);
        console.log("Get user error: "+error.message);
    } 
});

router.get("/", async (req, res) => {
    try {
        const users = await pool.query(`SELECT * FROM users`);
        if(!users) res.status(400).json("Error ocurred");
        res.status(200).json(users.rows)
    } catch (error) {
        res.status(500).json(error);
        console.log("Get users error: "+error.message);
    } 
});

module.exports = router;