//for excle file 
const mongoose=require('mongoose')
//data base coonection require
require('../Config/dbconfig')
//schema require
require('../Database/schema/users')
require('../Database/seeder/book')
require('../Database/seeder/person')
// model require
// const user = mongoose.model('Users');
// const Contactus=mongoose.model('Contactus');
// const book = mongoose.model('Book');
// const person=mongoose.model('Person');
var mongoXlsx = require('mongo-xlsx');
var json2xls = require('json2xls');
// var services=require('./services')
var fs=require('fs') //for csv file
const { Parser } = require('json2csv'); ///for csv file
var path=require('path');
// module.exports.excelSheet =(req, res)=>{
//     console.log("datawww run");

// // this for formated data for excel
//     var excelData =async function(){
//     var data = await user.find({});
//     var xls = json2xls(data,{
//         fields: ['_id', 'user_name', 'email', 'password', 'comments']
//     });
    
//     fs.writeFileSync(__dirname +'/../Uploads/data.xlsx', xls, 'binary');
//         console.log("excl creater");
//         res.send("excl creater");
//     };

//   excelData();

// }

module.exports.home=(req,res)=>{
    console.log("home ejs file")
    res.render('home', {
        navData
    });
}
 




var mammoth = require("mammoth");
module.exports.Filedocsread=(req,res)=>{
    upload(req, res, (err) => {
        // console.log("inside upload",req.body,file)
        console.log("inside upload",req.files,req.files[0].path)
        var options = {
            convertImage: mammoth.images.imgElement(function(image) {
                return image.read("base64").then(function(imageBuffer) {
                    // console.log("dsjsdjs",imageBuffer)
                    return {
                        src: "data:" + image.contentType + ";base64," + imageBuffer
                    };
                });
            })
        };
        mammoth.extractRawText({path: req.files[0].path},options)
        .then(function(result){
            // console.log("hey data",result)
            var text = result.value; // The raw text  
            //   console.log("hey data",text)

             var kam= docTableContent(text);
              console.log("maindata",kam)
              
// res.send(JSON.stringify(kam))


            // let array = [...text.matchAll("TABLE OF CONTENTS")];
            // //console.log('=============',array);
            // var pos;
            // var jam=[];

            // var ham=[];
            //  array.forEach((d,i)=>{
            //     var tcn=array[i][0]
            //      pos=array[i].index
            //     // console.log(tcn,pos);
            //  })
            //  var startPostion=text.indexOf("1.0", pos);
            //  var EndPostion=text.indexOf("32", startPostion);
            //   //console.log(startPostion,EndPostion,"hdfhdgf")
                               
            //     //  console.log("iiii",(i + ".0").toString() )
            //     // var n = text.search((i + ".0").toString());
            //     //     jam.push(n)
            //   var getString=text.slice(startPostion,EndPostion);
            //   var newarr=getString.split('\n\n');
            //   let toc=[];
            //   console.log(newarr.length,newarr[0].length)
            //  for(let i=0;i<=newarr.length;i++){
            //     let key='';
            //     let value='';
            //     let substr=newarr[i];
            //     if(substr){
            //         for(let k=0;k<substr.length;k++){
                        
            //             var patt1 = /[0-9]/g;
            //             var result = newarr[i][k].match(patt1);
            //             //console.log('====', newarr[i][k],'  ',result);
            //             if(result||newarr[i][k]==='.'){
            //                 key+=newarr[i][k]
            //             }
            //             if(newarr[i][k].match(/^[A-Za-z]+$/)){
            //                 value=newarr[i].substr(key.length)
            //                 break;
            //             }
            //         }
            //         toc[key]=value
            //         console.log('key',key,'  ',value);
            //     }
            //  }
            //  console.log('newarr',toc);
            //  jam.forEach((d,i)=>{
            //      if(d>0){
            //         ham.push(d);
            //      }
            //  })
            //  console.log(jam,jam.length,ham)
            // //  var k=ham.length-1;
            // //  console.log("sdfjsfhg",ham[k]);
            // //  var getString=text.slice(ham[0],ham[k]);
            //   console.log("sdfjsfhg",getString);
            //         //  var getString=text.slice(startPostion,EndPostion);
                    //  console.log(getString)
                    //  var n = text.search("TABLE OF CONTENTS");
                    //  console.log(n)
                    // var messages = result.messages;
                        // console.log(text)
                    // res.send(text)
        })
        .done();
    })
   
}



var docTableContent=(text)=>{
    // console.log(text,"dsfgsdfgsfgsjhfgsdgfhsdgfhsdgfhjdsfgjsgf")
    let array = [...text.matchAll("TABLE OF CONTENTS")];
    //console.log('=============',array);
    var pos;
    var mainArray=[];
    var arr=[];
     array.forEach((d,i)=>{
        var tcn=array[i][0]
         pos=array[i].index
        // console.log(tcn,pos);
     })
     var startPostion=text.indexOf("1.0", pos);
     var EndPostion=text.indexOf("32", startPostion);
      //console.log(startPostion,EndPostion,"hdfhdgf")            
        //  console.log("iiii",(i + ".0").toString() )
        // var n = text.search((i + ".0").toString());
        //     jam.push(n)
      var getString=text.slice(startPostion,EndPostion);
      var newarr=getString.split('\n\n');
      let toc=[];
      let toc1=[];
      let toc3=[];
        let value='';
    //   console.log(newarr.length,newarr[0].length)
     for(let i=0;i<=newarr.length;i++){
        let key='';
      
        let substr=newarr[i];
        let key2='';
        if(substr){
            for(let k=0;k<substr.length;k++){
                var patt1 = /[0-9]/g;
                var patt2=/[1-9]/g;
                var result = newarr[i][k].match(patt1);
                //console.log('====', newarr[i][k],'  ',result);
                if(result||newarr[i][k]==='.'){
                    key+=newarr[i][k]
                }
                key2=key;
                if(key2.includes(`.${patt2}`)){
                    console.log(key2,"asdnsajhda")
                }
                // console.log(key2,"sdfjdfndf")
                if(newarr[i][k].match(/^[A-Za-z]+$/)){
                    value=newarr[i].substr(key.length)
                    break;
                }
            }
            toc[key]=value
            if(key.includes('.0')){   
                toc1[key]=value={name:value,};
            }

            //  console.log('key',key,'  ',value);
        }
     }
    //  console.log('fullArray',toc);
     Object.keys(toc).forEach((h,l)=>{
        //   console.log("gggggggg",h,toc[h])
     })
    // console.log('newarr',toc1);
    // console.log(Object.keys(toc1).length);
    // console.log('arrrrrrrrrrrrrrr',arr);
    Object.keys(toc1).forEach((a,b)=>{
        //  console.log("hhh",toc1[a]['name'])
        Object.keys(toc).forEach((h,l)=>{
            //  console.log("jjj",h.slice(0,2))
            // h.includes(h[0]);
            if(h.slice(0,2)==a.slice(0,2)){
            arr.push(arr[h]=toc[h])
            }
            // arr.push({name:toc1[a]['name'],sub:toc[h]})
            // console.log("gmg",h.slice(0,2),a.slice(0,2))  
           
        //   console.log('newarr=====',arr);
        })
        toc3[a]=({name:toc1[a]['name'],sub:arr})
        arr=[];
        // toc3[a]=arr;
        // console.log('newarr',Number(a));
    })
//   console.log('solve data',toc3);
  mainArray=toc3;
//   console.log('solve data',mainArray); 
  Object.keys(mainArray).forEach((data,index)=>{
    //   console.log("sdjfsdhf",data,index)
      mainArray[data].sub.splice(0,(mainArray[data].sub).length+1)
      delete mainArray[data].sub[data];
    //   if(Object.keys(mainArray[data].sub).length==0){
    //           delete mainArray[data].sub
    //         //   console.log(Object.keys(mainArray[data].sub));
    //   }
     
    // console.log("indexing",mainArray)
    
    //  console.log( "hhh",mainArray[data].sub.find('1.0'));      
  })
  var jam=[]
  jam=mainArray
//   console.log("FGFFFF",jam)
//  return mainArray

//  Object.keys(mainArray).forEach((data,b)=>{
//     //  console.log("hhh",data)
//     console.log("jjj",mainArray[data].sub)
//     console.log("tttt",mainArray[data])
    // Object.keys(mainArray[data].sub).forEach((h,l)=>{
       

        // h.includes(h[0]);
        // if(h.slice(0,2)==a.slice(0,2)){
        // arr.push(arr[h]=toc[h])
        // }
        // arr.push({name:toc1[a]['name'],sub:toc[h]})
        // console.log("gmg",h.slice(0,2),a.slice(0,2))  
       
    //   console.log('newarr=====',arr);
    // })
    // toc3[a]=({name:toc1[a]['name'],sub:arr})
    // arr=[];
    // toc3[a]=arr;
    // console.log('newarr',Number(a));
// })



//   Object.keys(mainArray).forEach((data,index)=>{
//     //  console.log(index,"hmeee")
//     //  console.log("just",mainArray[data].sub);
//     // console.log("just",mainArray[data].sub)
    
//      Object.keys(mainArray[data].sub).forEach((d,i)=>{
//          if(Number(data.slice(0, 1))===Number(d.slice(0, 1))){

         
//         //  console.log( "hmara bhi hak h", Object.keys(mainArray[data].sub) )
//          }
         
//      })
//   })
  
//   Object.keys(mainArray).forEach((data,index)=>{
//     //   console.log("sdjfsdhf",data,index)
//     delete mainArray[data].sub[data];
//     if(Object.keys(mainArray[data].sub).length==0){
//             delete mainArray[data].sub
//     }
//     //   console.log("j",mainArray[data].sub)
//     //  console.log( "hhh",mainArray[data].sub.find('1.0'))
//   })
 
  
//     unquieTm= Object.keys(mainArray).map(d=>mainArray[d].sub)
// console.log("hhhh",unquieTm)
    //  jam.forEach((d,i)=>{
    //      if(d>0){
    //         ham.push(d);
    //      }
    //  })
    //  console.log(jam,jam.length,ham)
    // //  var k=ham.length-1;
    // //  console.log("sdfjsfhg",ham[k]);
    // //  var getString=text.slice(ham[0],ham[k]);
    //   console.log("sdfjsfhg",getString);

}
  





// var docTableContent=(text)=>{
//     // console.log(text,"dsfgsdfgsfgsjhfgsdgfhsdgfhsdgfhjdsfgjsgf")
//     let array = [...text.matchAll("TABLE OF CONTENTS")];
//     //console.log('=============',array);
//     var pos;
//     var mainArray=[];
//     var arr=[];
//      array.forEach((d,i)=>{
//         var tcn=array[i][0]
//          pos=array[i].index
//         // console.log(tcn,pos);
//      })
//      var startPostion=text.indexOf("1.0", pos);
//      var EndPostion=text.indexOf("32", startPostion);
//       //console.log(startPostion,EndPostion,"hdfhdgf")            
//         //  console.log("iiii",(i + ".0").toString() )
//         // var n = text.search((i + ".0").toString());
//         //     jam.push(n)
//       var getString=text.slice(startPostion,EndPostion);
//       var newarr=getString.split('\n\n');
//       let toc=[];
//       let toc1=[];
//       let toc3=[];
//     let value='';
//     //   console.log(newarr.length,newarr[0].length)
//      for(let i=0;i<=newarr.length;i++){
//         let key='';
//         let substr=newarr[i];
//         let key2='';
//         if(substr){
//             for(let k=0;k<substr.length;k++){
//                 var patt1 = /[0-9]/g;
//                 var patt2=/[1-9]/g;
//                 var result = newarr[i][k].match(patt1);
//                 //console.log('====', newarr[i][k],'  ',result);
//                 if(result||newarr[i][k]==='.'){
//                     key+=newarr[i][k]
//                 }
//                 key2=key;
//                 if(key2.includes(`.${patt2}`)){
//                     console.log(key2,"asdnsajhda")
//                 }
//                 // console.log(key2,"sdfjdfndf")
//                 if(newarr[i][k].match(/^[A-Za-z]+$/)){
//                     value=newarr[i].substr(key.length)
//                     break;
//                 }
//             }
//             toc[key]=value
//             if(key.includes('.0')){   
//                 toc1[key]=value={name:value,};
//             }     
//         }
//      }
//     //  Object.keys(toc).forEach((h,l)=>{
//     //  })
//     Object.keys(toc1).forEach((a,b)=>{
//         Object.keys(toc).forEach((h,l)=>{
//             if(h.slice(0,2)==a.slice(0,2)){
//             arr.push(arr[h]=toc[h])
//             }
//         })
//         toc3[a]=({name:toc1[a]['name'],sub:arr})
//         arr=[];
//     })
//     mainArray=toc3;
//     Object.keys(mainArray).forEach((data,index)=>{
//       mainArray[data].sub.splice(0,(mainArray[data].sub).length+1)
//       delete mainArray[data].sub[data];
//     })

    

// return mainArray
// }








// var docTableContent=(text)=>{
//     var pos;
//      var startPostion=text.indexOf("1.0", pos);
//      var EndPostion=text.indexOf("32", startPostion);
//       var getString=text.slice(startPostion, EndPostion);
//       var newarr=getString.split('\n\n');
//       let arrObj = [];
//       newarr.forEach(item => {
//         let obj = {};
//         obj[item.match(/[0-9.]+/)] = item.slice(item.match(/[0-9.]+/)[0].length, item.length);
//         arrObj.push(obj)
//       })
//       var result = arrObj.reduce((prev, curr) => {
//         for(let k in curr) {
//             if(curr[k] === curr[k].toUpperCase()) {
//                 prev.push({ name: curr[k] })
//             } else {
//                 prev[prev.length - 1]['data'] ? prev[prev.length - 1]['data'].push(curr) : prev[prev.length - 1]['data'] = [];
//             }
//         }
//         return prev;
//       }, []);
//       return result;
// }





























module.exports.csvFile =(req, res)=>{
    var csvData =async function(){
            var data = await user.find({});
            res.send(data);
            var fields = ['_id', 'user_name', 'email', 'password', 'comments'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(data);
            // fs.writeFile('file.csv', csv, function(err) {
            // if (err) throw err;
            // console.log('file saved');
            // });
            fs.writeFileSync(__dirname +'/../Uploads/data.csv', csv, 'binary');
            console.log("csv creater");
            
    }
csvData();
}

// var formidable = require("formidable");
// module.exports.Formdib=(req,res)=>{
//     var form = new formidable.IncomingForm();

//     form.parse(req);

//     form.on('fileBegin', function (name, file){
//         file.path = __dirname + '/data/' + file.name;
//     });

//     form.on('file', function (name, file){
//         console.log('Uploaded ' + file.name);
//     });

//     return res.json(200, {
// 							result: 'Upload Success'
//     });
// };



const sgMail = require('@sendgrid/mail');
 sgMail.setApiKey('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');
//  sgMail.setApiKey('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')
// by sendGrid send mail for fake
module.exports.FakeMail=(req,res)=>{
    console.log("hel;lo get dat")
    const msg = {
    to: 'mishra.arun18@gmail.com',
    from: 'mishra.arun18@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then((res,err)=>{
        console.log("msgv ggggggg",err)
        if(res){
        console.log("msg",res)
        }else{
        console.log("err")
        }
    });

} 

module.exports.testapi=(req,res)=>{
    try{
        if(req.body){
            user.aggregate([{ $match: { "zip": 90210 }}]);
        }else{
            res.send({err:"somthing error in  req.body"})            
        }
    }catch{

    }
}  

module.exports.passChange=(req,res)=>{
    var khhh=cryptr.encrypt(req.body.pass);
    var hhhk=cryptr.decrypt(khhh);
    console.log("hhhhhhhhhhhhh", khhh,hhhk);
}

module.exports.getdataby=(req,res)=>{
    var h=[];
    user.find({},{_id:1}).then((results)=>{ //all id find in table
        // user.find({},{email:1}).then((res)=>{  //for id and email
           // user.find().select({ email: 0 }).then((res)=>{ //not incude email all data find
          // user.find({},{_id:0,email:1}).then((res)=>{ //this is use for only email
            console.log("ressssssss",results);
            results.forEach((result)=>{
                h.push(Contactus.findOne({user_id:result._id}))           
            })
            Promise.all(h).then((r)=>{
                let data = r.filter(val => {
                    if(val) return val;
                })
                    // console.log(data,"hjghjg");  
                    res.status(200).send(data);
            })
    })
    
}
/// for ref use 
module.exports.bookDetails=(req,res)=>{ 
    try{
        console.log("try body",req.body); 
        const author = new person({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
          });
          
          author.save().then((result)=>{
              console.log(result,"fjdghdfj")
                   
                    if(result){
                        console.log(result._id,"fjdghdfj")
                        new book({
                                bookname: req.body.bookname,
                                personId:result._id,
                                auther:req.body.auther,
                                price:req.body.price   // assign the _id from the person
                            }).save(function (err) {
                            if (err) return handleError(err);
                            else console.log("output")
                            // thats it!
                            });
                        }   
                        else{
                            console.log("somthing error")  
                        }
          });
          
    }catch(err){
        return res.status(401).json({error: err});
    }
}

module.exports.GetbookDetails=(req,res)=>{ 
    try{
        book.find({bookname:"kali"}).populate('personId').exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story);
    })
}catch(err){
        return res.status(401).json({error: err});
    }
}

module.exports.PersonDetails=(req,res)=>{
    try{
        // console.log("try body",req.body); 
            new book({
                bookname: req.body.bookname,
                auther:req.body.auther,
                price:req.body.price   // assign the _id from the person
            }).save().then((result)=>{
                // console.log(result)
                        if(result){
                            new person({
                                books:result._id,
                                name:req.body.name  
                            }).save().then((data)=>{
                                console.log("result ",data)
                            })
                            .catch((err)=>{
                                return res.status(401).json({error: err,resp:"somthing problem to save person data"});
                            })
                        }   
                        else{
                            console.log("somthing error")  
                        }
                }).catch((err)=>{
                    return res.status(401).json({error: err,resp:"error to data save"});
                });
    }catch{
        return res.status(401).json({error: err,resp:"error savesomthig data"});
    }
}


module.exports.GetPersonDetails=(req,res)=>{ 
    try{
        console.log("hfjksdfj")
        person.find({name:"kumar"}).populate('books').exec(function (err, person) {
    if (err) return handleError(err);
    console.log('The author is %s', person);
    res.send({resp:person})
    })
}catch(err){
        return res.status(401).json({error: err});
    }
}
//end ref use

//lookup for join
module.exports.LookupData=(req,res)=>{ 
        book.aggregate([
            { $lookup:
                {
                from: "person",
                localField:"books",
                foreignField: "_id",
                as: "comments"
                }
            }
        ]).then((data)=>{
            if(data){
console.log("data",data)
            }else{
                console("some problem to data")
            }
        })
}

//lookup for join
// var phantom = require('phantom');   
var wkhtmltopdf = require('wkhtmltopdf');
module.exports.HtmlPdf=(req,res)=>{
// phantom.create().then(function(ph) {
//     ph.createPage().then(function(page) {
//         page.open("http://www.google.com").then(function(status) {
//             page.render('google.pdf').then(function() {
//                 console.log('Page Rendered');
//                 ph.exit();
//             });
//         });
//     });
// });
wkhtmltopdf('http://google.com/', { output: path.resolve(__dirname,'./test.pdf') }, function (err, stream) {
    services.saveToPDF('spiris',path.resolve(__dirname,'./test2.pdf'),{},()=>{
        // res.status(200).json({ message: 'ok' });
         console.log("streamff")
         res.send('ok')
    })
    console.log("hello")
    // console.log(stream)
    // console.log(err)
  // do whatever with the stream
//   res.status(200).json({ message: 'ok' });
})
}


// var PDFParser=require('pdf2json');
// var path = osHomedir();
// var homepath = path.replace(new RegExp('\\' + path.sep, 'g'), '/');
// var pdfFilePath = homepath + '/Downloads/'+;


// if (fs.existsSync(pdfFilePath)) {
//   //Read the content of the pdf from the downloaded path
//   var pdfParser = new PDFParser(browser, 1);
//   pdfParser.on("pdfParser_dataError", function (errData) {
//      console.error(errData.parserError)
//   });
//   pdfParser.on("pdfParser_dataReady", function (pdfData) {
//   //console.log('here is the content: '+pdfParser.getRawTextContent());
//   browser.assert.ok(pdfParser.getRawTextContent().indexOf(textToVerify) > -1);
//   });

//   pdfParser.loadPDF(pdfFilePath);
// } else {
//     console.log('OOPs file not present in the downloaded folder');
//     //Throw an error if the file is not found in the path mentioned
//     browser.assert.ok(fs.existsSync(pdfFilePath));
// }

var upload=require('./upload');
var PdfReader = require("pdfreader").PdfReader;

module.exports.FilePdfReade=(req,res)=>{
    var kal;
    
            upload(req, res, (err) => {
                console.log("inside upload",req.files)
                var promise=new Promise((resolve,reject)=>{
                    new PdfReader().parseFileItems(req.files[0].path, (err, item)=>{
                        //  console.log(item,"FJHF")
                        if (item && item.text){
                            // console.log(item.text);
                        resolve(item.text)
                        }
                    });    
                })
                promise.then((data)=>{
                    console.log("hghghghg",data)
                    res.send(data)
            })
    





    })
    // upload(req, res, (err) => {
    //         console.log("inside upload",req.files)
    //         new PdfReader().parseFileItems(req.files[0].path, (err, item)=>{
    //             //  console.log(item,"FJHF")
    //             if (item && item.text){
    //                 console.log(item.text);
    //                 kal=item.text
                   
    //             }
    //         });    
    // })
   
   
}

// var dxe = require('docx-extractor');
// module.exports.File=(req,res)=>{
//     upload(req, res, (err) => {
//         // console.log("inside upload",req.body,file)
//         console.log("inside upload",req.files)
//             // dxe.someMethod(req.files[0].path, function(data){
//             //     console.log(data)
//             // })
//     })
// }


var WordExtractor = require("word-extractor");
var extractor = new WordExtractor();

    // var PDFExtract = require('PDFExtract');
    // var pdfExtract = new PDFExtract();

// module.exports.Filedocsread=(req,res)=>{
//     upload(req, res, (err) => {
//         // console.log("inside upload",req.body,file)
//         console.log("inside upload",req.files)
//         var extracted = extractor.extract(req.files[0].path);
//         extracted.then(function(doc) {
//         //   console.log("read data",doc.getBody());
//           res.send(doc.getBody())
//         });
//     })


    
//     // pdfExtract.extract('./example.pdf', {} /* options*/, function (err, data) {
//     //     if (err) return console.log(err);
//     //     fs.writeFileSync('./example-output.json', JSON.stringify(data, null, '\t'));
//     //     var lines = PDFExtract.utils.pageToLines(data.pages[0], 2);
//     //     var rows = PDFExtract.utils.extractTextRows(lines);
//     //     var text = rows.map(function (row) {
//     //         return row.join('');
//     //     }).join('\n');
//     //     fs.writeFileSync('./example-output.txt', text);
//     //     console.log(JSON.stringify(data, null, '\t'));
//     // });


// }


















// module.exports.Filedocsread=(req,res)=>{
//     upload(req, res, (err) => {
// mammoth.extractRawText({path: req.files[0].path})
//     .then(function(result){
//         var text = result.value; // The raw text 

//         //this prints all the data of docx file
//         console.log(text);

//         for (var i = 0; i < text.length; i++) {
//             //this prints all the data char by char in separate lines
//             console.log(text[i]);
//         }
//         var messages = result.messages;
//         console.log(messages)
//     })
//     .done();
// })
// }
// var superagent =require("superagent");

// module.exports.Filedocsread=(req,res)=>{
//     upload(req, res, (err) => {
//         console.log("inside upload",req.files)
// const url = req.files[0].path;

// const main = async () => {

//   const response = await superagent.get(url)
//     .parse(superagent.parse.image)
//     .buffer();

//   const buffer = response.body;

//   const text = (await mammoth.extractRawText({ buffer })).value;
//   const lines = text.split('\n');

//   console.log(lines);
// };

// main().catch(error => console.error(error));
//     })
// }



var docx4js= require("docx4js")

module.exports.readdocx4j=(req,res)=>{
    upload(req, res, (err) => {
        // console.log("inside upload",req.body,file)
        console.log("inside upload",req.files,req.files[0].path)
    docx4js.load((req.files[0].path)).then(docx => {
              console.log(docx);
            //   res.send(docx)
          // console.log("Content of the body is: " +docx.getObjectPart("word/header1.xml").text());
        //   console.log("Content of the body is: " + docx.getObjectPart("word/footer2.xml").text());
            console.log("Content of the body is: " +  docx.getObjectPart("word/document.xml"));
            // res.render('home',docx.getObjectPart("word/document.xml").html())
            // res.render(docx.getObjectPart("word/document.xml").html());
            // console.log("Content of the body is: " + docx.officeDocument.content.text());
            // var text= docx.officeDocument.content.text()
            // var n=text.search('Ponds')
            // var index=text.indexOf('Ponds');
            // var count=(text.match(/Ponds/g))
            // console.log(count,n,index)
            // var TextInsideLi =docx.officeDocument.content.getElementsByTagName('p').
            // var TextInsideLi = text.getElementsByTagName('h1')[0].innerHTML;
            //  console.log("hello",TextInsideLi)
                // res.send(text)
                

          // console.log("Content of the body is: " +  docx.getObjectPart("word/footer2.xml").text())
      });
    })
}

module.exports.fsreadfile=(req,res)=>{
    upload(req, res, (err) => {
        // console.log("inside upload",req.body,file)
        console.log("inside upload",req.files,req.files[0].path)
  const searchkeywords = fs.readFileSync(req.files[0].path,'utf-8');
  for (let kword of searchkeywords) {
  console.log(`Search Keyword: ${kword}`);
  
  }
  fs.readFile(req.files[0].path,"utf8",(err,data)=>{
      console.log("dsshdfgs",data)
      if(err){
          console.log(err);
      }
      if(data){
  if(data.includes('ASTM'))
  {
      console.log(data,"geee")
  }
      }
  })
       
})
  
  
}



const pdf = require('pdf-parse');
module.exports.testData= (req, res) => {
    console.log("file found",req.body.fileName)
    upload(req, res, (err) => {
        //  console.log("inside upload",req.files,req.files[0].path)
        let dataBuffer = fs.readFileSync(req.files[0].path);
        pdf(dataBuffer).then(function (data) {
             console.log(data);
            // console.log(data.numrender);
            // console.log(data.info);
            // console.log(data.metadata);
            // console.log(data.version);
            // console.log(data.text);
            var a=data.text;
            // let index=a.lastIndexOf("Reasons for Studying Concepts of Programming Languages")
            // console.log(index)
            // let datab =a.split('\n\n')
            //  res.status(200).send(datab.toString())
            //  console.log(a)
             res.status(200).send(a)   
        });
    })
}


module.exports.simplePdfUpload= (req, res) => {
    // console.log("file found",req.body.fileName)
    upload(req, res, (err) => {
        console.log("inside upload fggfg",req.files[0].path)
         let dataBuffer = fs.readFileSync(req.files[0].path);  
         pdf(dataBuffer).then(function(data) {
              console.log(data.text,"dfhsfhsdf")
            
            //  res.send({"path":req.files[0].path,"jsondata":data,})
         })
         .catch(function(error){
             // handle exceptions
        }) 
    })
}
// const pdf2html = require('pdf2html')

const pdfshift = require('pdfshift')('e5e5f96b75a9416f8ab24f28585e8d25');
PDFParser = require("pdf2json");
// PFParser = require("./pdf2json/pfparser");
const streamBuffers = require('stream-buffers');
module.exports.pdfTojsonFile=(req,res)=>{
    upload(req, res, (err) => {
            let pdfParser = new PDFParser();
            fs.readFile(req.files[0].path, (err, pdfBuffer) => {
            if (!err) {
                var buf = new Buffer(pdfBuffer, "utf-8");    
                var json = buf.toJSON(buf);
                    console.log("jsontype data111",json);
                    pdfParser.parseBuffer(pdfBuffer)
                console.log("jsontype data", pdfBuffer);
                }
            })
             
            // let dataBuffer = fs.readFileSync(req.files[0].path);
            // pdf(dataBuffer).then(function(data) {
            //     console.log(data,"json data")
            //     res.send(data)
            // })
            // .catch(function(error){
            //     // handle exceptions
            // })



            // var obj;
            //     fs.readFile(req.files[0].path, 'utf8', function (err, data) {
            //         console.log("sdghsgdsdsd",data)
            //     if (err) throw err;
            //     obj = JSON.parse(data);
            //     console.log(obj[0])
            //     });
            // pdfshift.convert(req.files[0].path, {filename: 'result.pdf'}).then(function (body) {
            //     console.log(body,"fgsdgfgsfsfsf")
            //         let json = JSON.parse(body);
            //         // The URL is on 
            //         console.log(json);
            //     }).catch(function({message, code, response, errors = null}) {})

           
            // const options = { text: true }
            // pdf2html.pages(req.files[0].path, options, (err, html) => {
            //     if (err) {
            //         console.error('Conversion error: ' + err)
            //     } else {
            //         console.log("hey data",html)   //Conversion error: Error: Command failed: java -jar /home/admin1/Documents/mean/nodeAngular/nodeEjs/nodeEjs/node_modules/pdf2html/vendor/tika-app-1.22.jar --html public/uploads/myImage_1572849919059.pdf /bin/sh: 1: java: not found
                   
            //     }
            // })



    })
}


var pdftohtml = require('pdftohtmljs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const pdf2html = require('pdf2html')
module.exports.googleApiPart=(req,res)=>{
    upload(req, res, (err) => {
        function loadJSON(filePath, success, error)
        {
            console.log(filePath,"fhdsjfjsdfhj")
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        if(success)
                            console.log("hhhhhhhhhh",JSON.parse(xhr.responseText))
                            success(JSON.parse(xhr.responseText));
                    } else {
                    if (error)
                        error(xhr);
                    }
                }
            };
            xhr.open("GET", filePath, true);
            xhr.send();
        }
        console.log(loadJSON(req.files[0].path));




    // console.log("req.files[0].path",req.files[0].path)
    //         pdf2html.html(req.files[0].path, (err,data) => {
    //             console.log("bdjshgdfhsjj",err)
    //             if (err) {
    //                 console.error('Conversion error: ' + err)
    //             } else {
    //                 console.log("sdsdhgshj",data)
    //             }
    //         })

        
// var converter = new pdftohtml(req.files[0].path, "sample.html");
 
// // See presets (ipad, default)
// // Feel free to create custom presets
// // see https://github.com/fagbokforlaget/pdftohtmljs/blob/master/lib/presets/ipad.js
// // convert() returns promise
// converter.convert('ipad').then(function() {
//   console.log("Success");
// }).catch(function(err) {
//   console.error("Conversion error: " + err);
// });
 
// // If you would like to tap into progress then create
// // progress handler
// converter.progress(function(ret) {
//   console.log ((ret.current*100.0)/ret.total + " %");
// });
    })
}







// const readline = require('readline');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// module.exports.googleApiPart=(req,res)=>{
//     console.log("heeefgggggggg")
//     upload(req, res, (err) => {
//        console.log(req.files[0].path),"dsfgsfgfs";
//     fs.readFile(req.files[0].path, (err, content) => {
//         if (err) return console.log('Error loading client secret file:', err);
//         // Authorize a client with credentials, then call the Google Drive API.
//         authorize(JSON.parse(content), listFiles);
//       });
//     })     
// }

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// // 602849082843-rg8s83j7h7cvv4oel950q7v7jmcp1is3.apps.googleusercontent.com
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listFiles(auth) {
//   const drive = google.drive({version: 'v3', auth});
//   drive.files.list({
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;
//     if (files.length) {
//       console.log('Files:');
//       files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//       });
//     } else {
//       console.log('No files found.');
//     }
//   });
// }




// const yargs = require('yargs').argv;
// const _ = require('underscore');
// const split = require('split');
// let keys;


// if(yargs.i && yargs.o) {
// 	readFile(yargs.i, (yargs.h == true), yargs.p? new RegExp(yargs.p, 'g') : new RegExp("[^\\n\\r\\t ]+",'g'));
// }
// else {
// 	console.log("Expected --i=\<inputFile.txt\> --o=\<inputFile.txt\> --h\<optional use header flag\> --p\<optional regex pattern to match field separator>");
// }
// /[^\t]+/g
// var toJSON = require('plain-text-data-to-json')
var pdfUtil = require('pdf-to-text');
module.exports.textToJson=(req,res)=>{
    upload(req, res, (err) => {
        // console.log("hjgjgjhg",req.files)
        // readFile(req.files[0].path)
// pdfUtil.info(req.files[0].path, function(err, info) {
//     if (err) throw(err);
//     console.log("jhhjh",info);
    var option = {from: 0, to: 10};
    console.log("jhhjh",req.files[0].path);
    console.log("text data found",__dirname);
    pdfUtil.pdfToText(req.files[0].path, option, function(err, data) {
        if (err) throw(err);
       //print text   
        fs.writeFileSync('public/uploads/data.txt', data)
        //  fs.readFileSync('public/uploads/data.txt', 'utf8')
    });
// });

// convert(req.files[0].path)
// .then(res => {
//     console.log("hgfgfg",res);
// })
// .catch(err => console.error(err));
    })
}

// const fs = require('fs');

// function convert(input_file_path) {
//     const file = fs.readFileSync(input_file_path, 'utf8');
//     const newFormat = file
//       .replace(/(\r\n\t|\n|\r\t)/gm,'')
//       .replace(/}{/g, '},{');

//     console.log([JSON.parse(newFormat)]);
// }



// const fs = require('fs');
// const readline = require('readline');

// function convert(file) {
//     console.log("hey dsdd",file)

//     return new Promise((resolve, reject) => {

//         const stream = fs.createReadStream(file);
//         // Handle stream error (IE: file not found)
//         stream.on('error', reject);

//         const reader = readline.createInterface({
//             input: stream
//         });

//         const array = [];

//         reader.on('line', line => {
//             array.push(JSON.parse(line));
//         });

//         reader.on('close', () => resolve(array));
//     });
// }



// function readFile(inPath, useHeader, regex) {
// console.log(inPath)
// 	var index = 0;
// 	var outData = [];

// 	var readStream = fs.createReadStream(inPath)
// 		.pipe(split())
// 		.on('data', function (line) {

// 			line = line.toString().match(regex);

// 			if(line){

// 				if(useHeader && index == 0){
// 					setHeaderRowAsKeys(line);
// 				}
// 				else if(useHeader) {
// 					// create an object with header row keys
// 					line = addKeys(line);
// 					outData.push(line);
// 				}
// 				else {
// 					// array, no keys
// 					outData.push(line);
// 				}

// 				index++;
// 			}
// 		});

// 	readStream.on('end', function () {
// 		writeFile(outData, yargs.o);
// 	});
// }

// function writeFile(data, path){
// 	var jsonOut = fs.createWriteStream(path);
// 	jsonOut.write(JSON.stringify(data));
// 	jsonOut.on('error', function(err) { console.log(err); });
// 	jsonOut.end();
// 	console.log("done!");
// }

// function setHeaderRowAsKeys(line){
// 	keys = line;
// }

// function addKeys(line){
// 	return _.object(keys, line);
// }

var PDFParser=require('pdf2json');
var pdftohtml = require('pdftohtmljs');
var browser=require('browser');
var assert = require('assert');
module.exports.pdfToHtml=(req,res)=>{
    upload(req, res, (err) => {
        // console.log(req.files)
        // var converter = new pdftohtml(req.files[0].path, "sample.html");
        // converter.convert('ipad').then(function(jsut) {
        // console.log("Success",jsut);
        // }).catch(function(err) {
        // console.error("Conversion error: " + err);
        // });
        // // If you would like to tap into progress then create
        // // progress handler
        // converter.progress(function(ret) {
        // console.log ((ret.current*100.0)/ret.total + " %");
        // });
        if (fs.existsSync(req.files[0].path)) {
        //Read the content of the pdf from the downloaded path
        var pdfParser = new PDFParser(browser, 1);
        pdfParser.on("pdfParser_dataError", function (errData) {
            console.error(errData.parserError)
        });
        pdfParser.on("pdfParser_dataReady", function (pdfData) {
            console.log("data sto edeffj",pdfData)
        //console.log('here is the content: '+pdfParser.getRawTextContent());
        browser.assert.ok(pdfParser.getRawTextContent().indexOf(textToVerify) > -1);
        });
        pdfParser.loadPDF(req.files[0].path);
        } else {
            console.log('OOPs file not present in the downloaded folder');
            //Throw an error if the file is not found in the path mentioned
            browser.assert.ok(fs.existsSync(req.files[0].path));
        }
    })
}


// var docTableContent=(text)=>{
//     console.log(text,"dsfgsdfgsfgsjhfgsdgfhsdgfhsdgfhjdsfgjsgf")
//     let array = [...text.matchAll("TABLE OF CONTENTS")];
//     //console.log('=============',array);
//     var pos;
//     var mainArray=[];
//     var ham=[];
//     var arr=[];
//      array.forEach((d,i)=>{
//         var tcn=array[i][0]
//          pos=array[i].index
//         // console.log(tcn,pos);
//      })
//      var startPostion=text.indexOf("1.0", pos);
//      var EndPostion=text.indexOf("32", startPostion);
//       //console.log(startPostion,EndPostion,"hdfhdgf")            
//         //  console.log("iiii",(i + ".0").toString() )
//         // var n = text.search((i + ".0").toString());
//         //     jam.push(n)
//       var getString=text.slice(startPostion,EndPostion);
//       var newarr=getString.split('\n\n');
//       let toc=[];
//       let toc1=[];
//       let toc3=[];
//         let value='';
//     //   console.log(newarr.length,newarr[0].length)
//      for(let i=0;i<=newarr.length;i++){
//         let key='';
      
//         let substr=newarr[i];
//         let key2='';
//         if(substr){
//             for(let k=0;k<substr.length;k++){
//                 var patt1 = /[0-9]/g;
//                 var patt2=/[1-9]/g;
//                 var result = newarr[i][k].match(patt1);
//                 //console.log('====', newarr[i][k],'  ',result);
//                 if(result||newarr[i][k]==='.'){
//                     key+=newarr[i][k]
//                 }
//                 key2=key;
//                 if(key2.includes(`.${patt2}`)){
//                     console.log(key2,"asdnsajhda")
//                 }
//                 // console.log(key2,"sdfjdfndf")
//                 if(newarr[i][k].match(/^[A-Za-z]+$/)){
//                     value=newarr[i].substr(key.length)
//                     break;
//                 }
//             }
//             toc[key]=value
//             if(key.includes('.0')){   
//                 toc1[key]=value={name:value,};
//             }

//             //  console.log('key',key,'  ',value);
//         }
//      }
//     //  console.log('fullArray',toc);
//      Object.keys(toc).forEach((h,l)=>{
//         //   console.log("gggggggg",h,toc[h])
//      })
//     // console.log('newarr',toc1);
//     // console.log(Object.keys(toc1).length);
//     // console.log('arrrrrrrrrrrrrrr',arr);
//     Object.keys(toc1).forEach((a,b)=>{
//         //  console.log("hhh",toc1[a]['name'])
//         Object.keys(toc).forEach((h,l)=>{
//             //  console.log("jjj",h.slice(0,2))
//             // h.includes(h[0]);
//             if(h.slice(0,2)==a.slice(0,2)){
//             arr.push({[arr[h]]:toc[h]})
//             }
//             // arr.push({name:toc1[a]['name'],sub:toc[h]})
//             // console.log("gmg",h.slice(0,2),a.slice(0,2))  
           
//           console.log('newarr=====',arr);
//         })
//         toc3[a]=({name:toc1[a]['name'],sub:arr})
//         arr=[];
//         // toc3[a]=arr;
//         // console.log('newarr',Number(a));

//     })
// //   console.log('solve data',toc3);
//   mainArray=toc3;
//   console.log('solve data',mainArray); 
// //     unquieTm= Object.keys(mainArray).map(d=>mainArray[d].sub)
// // console.log("hhhh",unquieTm)



//     //  jam.forEach((d,i)=>{
//     //      if(d>0){
//     //         ham.push(d);
//     //      }
//     //  })
//     //  console.log(jam,jam.length,ham)
//     // //  var k=ham.length-1;
//     // //  console.log("sdfjsfhg",ham[k]);
//     // //  var getString=text.slice(ham[0],ham[k]);
//     //   console.log("sdfjsfhg",getString);

// }
  
//recursive functiion
// var factorial = function(number) {
//     if (number <= 0) { 
//       return 1;
//     } else { 
//       return (number * factorial(number - 1));
//     }
//   };
//   console.log(factorial(6));