import express from 'express'
import {getClients, createClient, updateClient, deleteClient, getClientsByUser, getClientByMasterId} from '../controllers/master.js'

const router = express.Router()

router.get('/', getClients)
router.get('/fetch/:id', getClientByMasterId)
router.get('/user', getClientsByUser);
router.post('/', createClient)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)

export default router