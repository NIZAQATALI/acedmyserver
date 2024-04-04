// const express = require("express");
// const userController = require("../Controllers/userController");
// const sController = require("../Controllers/stripeController");
// const dakuController = require("../Controllers/docusignController");
// const owndacuController = require("../Controllers/owndacuController");
//  const verifController = require("../Controllers/verifController");
//  const fileController = require("../Controllers/fileController");

// const router = express.Router();
// const auth = require("../MiddleWares/auth");
// router.post("/create", userController.register);
// router.post("/checkMail", userController.checkEmail);
// router.post("/login", userController.login);
// router.get("/getAllUser", userController.getAllUser);
// router.post("/send-invitation", userController.sendotp);
// router.post("/verify", userController.submitotp);
// router.get("/getUser",auth.verifyToken, userController.getUser);
// router.put("/:stepNumber/updateuser", auth.verifyToken,  userController.updateUser);
// router.put("/upload-form-data", userController.upload, auth.verifyToken,userController.uploadForm);
// router.put("/multiple-form-data", userController.upload, auth.verifyToken,userController.uploadFormMOre);
// router.put("/upload-for-dashboard/:id", userController.upload, userController.uploadfordashboard);
// router.delete("/remove-file",auth.verifyToken ,userController.removeFile);
// router.put("/updateApplication",auth.verifyToken ,userController.updateApplication);
// router.post("/verify-file",userController.verification);
// router.put("/updateDocumentStatus",auth.verifyToken ,userController.updateDocumentStaus);
// router.get("/get-all-uploaded-files",auth.verifyToken ,userController.getAllFiles);
// // Define a route for deleting a file
// router.delete('/deleteFile',auth.verifyToken, userController.deleteFileHandler);
// router.post('/setcformData',auth.verifyToken, userController.setCFormData);
// router.post('/dataPosttoHubspot', userController.dataPosttoHubspot);
// //router.post('/filePosttoHubspot',auth.verifyToken, userController.upload, userController.uploadFileToHubSpot);
// router.post("/sessions", auth.verifyToken,sController.sessionStripe);
// router.post("/webhookstrip",  sController.webhook);
// router.post("/webhookhubspot", sController.webhookhubspot);
// router.post("/form", dakuController.form);
// router.post("/pdf", userController.generatePDF);
// router.post("/createShareFileFolder", userController.createFolder);
// router.post("/getbyid", userController.getById);
// router.get("/deleteUserByid", userController.deleteUserById);
// router.post("/sendEmail", userController.sendEmail);
// router.post("/senduserEmail", userController.senduserEmail);
// router.post("/senduserEmailReview", userController.senduserEmailReview);
// router.post("/sendemailonfirststep", userController.sendEmailonFirstStep);
// router.post("/sendemailOnNinteenstep",userController.sendEmailonNinteenStep);
// router.post("/sendemailOnNinteenstep2",userController.sendEmailonNinteenStep2);
// router.post("/digisign",auth.verifyToken,owndacuController.Digisignature);
// router.get("/persona",userController.persona);
// router.get("/createSession",auth.verifyToken,verifController.createsession);
// router.post("/deleteSession",verifController.deletesession);
// router.post("/personSession",verifController.sessionPerson);
// router.post("/verifwebhook", verifController.webhook);
// router.post("/verifwebhookb", verifController.webhookb);
// router.post("/upload-pre-signature", userController.uploadOne,userController.uploadpresignaturedocument);

// router.post("/downloadfile", fileController.getfiles);
// router.get("/filelist",fileController.listFiles);
// router.post("/singleupload",fileController.uploadFiles);
// router.post("/multiupload",fileController.uploadMultiFiles);

// router.post("/deletefilecom",fileController.deleteFileCom);


// module.exports = router





//new code ------------


const express = require("express");
// const userController = require("../Controllers/userController");
// const sController = require("../Controllers/stripeController");
// const dakuController = require("../Controllers/docusignController");
// const owndacuController = require("../Controllers/owndacuController");
// const mydacuController = require("../Controllers/mydacuController");
//  const verifController = require("../Controllers/verifController");
//  const fileController = require("../Controllers/fileController");
//  const sawabiController = require("../Controllers/wasabiController");
 const router = express.Router();
// const auth = require("../MiddleWares/auth");
// router.post("/create", userController.register);
// router.post("/checkMail", userController.checkEmail);
// router.post("/login", userController.login);
// router.get("/getAllUser", userController.getAllUser);
// router.post("/send-invitation", userController.sendotp);
// router.post("/verify", userController.submitotp);
// router.get("/getUser",auth.verifyToken, userController.getUser);
// router.put("/:stepNumber/updateuser", auth.verifyToken,  userController.updateUser);
// router.put("/upload-form-data", userController.upload, auth.verifyToken,userController.uploadForm);
// router.put("/multiple-form-data", userController.upload, auth.verifyToken,userController.uploadFormMOre);
// router.put("/upload-for-dashboard/:id", userController.upload, userController.uploadfordashboard);
// router.delete("/remove-file",auth.verifyToken ,userController.removeFile);
// router.put("/updateApplication",auth.verifyToken ,userController.updateApplication);
// router.get("/verify-file/:id",userController.verification);
// router.get("/un-verify-file/:id",userController.notverification);
// router.put("/updateDocumentStatus",auth.verifyToken ,userController.updateDocumentStaus);
// router.get("/get-all-uploaded-files",auth.verifyToken ,userController.getAllFiles);
// // Define a route for deleting a file
// router.delete('/deleteFile',auth.verifyToken, userController.deleteFileHandler);
// router.post('/setcformData',auth.verifyToken, userController.setCFormData);
// router.post('/dataPosttoHubspot', userController.dataPosttoHubspot);
// //router.post('/filePosttoHubspot',auth.verifyToken, userController.upload, userController.uploadFileToHubSpot);
// router.post("/sessions", auth.verifyToken,sController.sessionStripe);
// router.post("/webhookstrip", sController.webhook);
// router.post("/webhookhubspot", sController.webhookhubspot);
// router.post("/form",  auth.verifyToken,dakuController.form);
// router.post("/pdf", userController.generatePDF);
// router.post("/createShareFileFolder", userController.createFolder);
// router.post("/getbyid", userController.getById);
// router.get("/deleteUserByid", userController.deleteUserById);
// router.post("/sendEmail", userController.sendEmail);
// router.post("/sendEmailreg", userController.sendEmailReg);
// router.post("/senduserEmail", userController.senduserEmail);
// router.post("/senduserEmailReview", userController.senduserEmailReview);
// router.post("/senduserEmailprocess", userController.senduserEmailProces);

// router.post("/sendemailonfirststep", userController.sendEmailonFirstStep);
// router.post("/sendemailonpayment", userController.sendEmailonPayment);
// router.post("/sendemailOnNinteenstep",userController.sendEmailonNinteenStep);
// router.post("/sendemailOnNinteenstep2",userController.sendEmailonNinteenStep2);
// router.post("/sendprocessemail", userController.sendEmailProcess);
// router.post("/setczoneadmin", userController.sendEmailProcess2);
// router.post("/sendjohnpaymentemail", userController.sendEmailJohnOnpayment);
// router.post("/sendemailoffice", userController.sendEmailoffice);
// router.post("/digisign",auth.verifyToken,owndacuController.Digisignature);
// router.post("/digisign2",auth.verifyToken,mydacuController.Digisignature);
// router.get("/persona",userController.persona);
// router.get("/createSession",auth.verifyToken,verifController.createsession);
// router.post("/deleteSession",verifController.deletesession);
// router.post("/personSession",verifController.sessionPerson);
// router.post("/verifwebhook", verifController.webhook);
// router.post("/verifwebhookb", verifController.webhookb);
// router.get("/upload-pre-signature/:id", userController.uploadpresignaturedocument);
// router.post("/downloadfile",fileController.getfiles);
// router.get("/filelist",fileController.listFiles);
// router.post("/singleupload",fileController.uploadFiles);
// router.post("/multiupload",fileController.uploadMultiFiles);
// router.post("/getsaparatname",userController.getTrimName);
// router.delete("/deletefilecom",fileController.deleteFileCom); 
// router.post("/downloadfile",sawabiController.getFileFromWasabi);
// router.post("/sendfiletosawabi",sawabiController.uploadFileToWasabi);
// router.post("/sendfiletosawabifromrizwan/:fileName/:email",sawabiController.uploadFileToWasabifromrizwan);
// router.post("/deleteFilesawabi",sawabiController.deleteFileFromWasabi);
// router.post("/multiuploadwasabi",sawabiController.uploadMultipleFilesToWasabi);
// router.post("/generateUrlwasabi",sawabiController.generatePreSignedUrl);
// router.post("/getsaparatname",sawabiController.uploadMultipleFilesToWasabi);
module.exports = router;









