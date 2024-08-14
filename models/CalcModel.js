import express from 'express'
import mongoose from 'mongoose'
import autoIncrement from 'mongoose-sequence'

const CalcSchema = mongoose.Schema({
    // name: String,
    parameter: String,
    open: Number,
    close: Number,
    value: Number,
    userId: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})
CalcSchema.plugin(autoIncrement(mongoose), { inc_field: 'calcId' });
const CalcModel = mongoose.model('CalcModel', CalcSchema)
export default CalcModel