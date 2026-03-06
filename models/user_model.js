const mongoose = require('mongoose');
const validator = require('validator')
const constants = require('../helpers/constants')


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'required field']
    },
    lastName:{
        type:String,
        required:[true,'required field']
    },
    username:{
        type:String,
        required:[true,'required field'],
        minlength:[3,'too short username']
    },
    email:{
        type:String,
        default:null,
        validate:{
            validator:function(v){
                return v === null || validator.isEmail(v)
            },
            message:'invalid email'
        }
    },

    password:{
        type:String,
        required:[true,'required field']
    },
    role:{
        type:String,
        enum:{
            values:constants.ROLES,
            message:'{VALUE} is not supported'
        },
        default:constants.CUSTOMER
    },
    phone:{
        type:String,
        validate:{
            validator:function(v){
                return v===null || validator.isMobilePhone(v,'ar-EG')
            },
            message:'invalid phone number'
        },
        default:null
    },
    address:{
        type:{
        country:String,
        city:String,
        area:String,
        street:String,
        details:String
    },
        default:null
    }


},{
    toJSON:{
        transform:function(doc,ret){
            delete ret.__v
            delete ret.password
            return ret
        }
    }
})

module.exports = mongoose.model('User',userSchema)