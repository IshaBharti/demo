const Product = require("../model/product");
const User = require("../model/user");
const router = require("../routes/user");
const Category = require("../model/category");
// *************ALL Product**************************
const get_all_product = async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch {
    console.log(err);
  }
};
// *******************updateProduct*************************************
const product_update = async (req, res) => {
  const data = req.body;
  const result = await Product.findOne({
    product: data.product,
  });
  const id = req.params.id;
  try {
    const check_id = await Product.findOne({ _id: id });
    // res.send(check_id)
  } catch (err) {
    res.send("Id  not found");
  }
  try {
    const result = await Product.findOne(
      { _id: req.params.id },
      {
        product: req.body.product,
      }
    );

    console.log(result, "hello");
    res.send({ status: 200, message: "succesfulupdate Doc" });
  } catch (err) {
    console.log(err.message);
  }
};
// *********************Delete Product************************

const delete_product = async (req, res) => {
  try {
    const result = await Product.deleteOne({ id: req.params.id });
    console.log(result);

    res.send({ status: 200, message: "Deleted successfully" });
  } catch (err) {
    console.log(err.message);
  }
};
//   ****************add_category***************
const add_category = async (req, res) => {
  const { _id } = req.data;


  try{

  const  user= await User.findOne({ id: _id });
  if (user){
      const add_product = { userId: _id, ...req.body };
      const data = await new Category(add_product);
      data.save();
     return  res.status(200).send({status:200,message:"CATEGORY SAVE"})}
    else{
        return res.status(404).send({status:404,message:"UNAUTHORIZED FIRST LOGIN"})
    }
  }catch(err){
      throw err
  }
};

// ***************fetch data*************
const fetch_data = async (req, res) => {
  try{


const data = await User.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "_id",
        foreignField: "userId",
        let:{userid:"$_id"},
        pipeline:[
            {
                $match:{
                    $expr:{
                        $and: [{ $eq: ["$_id", "$$resId"] }],
                    }
                }
            }
        ],as :"user"
      },
    },
  
    {
        $lookup:{
            from: "category",
            let:{userid:"$_id"},
            pipeline: [{
            $match:{
                $expr:{
                    $and: [{ $eq: ["$_id", "$$resId"] }],
                }
            }
        }
           
    ],
    as :"Product",
    }
},
{ $unwind: "$user" },
{
    $project: {
      email: 1,
    },
  },
]);
    
    
  res.send(data)

}catch(err){
    throw err
}
}
module.exports = { get_all_product, product_update, delete_product, add_category, fetch_data };
