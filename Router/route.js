const express =require('express');
const router1=express.Router();

const control2=require('../Controller/control2');


//ejs route-----
router1.get('/',control2.home);


//admin api

//control2 api
router1.post('/api/Filedocsread',control2.Filedocsread);

// router1.all('/api/GetDataby',control2.getdataby);
// router1.all('/api/passchange',control2.passChange);
// router1.post('/api/excelsheet',control2.excelSheet);
// router1.post('/api/csvfile',control2.csvFile);
// router1.post('/api/fakemail',control2.FakeMail);
// router1.post('/api/bookdetails',control2.bookDetails);
// router1.get('/api/getbookDetails',control2.GetbookDetails);
// router1.post('/api/personDetails',control2.PersonDetails);
// router1.get('/api/getpersonDetails',control2.GetPersonDetails);
// router1.get('/api/lookupData',control2.LookupData);
// router1.post('/api/htmlPdf',control2.HtmlPdf);
// router1.post('/api/filepdfReade',control2.FilePdfReade);

// router1.post('/api/readdocx4j',control2.readdocx4j);
// router1.post('/api/TestData',control2.testData);
// router1.post('/api/simplePdfUpload',control2.simplePdfUpload);
// router1.post('/api/pdfTojsonUpload',control2.pdfTojsonFile);
//  router1.post('/api/googleApiPartUpload',control2.googleApiPart);
//  router1.post('/api/textToJSON',control2.textToJson);
//  router1.post('/api/pdfToHTML',control2.pdfToHtml);
// router1.post('/api/formdib',control.Formdib);


module.exports=router1;
                                                                   