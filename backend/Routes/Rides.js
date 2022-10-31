import express from "express";
import Rides from "../Models/Rides.js";
import AccessTokenVerifier from "./../MiddleWares/AccessTokenVerifier.js";
import RideRequest from "../Models/RideRequest.js";

const Router = express.Router();

Router.post("/addrequest", AccessTokenVerifier, (req, res) => {
  const {
    rideID,
    userID,
    ownerID,
    seats,
    name,
    source,
    destination,
    date,
    startTime,
    endTime,
    price,
  } = req.body;
  const rideRequest = new RideRequest({
    rideID,
    RequestID: userID,
    ownerID,
    seats,
    name,
    source,
    destination,
    date,
    startTime,
    endTime,
    price,
    status: false,
  });
  rideRequest
    .save()
    .then((data) => {
      res.status(200).json({ message: "Request Added Successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

Router.post("/deleterequest", AccessTokenVerifier, async (req, res) => {
  const { id, userID } = req.body;
  try {
    const data = await RideRequest.deleteOne({ _id: id });
    res.status(200).json({ message: "Request Deleted Successfully" });
  } catch (error) {
    res.send("error");
  }
});

Router.post("/getrequests", AccessTokenVerifier, async (req, res) => {
  try {
    const { userID } = req.body;
    const data = await RideRequest.find({ RequestID: userID });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

Router.post("/acceptrequest", AccessTokenVerifier, async (req, res) => {
   const {userID , rideID}  = req.body;
    try {
        const data = await RideRequest.updateOne({_id:rideID, ownerID:userID},{$set:{status:true}});
        res.status(200).json({message:"Request Accepted Successfully"});
    }
    catch(error){
      console.log(error)
    }
});

Router.post("/deleteride", AccessTokenVerifier, async (req, res) => {
  try {
    const { rideID, userID } = req.body;
    const data = await Rides.deleteOne({
      _id: rideID,
      userID: userID,
    });
    const data1 = await RideRequest.deleteMany({ rideID: rideID });
    
    if (data.deletedCount === 0) {
      res.status(404).json({
        message: "Ride not found",
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});
// get all rides
Router.post("/getrides", AccessTokenVerifier, async (req, res) => {
  try {
    const data = await Rides.find({ userID: req.body.userID });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

// get single ride
Router.post("/getride", async (req, res) => {
  const { rideID } = req.body;
  try {
    const ride = await Rides.findById({ _id: rideID });
    res.status(200).json({
      ride,
    });
  } catch (e) {
    res.status(400).json({
      error: "error occured",
    });
  }
});

// * get a ride - /rides between source and destination
Router.post("/search", async (req, res) => {
  const { source, destination, date, seats } = req.body;
  try {
    const findRide = await Rides.find({
      source,
      destination,
      date,
      seats: {
        $gte: seats,
      },
    });
    res.status(200).json({
      rides: findRide,
    });
  } catch (e) {
    res.status(400).json({
      error: "error occured",
    });
  }
});

// add rides into db
Router.post("/addride", AccessTokenVerifier, async (req, res) => {
  const {
    price,
    source,
    destination,
    date,
    startTime,
    endTime,
    seats,
    userID,
    car,
    color,
    name,
  } = req.body;
  const newRide = new Rides({
    userID,
    price,
    source,
    destination,
    date,
    car,
    color,
    startTime,
    endTime,
    seats,
    name,
  });
  try {
    await newRide.save();
    res.status(200).json({
      message: "ride added",
    });
  } catch (e) {
    res.status(400).json({
      error: "error occured",
    });
  }
});

Router.post("/getriderequests", AccessTokenVerifier, (req, res) => {
  const { userID } = req.body;
  RideRequest.find({ ownerID: userID })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

Router.get("/", async (req, res) => {
  try {
    const data = await Rides.find({});
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

export default Router;
