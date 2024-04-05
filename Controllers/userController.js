
const cron = require('node-cron')
const bcrypt = require("bcryptjs");
const userService = require("../Services/userServices");
//const {formatCurrency,convertToNumeric} = require("../Services/helperMethods.js");
const FormData = require('form-data');
const nodemailer = require('nodemailer');
const userModel = require("../modals/userModel");
const auth = require("../MiddleWares/auth");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { Readable } = require('stream');
var db = require('../modals/index.js');
const PDFDocument = require('pdfkit');
const fs = require('fs');
// var db = require('../Images');
// image Upload
const multer = require('multer')
const path = require('path');
const { response } = require("express");
const { json } = require("body-parser");
const e = require("express");
var  User =  db.userModel;
const register = async  (req, res) => {
 console.log("in the user registeration controller")
  const {email, password} = req.body;
  if (!(email && password))

    return res
      .status("400")
      .send({ errMessage: "Please fill all required areas!" });
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;
  await userService.register(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(201).send(result);
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res
      .status(400)
      .send({ errMessage: "Please fill all required areas!" });
  await userService.login(email, (err, result) => {
    if (err) return res.status(400).send(err);

    const hashedPassword = result.password;
    if (!bcrypt.compareSync(password, hashedPassword))
      return res
        .status(400)
        .send({ errMessage: "Your email/password is wrong!" });
        console.log("result........",result)
     result.token = auth.generateToken(result.id.toString(), result.email);
     result.password = undefined;  
     result.__v = undefined;
    return res
      .status(200)
      .send({ message: "User login successful!", user: result });
  });
};
const getUser = async (req, res) => {
    try{
   const userId =   req.user.id;
  console.log(req.user.id);
  console.log("userId......",userId);
  await userService.getUser(userId, (err, result) => {
    if (err) return res.status(404).send(err);
    result.password = undefined;
    return res.status(200).send(result);
  });
    }
    catch(err){
        console.log("Error Occurred in get user" , err.message)
    }
 
};
const getTrimName = async (req, res) => {
  try {
    const full_name = req.body.full_name.replace(/\s+/g, ' ').trim();
    // Split the full name into individual words
    const name_parts = full_name.split(" ");
    // Extract first name, middle name, and last name
    const first_name = name_parts[0].trim();
    const middle_name = name_parts.length > 2 ? name_parts[1].trim() : "";
    const last_name = name_parts.length > 1 ? name_parts[name_parts.length - 1].trim() : "";
    //const last_name = name_parts[name_parts.length - 1];
    // Print the results (console.log instead of print)
    console.log("First Name:", first_name);
    console.log("Middle Name:", middle_name);
    console.log("Last Name:", last_name);
    // Return the result in the response
    const result = {
      first_name,
      middle_name,
      last_name,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getById = async (req, res) => {
  const userId =   req.body.userId;
  console.log("userId......",userId);
  await userService.getById(userId, (err, result) => {
    if (err) return res.status(404).send(err);
    result.password = undefined;
    return res.status(200).send(result);
  });
};

const getUserWithMail = async(req,res) => {
  const {email} = req.body;
  await userService.getUserWithMail(email,(err,result)=>{
    if(err) return res.status(404).send(err);
    const dataTransferObject = {
      user: result.id,
      name: result.name,
      surname: result.surname,
      color: result.color,
      email : result.email
    };
    return res.status(200).send(dataTransferObject);
  })
}


const updateUser = async (req, res) => {
  try {
      const id = req.user.id;
      let step = req.params.stepNumber;
      const nextstep = req.params.stepNumber;
      const prevstep = req.user.step;
      step = (nextstep >= prevstep) ? nextstep : prevstep;
      // // Check if user.applicationStatus is true
      // if (req.user.applicationStatus) {
      //     return res.status(400).json({ error: 'You have already submitted documents. Data cannot be updated.' });
      // }
      const updatedUser = await userService.updateUser(id, { ...req.body, step: step });
      // Now it should be defined
      res.status(200).json(updatedUser);
  } catch (err) {
      res.status(500).json(err);
  }
};


const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // If the user already exists, send a custom error response
      return res.status(400).json({ error: 'User with this email already exists.' });
    } else {
      // If the user doesn't exist, send a success message
      return res.status(200).json({ message: 'Email is available.' });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// const sendotp = async (req, res) => {
//   console.log(req.body);
  
//   const user = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });

//   if (!user) {
//     return res.status(500).json({ code: 500, message: 'User not found' });
//   }
//   console.log(user.pre_signature_third_document,"user........");
//   console.log(user.pre_signature_second_document,"user........");
//   console.log(user.pre_signature_document,"user........");
//   console.log(user.last_name,"user........");
//   // Check if the user meets the requirements
//   if ((
//     (user.pre_signature_document !== null && user.pre_signature_document !== '') ||
//     (user.pre_signature_second_document !== null && user.pre_signature_second_document !== '') ||
//     (user.pre_signature_third_document !== null && user.pre_signature_third_document !== '') )
//     &&
//   (user.final_review_calculation_amount !== null && user.final_review_calculation_amount !== '')
// ){
//     let foundotp;
//     let _otp;

//     // Keep generating a new OTP until it does not match the previous OTP
//     do {
//       _otp = `S-${Math.floor(100000 + Math.random() * 900000)}`;
//       // Find a user with the generated OTP
//       foundotp = await User.findOne({
//         where: {
//           otp: _otp,
//         },
//       });
//     } while (foundotp);

//     // At this point, `_otp` is a new OTP that does not match any existing OTP in the database
//     // Perform actions with the new OTP, such as updating the user's OTP in the database
//     console.log('New OTP:', _otp);

//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.OUR_EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: 'no-reply@setczone.com',
//       to: `${req.body.email}`, // list of receivers
//       subject: 'OTP', // Subject line
//       text: String(_otp),
//     });

//     if (info.messageId) {
//       console.log(info, 84);
//       await user.update({
//         otp: _otp,
//         otpUsed: false,
//       });
//       await user.save();
//     } else {
//       res.status(500).json({ code: 500, message: 'Server error' });
//     }

//     // Schedule a cron job to set isProcess to true after 2 minutes
//     const cronExpression = '*/3 * * * *'; // Runs every 2 minutes
//     let fn_run = 1;
//     cron.schedule(cronExpression, async () => {
//       if (user && fn_run == 1) {
//         fn_run = 0;
//         user.otp = null;
//         await user.save();
//         console.log('otp set to true after 2 minutes');
//       }
//     });
    
//     res.status(200).json({ code: 200, message: 'OTP sent' });
//   } else {
//     // Return custom error message if user does not meet requirements
//     res.status(400).json({ code: 400, message: 'User does not meet requirements to generate OTP' });
//   }
// };
const sendotp = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  // If user is not found, return a 404 error
   if (!user) {
    return res.status(404).json({ code: 404, message: 'User not found' });
  }

  
{
    let foundotp;
    let _otp;

    // Keep generating a new OTP until it does not match the previous OTP
    do {
      _otp = `S-${Math.floor(100000 + Math.random() * 900000)}`;
      // Find a user with the generated OTP
      foundotp = await User.findOne({
        where: {
          otp: _otp,
        },
      });
    } while (foundotp);

    // At this point, `_otp` is a new OTP that does not match any existing OTP in the database
    // Perform actions with the new OTP, such as updating the user's OTP in the database
    console.log('New OTP:', _otp);

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.OUR_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false
    // },
    tls: {
      servername: 'smtp.gmail.com',
    },
    });

    let info = await transporter.sendMail({
      from: 'no-reply@setczone.com',
      to: `${req.body.email}`, // list of receivers
      subject: 'Verification Code', // Subject line
      text: String(_otp),
    });

    if (info.messageId) {
      console.log(info, 84);
      await user.update({
        otp: _otp,
        otpUsed: false,
      });
      await user.save();
    } else {
      res.status(500).json({ code: 500, message: 'Server error' });
    }
    // Schedule a cron job to set isProcess to true after 2 minutes
    const cronExpression = '*/3 * * * *'; // Runs every 2 minutes
    let fn_run = 1;
    cron.schedule(cronExpression, async () => {
      if (user && fn_run == 1) {
        fn_run = 0;
        user.otp = null;
        await user.save();
        console.log('otp set to true after 2 minutes');
      }
    });
    res.status(200).json({ code: 200, message: 'OTP sent' });
  }
};

const submitotp = async (req, res) => {
    try {
        if (!req.body.email || !req.body.otp) {
            return res.status(400).json({
                message: "Missing Fields",
                status: false
            });
        }

        // Find user by email and OTP
        const user = await User.findOne({
            where: {
                email: req.body.email,
                otp: req.body.otp,
            }
        });

        if (!user) {
            return res.status(402).json({ code: 404, message: 'OTP not found' }); 
        }

        // Call the login function to log in the user
        await userService.login(user.email, async (loginErr, loginResult) => {
            if (loginErr) {
                return res.status(400).json({ code: 400, message: 'Login failed after OTP verification', error: loginErr });
            }
            // Attach the generated token to the login result
            loginResult.token = auth.generateToken(
                loginResult.id.toString(),
                loginResult.email
            );
            // Send the response with the logged-in user details
            return res.status(200).json({
                code: 200,
                message: 'User logged in successfully',
                user: loginResult,
            });
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ code: 500, message: 'Server error' });
    }
};








const getAllUser = async (req, res) => {
  try{
       const users = await User.findAll({
           raw: true,
    attributes: { exclude: ['password'] }, // Exclude password field
  });
  
  console.log(users[0])
  if(users){
      console.log("In users ")
    res.status(200).json(users);

  }
  else{
      res.status(404).json("Error Occurred");
  }
  }
  catch(err){
      res.status(404).json(err);
  }
  
 

};



  


module.exports = {
 
  register,
  login,
  getUser,
  getAllUser,
  getUserWithMail,
  updateUser,
  sendotp,
  submitotp,
  checkEmail,
  getById,
getTrimName,
};