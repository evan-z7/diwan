//const express = require ('express')
// const userConrtoller =require('../controllers/user_controller')
// const router =express.Router()

// router.post ('/',userConrtoller.save)
// router.get('/:id',userConrtoller.show) 
// router.get('/',userConrtoller.allData)
// router.patch('/:id',userConrtoller.updateData)
// router.delete('/:id',userConrtoller.drop)
// router.post('/login',userConrtoller.login)
import express from 'express'

import { save, show, allData, updateData, drop, login } from '../controllers/user_contorl.js';

const router =new express.Router();

router.post('/', save);
router.get('/:id', show);
router.get('/', allData);
router.patch('/:id', updateData);
router.delete('/:id', drop);
router.post('/login', login);


export default router;     