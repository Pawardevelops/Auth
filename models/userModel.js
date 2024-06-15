const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:[true,"Please provide username"],
    },
    email:{
        type:String,
        required:[true,"please provide Email"]
    },
    password:{
        type:String,
        required:[true,"please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

module.exports = User;