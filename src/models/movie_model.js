import mongoose  from "mongoose";

const movieSchema = mongoose.Schema({
    
    name: {type: String},
    rating: { type: Number},
    cost:  {type : Array},
    genre: {type: String},
    releasedate : {type: Date}

}, {timestamps: true});

movieSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});



const movie = mongoose.model('movies', movieSchema,'movies');

export default movie;