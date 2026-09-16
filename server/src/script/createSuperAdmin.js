import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import userModel from "../model/user.model.js";

async  function createSuperAdmin(){
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await userModel.findOne({ role: 'super_admin'});
    if(existing){
        console.log('Super admin already exist ', existing.email)
        return process.exit(0);
    }
    const hashpassword = await bcrypt.hash("nikhilisAdmin123",10);

    const super_admin = await userModel.create({
        username:"superadmin",
        email:'nikhiltiwari1425@gmail.com',
        password:hashpassword,
        role:'super_admin',
        isVerified: true  
    });

    console.log(" super admin is created: ", super_admin.email);
    process.exit(0);
}

createSuperAdmin();

