const router = require("../routes/user");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const sendingEmail = require("../mailer/index");
const Product = require("../model/product");
const { find } = require("../model/user");
const generateToken = require("../auth/token");
const accessToken = require("../middleWare/authenticateToken");
const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const category = require("../model/category");
// **************Signup********************

// localhost:3000/user/signin
const signup = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const datastoring = {
      Name: req.body.Name,
      email: req.body.email,
      number: req.body.number,
      password: pass,
    };
    const data = await new User(datastoring);
    console.log(data);

    const result = await User.findOne({ email: data.email });
    if (result) {
      res.send("Email is alreaday taken  take another email or login ");
    }

    data.save();
    return res
      .status(200)
      .send({ status: 200, message: `sign up has suceesfully welcome ${datastoring.Name}` });
  } catch (err) {
    console.log("error", err);
    return res.status(500).send({ status: 500, message: "Something went wrong" });
  }
};

// **************login*************************
const login = async (req, res) => {
  const password = req.body.password;
  const data = await User.findOne({ email: req.body.email });
  // console.log(data,")))))))");
  if (data) {
    const check_password = await bcrypt.compare(password, data.password);
    if (check_password) {
      const hash = "hhh";
      const token = jwt.sign({ _id: data._id }, hash);
      res.send(token);
      return res.status(200).send({ status: true, message: `login successful ${data.Name}` });
    } else {
      return res.send("incorrect password");
    }
  } else {
    return res.status(404).send({ status: false, message: "User Not exist " });
  }
};
// ******************forget password*********************

const forgotPassword = async (req, res) => {
  let data = await User.findOne({ email: req.body.email });

  // console.log(data);
  try {
    if (data != null) {
      res.status(200).send({ status: 200, message: "Check mail for reset" });
    } else {
      res.status(404).send({ status: 404, message: "email is not valid" });
    }
  } catch (err) {
    res.status(404).send({ status: 400, message: "Something error" });
  }
  sendingEmail(data.email, data._id, token);
};
// ************Reset Password***********
const resetPassword = async (req, res) => {
  const id = req.params.id;

  try {
    const idData = await User.findOne({ _id: id });

    const pass = await bcrypt.hash(req.body.password, 10);
    const result = await User.updateOne(
      { _id: req.params.id },
      {
        password: pass,
      }
    );

    console.log(result, "hello");
    res.send({ status: 200, message: "Succesfully Update Password" });
  } catch (err) {
    console.log(err.message);
  }
};
// ************** add Product *********************
const addProduct = async (req, res) => {
  const id_user = req.params.id;

  try {
    const check_id = await Product.findOne({ id: id_user });

    const add_product = { userId: check_id, ...req.body };
    const data = await new Product(add_product);

    data.save();

    res.status(200).send({ status: 200, message: `Products is added` });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
// ***************get**********************
const getAllData = async (req, res) => {
  const data = await User.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "_id",
        foreignField: "userId",
        as: "Products",
      },
    },
  ]);
  return res.send(data);
};

module.exports = { signup, login, forgotPassword, resetPassword, addProduct, getAllData };
