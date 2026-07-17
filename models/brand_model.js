const mongoose = require("mongoose");
const slugify = require('slugify')

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: [true, "Brand exists"],
      minlength: 2,
      maxlength: 32,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    image: String,
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

brandSchema.pre('save',function(next){
  if(this.isModified('name')){
    this.slug = slugify(this.name)
  }
})

brandSchema.pre('findOneAndUpdate',function(next){
  const update = this.getUpdate()

  if(update.name){
    update.slug = slugify(update.name)
  }
  else if(update.$set && update.$set.name){
    update.$set.slug = slugify(update.$set.name)
  }
})


module.exports = mongoose.model("Brand", brandSchema);
