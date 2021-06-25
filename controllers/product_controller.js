const  formidable = require('formidable')
const _ = require('lodash')
const Product = require('../models/product_model')
const fs = require("fs");
const {errorHandler} = require("../helpers/DBerrorHandler")

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