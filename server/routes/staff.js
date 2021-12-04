const router = require("express").Router();
const pool = require("../database.js");

router.post("/", async (req, res) => {
    try {
        const {firstName, lastName, email, gender} = await req.body;
        const role = "staff";
        const newStaff = await pool.query(`INSERT INTO staff(first_name, last_name, email, gender, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, 
            [firstName, lastName, email, gender, role]);
        res.status(200).json(newStaff.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create staff error: " + error.message);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const staff = await req.body;
        let updateStaff = null;
        updateStaff = await pool.query(`UPDATE staff SET staffid=${req.params.id}${staff.firstName ? `, first_name='${staff.firstName}'` : ' '}${staff.lastName ? `, last_name='${staff.lastName}'` : ' '}${staff.email ? `, email='${staff.email}'` : ''}${staff.role ? `, role='${staff.role}'` : ''} WHERE staffid=${req.params.id} RETURNING *;`);
        if(!updateStaff) res.status(400).json("Cannot update");
        res.status(200).json(updateStaff.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.log("Update staff error: "+error.message);
    };
});

router.delete("/:id", async (req, res) =>{
    try {
        const deleteStaff = await pool.query(`DELETE FROM staff WHERE staffid=${req.params.id}`);
        if(!deleteStaff) res.status(400).json("Error ocurred");
        res.status(200).json("Staff has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.log("Delete staff error: "+error.message);
    } 
});

router.get("/:id", async (req, res) => {
    try {
        const staff = await pool.query(`SELECT * FROM staff WHERE staffid=${req.params.id}`);
        if(!staff) res.status(400).json("Error ocurred");
        res.status(200).json(staff.rows[0])
    } catch (error) {
        res.status(500).json(error);
        console.log("Get staff error: "+error.message);
    } 
});

router.get("/", async (req, res) => {
    try {
        const staffs = await pool.query(`SELECT * FROM staff`);
        if(!staffs) res.status(400).json("Error ocurred");
        res.status(200).json(staffs.rows)
    } catch (error) {
        res.status(500).json(error);
        console.log("Get staffs error: "+error.message);
    } 
});

module.exports = router;