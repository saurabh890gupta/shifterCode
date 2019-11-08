const multer = require('multer');
const path   = require('path');



const storage=multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb)
    {
      console.log("hello get condition",file,req.body)
      cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

const upload =multer({storage :storage , limits:{filesize: 1000000},fileFilter : function(req , file ,cb)
  {
    checkFileType(file ,cb);
  }
}).array('myImage',10);

function checkFileType(file ,cb){
  const filetypes=/|doc|jpeg|pdf|jpg|png|json|gif/;
  const extname =filetypes.test( path.extname(file.originalname).toLowerCase());
  const mimetype =filetypes.test(file.mimetype);
  if(mimetype && extname){
      return cb(null,true);
  }
  else{
      cb('Error:Images Only!');
  }
}

module.exports = upload;