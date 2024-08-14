import express from 'express'
import mongoose from 'mongoose'

import CalcModel from '../models/CalcModel.js'
import MasterModel from '../models/MasterModel.js'

export const getClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const client = await CalcModel.findById(id);
        
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const getClients = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await CalcModel.countDocuments({});
        const clients = await CalcModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: clients, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createClient = async (req, res) => {

    const client = req.body    
    const newClient = new CalcModel({...client, createdAt: new Date().toISOString() })

    try {
        await newClient.save()
        res.status(201).json(newClient)
    } catch (error) {
        res.status(409).json(error.message)
    }

    

}

export const updateClient = async (req, res) => {
    const { id: _id } = req.params
    const client = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No records with that id')

    const updatedClient = await CalcModel.findByIdAndUpdate(_id, {...client, _id}, { new: true})

    res.json(updatedClient)
}


export const deleteClient = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No records with that id')

    await CalcModel.findByIdAndRemove(id)

    res.json({message: 'Deleted successfully'})
}


export const getClientsByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const clients = await CalcModel.find({ userId: searchQuery });

        res.json({ data: clients });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

