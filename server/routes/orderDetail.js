const router = require("express").Router();
const pool = require("../database.js");

router.post("/", async (req, res) => {
    try {
        const {orderid, productid, accompanyid, quantity} = await req.body;
        const newDetail = await pool.query(`INSERT INTO order_detail(orderid, productid, accompanyingfoodid, quantity) VALUES($1, $2, $3, $4) RETURNING *`, 
            [orderid, productid, accompanyid, quantity]);
        res.status(200).json(newDetail.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create order detail food error: " + error.message);
    };
});

// router.put("/", async (req, res) => {
//     try {
//         const {orderid, productid, accompanyid, quantity} = await req.body;
//         let updateDetail = null;
//         updateDetail = await pool.query(`UPDATE order_detail SET ${orderid ? `orderid='${orderid}, '` : ' '}${productid ? `productid='${productid}'` : ' '} WHERE orderid='${req.params.orderid}' and productid='${req.params.productid}' RETURNING *;`);
//         if(!updateDetail) res.status(400).json("Cannot update");
//         res.status(200).json(updateDetail.rows[0]);
//     } catch (error) {
//         res.status(500).json(error);
//         console.log("Update accompanying food error: "+error.message);
//     };
// });

// router.delete("/:orderid/:productid", async (req, res) =>{
//     try {
//         const deleteDetail = await pool.query(`DELETE FROM order_detail WHERE orderid='${req.params.orderid}' and productid='${req.params.productid}'`);
//         if(!deleteDetail) res.status(400).json("Error ocurred");
//         res.status(200).json("Order detail has been deleted");
//     } catch (error) {
//         res.status(500).json(error);
//         console.log("Order detail food error: "+error.message);
//     } 
// });

router.get("/order/:id", async (req, res) => {
    try {
        const orderDetails = await pool.query(`SELECT * FROM order_detail WHERE orderid=${req.params.id}`);
        if(!orderDetails) res.status(400).json("Error ocurred");
        res.status(200).json(orderDetails.rows)
    } catch (error) {
        res.status(500).json(error);
        console.log("Get orderDetails error: "+error.message);
    } 
});

module.exports = router;