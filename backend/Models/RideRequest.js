import Mongoose from "mongoose";

const RideRequestSchema = new Mongoose.Schema({
    ownerID :{
        type : String,
        required : true
    },
    RequestID: {
        type: String,
        required: true,
    },
    rideID :{
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    source : {  
        type: String,
        required : true,
    },
    destination :{
        type : String,
        required : true, 
    },
    date : {    
        type : String,
        required : true,
    },
    seats : {
        type : String,
        required : true,
    },
    startTime : {
        type : String,
        required : true,
    },
    endTime : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        required : true,
    },
    price : {
        type : String,
        required : true,
    }
});
    
export default Mongoose.model('rideRequest', RideRequestSchema);
