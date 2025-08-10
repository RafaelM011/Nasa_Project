import mongoose from 'mongoose';

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
});

export const planetsDB = mongoose.model('Planet', planetsSchema)
