import bcrypt from 'bcryptjs';
import userModel from '../model/user.model.js'

export async function createAdmin(req, res) {
    try {
        const { username, email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!username || !normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username email & password"
            });
        }

        const existingUser = await userModel.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: true,
                message: "Admin Already exist with this email"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const newAdmin = await userModel.create({
            username,
            email: normalizedEmail,
            password: hashedpassword,
            role: "admin",
            isVerified: true
        });

        return res.status(201).json({
            message: "Admin created succesfully",
            user: {
                id: newAdmin._id,
                username: newAdmin.username,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });

    } catch (error) {
        console.error("something went wrong in admin creation", error.message)
        return res.status(500).json({ success: false, message: "error occoure in creating admin account" })
    }
}

// list all admin 

export async function getAllAdmin(req, res) {
    try {
        const admins = await userModel.find({ role: "admin" }).select("-password");
        return res.status(200).json({
            success: true,
            admins
        });

    } catch (error) {
        console.error("Error in getAllAdmins", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function removeAdmin(req, res) {

    try {
        const { id } = req.params;
        const admin = await userModel.findOne({ _id: id, role: "admin" });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'admin is not found'
            });
        }
        await userModel.deleteOne({ _id: id });
        return res.status(200).json({
            success: true,
            message: 'Admin removed succesfully'
        });

    } catch (error) {
        console.error('Error in removelAdmin', error);
        res.status(500).json({
            success: false,
            message: "server error in removing admin"
        });
    }

}

