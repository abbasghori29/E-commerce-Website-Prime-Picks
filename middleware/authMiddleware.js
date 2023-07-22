import jwt from "jsonwebtoken";

// protected routes token base for user protection
export const requireSignIn = async(req,res,next)=>{
    try {

        const decode = jwt.verify(req.headers.authorization, process.env.jwt_secret );
        req.user=decode;
        next();

    } catch (error) {
        console.log(error)
    }
}

//admin access
export const isAdmin=async(req,res,next)=>{
try {
    const user = await userModel.findById(req.user._id);
     if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:"Unauthorized Access",
        })
     }
     else{
        next();
     }
} catch (error) {
    console.log(error)
    res.status(401).send({
        success:false,
        message:"Error In admin middleware",
        error
    })
}
}