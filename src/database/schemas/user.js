/* @flow */

import mongoose from 'mongoose'

export default mongoose.Schema({
    name: String,
    email: String,
    passwd: String,
    lang: String
})
