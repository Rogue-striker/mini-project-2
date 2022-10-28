import AccessTokenGenerator from "../Helpers/AccessTokenGenerator.js";
import express from 'express';
import bcrypt from 'bcryptjs'
import User from './../Models/User.js'
const Router = express.Router();

// * register router - /auth/register
Router.post("/register", (req, res) => {
  const { name, email, password, phonenumber } = req.body;
  if (!name || !email || !password || !phonenumber) {
    res.status(409).json({
      error: "empty data fields",
    });
  } else {
    User.findOne({ email }, async (error, result) => {
      if (error) {
        res.status(400).json({
          error: "error in accessing database",
        });
      } else if (result) {
        res.status(409).json({
          error: "user already exists please try again",
        });
      } else {
        const saltrounds = 10
        const salt = await bcrypt.genSalt(saltrounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          name,
          phonenumber,
          email,
          password: hashedPassword,
        });
        console.log(newUser)
        newUser
          .save()
          .then(() => {
            res.status(201).json({
              success: "registration successful",
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(400).json({
              error: "error in processing",
            });
          });
        }
      }
    );
  }
});

// * login router - /auth/login
Router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(400).json({
        error: "db error occured",
      });
    } else if (!user) {
      res.status(400).json({
        error: "user not found",
      });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        const AccessToken = AccessTokenGenerator(user._id);
        if (isMatch) {
          res.status(200).json({
            'user' : user,          
            'success': "login successful",
            'accessToken': AccessToken,
          });
        } else {
          res.status(400).json({
            error: "password incorrect",
          });
        }
      }).catch((e) => {
        res.status(400).json({
          error : "error occured"
        })
      })

    }
  });
});

Router.post("/user", (req,res)=>{
  const {id} = req.body;
  console.log("id", id)
  User.findOne({_id : id}, (err, user)=>{
    if(err){
      res.status(400).json({
        error : "error occured"
      })
    }else if(!user){
      res.status(400).json({
        error : "user not found"
      })
    }else{
      res.status(200).json({user})
    }
  })
})

// * logout router - /auth/logout
Router.get("/logout", (req, res) => {
  res.status(200).json({
    message: "logged out",
  });
});

// * Get All Users 
Router.get("/", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// ** delete all users 
Router.delete("/delete", (req, res) => {
  User.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(result);
    }
  });
}
);

export default Router;