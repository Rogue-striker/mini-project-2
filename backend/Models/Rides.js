import { Schema , model} from "mongoose";

const RideSchema = new Schema({
    userID :{
        type : String,
        required : true
    },
    name :{ 
        type : String,
    },
    price: {
        type: String,
        required: true,
    },
    source : {
        type: String,
        required : true,
    }, 
    destination : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    coTravellers : {
        type : Array,
        requried : true,
    },
    startTime :{
        type : String,
        required : true,
    },
    endTime : {
        type : String,
        required : true,
    },
    seats : {
        type : String,
        required : true,
    },
})

const Ride = new model('ride', RideSchema);
export default Ride;