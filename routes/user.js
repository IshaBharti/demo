var express = require("express");
var router = express.Router();
var user_controller = require("../controller/user_controller");
var accessToken = require("../middleWare/authenticateToken");
const user_product = require("../controller/user_product");

router.post("/signin", user_controller.signup);
router.post("/login", user_controller.login);
router.post("/forgot", user_controller.forgotPassword);
router.post("/reset/:id", user_controller.resetPassword);
router.post("/addProduct", accessToken, user_controller.addProduct);
router.get("/getAllData", user_controller.getAllData);
router.get("/all_product", user_product.get_all_product);
router.post("/product_update/:id", user_product.product_update);
router.get("/delete_product/:id", user_product.delete_product);
router.post("/addCategory", accessToken, user_product.add_category);
router.get("/fetchdata", user_product.fetch_data);

module.exports = router;
