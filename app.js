const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')


require('dotenv').config()

const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user_route.js')
const categoryRoute = require('./routes/category_route.js')
const productRoute = require('./routes/product_route.js')


//app
const app = express()

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => console.log("DB Connected"))

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoute)
app.use("/api",productRoute)




const port = process.env.PORT || 8000

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})