import express  from "express";
import {registerController,loginController,testController, forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// router object
const router = express.Router()

//Routing || Method POST
//Register || POST
router.post('/register',registerController)

//LOGIN || POST
router.post('/login',loginController)

// FORGOT PASSWORD || POST
router.post('/forgot-password',forgotPasswordController)
//test router

router.get('/test',requireSignIn,isAdmin,testController)

// protected user routes
 router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
 });

// protected Admin routes
 router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
   res.status(200).send({ok:true});
});


 export default router
