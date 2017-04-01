/* @flow */

import mongoose from 'mongoose'

export default mongoose.Schema({
    artName: String,
    toSell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
})
