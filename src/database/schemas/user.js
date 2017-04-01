/* @flow */

import mongoose from 'mongoose'

export default mongoose.Schema({
    name: String,
    email: Boolean,
    passwd: Number,
    lang: String
})
