const express = require('express')
import { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req:Request, res:Response) => {
  res.send("haloo");
})

import categoryController from './controller/CategoryController'
import subCategoryController from './controller/SubCategoryController'
import subChildController from './controller/SubChildController'
import authController from './controller/AuthController'
import userController from './controller/UserController'
import brandController from './controller/BrandController'
import productController from './controller/ProductController'


app.use("/category",categoryController);
app.use("/subcategory",subCategoryController);
app.use("/subchild",subChildController);
app.use("/",authController);
app.use("/",userController);
app.use("/brand",brandController);
app.use("/product",productController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
