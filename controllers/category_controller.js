const Category = require('../models/category_model')
const {errorHandler} = require("../helpers/DBerrorHandler")

exports.create = (req,res) => {
    const category = new Category(req.body);
    category.save((err,data) =>{
        if (err){
            return res.status(400).json( {
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
}