import mongoose from "mongoose";


// user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,"Please provide a valid email address"]
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    },
    bio:{
        type:String,
    },
    skillsoffered:[{
        type:String,
        default:""
    }],
    skillswanted:[{
        type:String
    }]
},{
    timestamps:true
});

export default mongoose.model("User",userSchema);
