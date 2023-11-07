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

app.use("/category",categoryController);
app.use("/subcategory",subCategoryController);
app.use("/subChild",subChildController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
