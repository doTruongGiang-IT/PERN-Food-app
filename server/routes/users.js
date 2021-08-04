const router = require("express").Router();
const pool = require("../database.js");

router.put("/:id", async (req, res) => {
    if(req.body.id === Number(req.params.id)) {
        try {
            const user = await req.body;
            let updateUser = null;

            if(user.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(user.password, salt);
                updateUser = await pool.query(`UPDATE users SET${user.username ? ` username='${user.username}', ` : ' '}${user.email ? `email='${user.email}', ` : ' '}password='${hashedPass}' ${user.profile ? `, profile='${user.profile}'` : ''} WHERE id=${req.params.id} RETURNING *;`);
            }else {
                updateUser = await pool.query(`UPDATE users SET id=${user.id}${user.username ? `, username='${user.username}'` : ' '}${user.email ? `, email='${user.email}'` : ' '}${user.profile ? `, profile='${user.profile}'` : ''} WHERE id=${req.params.id} RETURNING *;`);
            };
            if(!updateUser) res.status(400).json("Wrong credentials");
            res.status(200).json(updateUser.rows[0]);
        } catch (error) {
            res.status(500).json(error);
            console.log("Update user error: "+error.message);
        };
    }else {
        res.status(401).json("You can only update your account");
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteUser = await pool.query(`DELETE FROM users WHERE id=${req.params.id}`);
        if(!deleteUser) res.status(400).json("Error ocurred");
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete user error: "+error.message);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE id=${req.params.id}`);
        if(!user) res.status(400).json("Error ocurred");
        res.status(200).json(user.rows[0])
    } catch (error) {
        res.status(500).json(error);
        console.log("Get user error: "+error.message);
    } 
});

module.exports = router;