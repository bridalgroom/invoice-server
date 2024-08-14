import express from 'express'
import mongoose from 'mongoose'
import autoIncrement from 'mongoose-sequence'

const MasterSchema = mongoose.Schema({
    parameter_name: String,
    value: Number,
    unit: String,
    
    userId: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

MasterSchema.plugin(autoIncrement(mongoose), { inc_field: 'masterId' });

const MasterModel = mongoose.model('MasterModel', MasterSchema)
export default MasterModel