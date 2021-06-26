const  formidable = require('formidable')
const _ = require('lodash')
const Product = require('../models/product_model')
const fs = require("fs");
const {errorHandler} = require("../helpers/DBerrorHandler")

exports.read = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.productById = (req,res,next,id) =>{
    Product.findById(id).exec((err,product)=>{
        if (err || !product){
            return res.status(400).json({
                error:"ไม่พบสินค้านี้"
            })
        }
        req.product = product
        next();
    })
}

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) =>{
        if (err){
            return res.status(400).json({
                error:'รูปภาพไม่สามารถอัพโหลดได้'
            })
        }

        const {name,description,price,category,quantity,shipping} = fields

        if (!name || !description || !price||!category||!quantity||!shipping){
            return res.status(400).json({
                error:'กรุณากรอกข้อมูลให้ครบทุกช่อง'
            })
        }
        let product = new Product(fields)

        if (files.photo){
            if (files.photo.size > 10000000){
                 return res.status(400).json({
                     error:'รูปภาพต้องมีขนาดไม่เกิน 1 Mb'
                 })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err,result) =>{
            if (err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) =>{
        if (err){
            return res.status(400).json({
                error:'รูปภาพไม่สามารถอัพโหลดได้'
            })
        }

        const {name,description,price,category,quantity,shipping} = fields

        if (!name || !description || !price||!category||!quantity||!shipping){
            return res.status(400).json({
                error:'กรุณากรอกข้อมูลให้ครบทุกช่อง'
            })
        }
        let product = req.product;
        product = _.extend(product,fields);

        if (files.photo){
            if (files.photo.size > 10000000){
                return res.status(400).json({
                    error:'รูปภาพต้องมีขนาดไม่เกิน 1 Mb'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err,result) =>{
            if (err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req,res) =>{
    let product = req.product
    product.remove((err,deleted) => {
        if (err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({
            message:'สินค้าถูกลบแล้ว'
        })
    })
}

// ขาย / มีของ

exports.list = (req,res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err,products) => {
            if (err){
                return res.status(400).json({
                    error: 'ไม่พบสินค้านี้ในระบบ'
                })
            }
            res.json(products)
        })
}
exports.listRelated = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id:{$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category','_id name')
        .exec((err,products) => {
            if (err){
                return res.status(400).json({
                    error: 'ไม่พบสินค้านี้ในระบบ'
                })
            }
            res.json(products)
        })
}
