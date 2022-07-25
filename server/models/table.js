const { Schema, model } = require('mongoose')

const schema = new Schema({
    date: { type: String },
    name: { type: String },
    amount: { type: Number },
    distance: { type: Number }
}, {
    timestamps: true
})

module.exports = model('Table', schema) 