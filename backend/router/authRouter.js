import express from 'express'
import { registerController, loginController } from '../controller/authController.js'

//Router Object
const router = express.Router();

//Registering Method POST
router.post('/register', registerController);

//Login POST Method
router.post('/login', loginController);

export default router;