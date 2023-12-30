import multer from "multer";
import path from 'path';
import { RequestHandler } from "express";

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        const filename = file.fieldname + '-'+ Date.now() + path.extname(file.originalname);
        cb(null,filename);
    }
});

const imageFilter = (req: any, file : any, cb: any) => {
    try{
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const isImage = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const isMimeTypeImage = file.mimetype.startsWith('image/');
    if (isImage && isMimeTypeImage) {
        return cb(null, true);
    } else {
        return cb(new Error('Only image files are allowed!'), false);
    }
    }catch(err:any){
        throw new Error( 'Only image files are allowed!');
    }
};

const multerUpload = multer({ storage: storage, fileFilter: imageFilter });
export const handleFileUpload = (fields: { name: string; maxCount: number }[]): RequestHandler => {
    return multerUpload.fields(fields);
  };