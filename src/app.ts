const express = require('express')
import { Request, Response } from 'express';

const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req:Request, res:Response) => {
  res.send("haloo");
})

import categoryController from './controller/CategoryController'
import subCategoryController from './controller/SubCategoryController'
import subChildController from './controller/SubChildController'
import authController from './controller/AuthController'
import userController from './controller/UserController'
import brandController from './controller/BrandController'

app.use("/category",categoryController);
app.use("/subcategory",subCategoryController);
app.use("/subChild",subChildController);
app.use("/",authController);
app.use("/",userController);
app.use("/brand",brandController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
