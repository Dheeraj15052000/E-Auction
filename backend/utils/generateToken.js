import jwt from 'jsonwebtoken';

export const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"2d"
    });
}

export const generateResetToken=(id)=>{
    return jwt.sign({id},process.env.JWT_RESET_SECRET,{
        expiresIn:"1h"
    });
}

