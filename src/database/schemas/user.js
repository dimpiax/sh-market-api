/* @flow */

import mongoose from 'mongoose'

export default mongoose.Schema({
    name: String,
    email: { type: String, index: true },
    passwd: String,
    lang: { type: String, lowercase: true }
})
