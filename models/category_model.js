const mongoose = require("mongoose");
<<<<<<< HEAD
const slugify = require("slugify");

const { Schema } = mongoose;

const catSchema = new Schema({
  name: {
    type: String,
    required: [true, "category name is required"],
    unique: [true, "category exists"],
    minlength: [3, "too short category name"],
    maxlength: [32, "too long category name"],
  },
  slug: {
    type:String,
    lowercase:true,
    trim:true
  },
  image:String
},{
    timestamps:true,
    toJSON:{
        transform:(doc,ret)=>{
            delete ret.__v
            return ret
        }
    }
});

//trigger with .save() & .create()
catSchema.pre('save',function(next){
    if(this.isModified('name')){
       this.slug = slugify(this.name) 
    }


})

//trigger on update
catSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate()
    // handle standard update {name: 'new'}
    if(update.name){
        update.slug = slugify(update.name)
    }
    //handle $set update
    else if(update.$set && update.$set.name){
        update.$set.slug = slugify(update.$set.name)

    }
})

module.exports = mongoose.model("Category", catSchema);
=======

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "required field"],
      minlength: [2, "too short name"],
    },
    image: {
      type: String,
      default: null,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Category", categorySchema);
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
