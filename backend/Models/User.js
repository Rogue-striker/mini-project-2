import mongoose from 'mongoose';

// * user schema definition 
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    phonenumber:{
        type:String,
 
    },
    email: {
        type: String,
 
    },
    password: {
        type: String,
    }, 
}); 

const User = new mongoose.model('user', UserSchema);

export default User;