import express from 'express'
import mongoose from 'mongoose'

import MasterModel from '../models/MasterModel.js';


// export const getClients = async (req, res) => {
//     const userId = req.body

//     try {
//         const allClients = await MasterModel.find({userId: userId}).sort({_id:-1}) 
//         //find({}).sort({_id:-1}) to sort according to date of creation

//         res.status(200).json(allClients)

//     } catch (error) {
//         res.status(409).json(error.message)
        
//     }
    
// }


export const getClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const client = await MasterModel.findById(id);
        
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getClientByMasterId = async (req, res) => { 
    const { id } = req.params;
    // console.log("check",id);

    try {
        const clients = await MasterModel.find({ masterId: id });

        if (clients.length === 0) {
            return res.status(404).json({ message: 'No documents found with the given masterId' });
        }

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getClients = async (req, res) => {
    const { page } = req.query;
     console.log("check");
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        
        const total = await MasterModel.countDocuments({});
        const clients = await MasterModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: clients, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createClient = async (req, res) => {

    const client = req.body

    const newClient = new MasterModel({...client, createdAt: new Date().toISOString() })

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

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id')

    const updatedClient = await MasterModel.findByIdAndUpdate(_id, {...client, _id}, { new: true})

    res.json(updatedClient)
}


export const deleteClient = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Client with that id')

    await MasterModel.findByIdAndRemove(id)

    res.json({message: 'Client deleted successfully'})
}


export const getClientsByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const clients = await MasterModel.find({ userId: searchQuery });

        res.json({ data: clients });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

