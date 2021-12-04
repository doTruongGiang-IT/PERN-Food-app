const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const staffRoute = require("./routes/staff");
const supplierRoute = require("./routes/supplier");
const ingredientRoute = require("./routes/ingredient");
const orderRoute = require("./routes/orders");
const orderDetailRoute = require("./routes/orderDetail");
const productRoute = require("./routes/products");
const checkoutRoute = require("./routes/checkout");
const drinksRoute = require("./routes/drinks");
const accompanyRoute = require("./routes/accompanyingFood");
const statisticsRoute = require("./routes/statistics");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename:  (req, file, callback) => {
        callback(null, req.body.name);
    },
});

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/staff", staffRoute);
app.use("/api/order", orderRoute);
app.use("/api/order_detail", orderDetailRoute);
app.use("/api/product", productRoute);
app.use("/api/drinks", drinksRoute);
app.use("/api/supplier", supplierRoute);
app.use("/api/ingredient", ingredientRoute);
app.use("/api/accompany", accompanyRoute);
app.use("/api/payment", checkoutRoute);
app.use("/api/statistics", statisticsRoute);

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
})