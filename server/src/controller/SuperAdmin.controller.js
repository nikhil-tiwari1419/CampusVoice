import bcrypt from 'bcryptjs';
import userModel from '../model/user.model.js'
import ProgramModel from '../model/Program.model.js';
import BranchModel from '../model/Branch.model.js';

export async function createAdmin(req, res) {
    try {
        const { username, email, password, managedProgram, managedBranch } = req.body;

        const normalizedEmail = email?.trim().toLowerCase();

        if (!username || !normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username email & password"
            });
        }

        //select only one fource fully 
        if (!managedProgram && !managedBranch) {
            return res.status(400).json({
                success: false,
                message: "Please assign eighter a program  (for no-branch programs like BCA) or a branch (for programs with branches like BSc)"
            });
        }
        if (managedProgram && managedBranch) {
            return res.status(400).json({
                success: false,
                message: "Assign only one: eighter a program OR a branch, not both"
            });
        }

        // validate the reference is acutally exist 
        if (managedProgram) {
            const progamExist = await ProgramModel.findById(managedProgram)
            if (!progamExist) {
                return res.status(404).json({
                    success: false,
                    message: "program not found"
                });
            }
            if(progamExist.hasBranches){
                return res.status(400).json({
                    success:false,
                    message:"This Program has branches - assign a branches insted of whole program "
                });
            }
        }

        //validate branch
        if (managedBranch) {
            const branchExist = await BranchModel.findById(managedBranch)
            if (!branchExist) {
                return res.status(404).json({
                    success: false,
                    message: "Branch does not exist"
                });
            }
        }
        const existingUser = await userModel.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Admin Already exist with this email"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const newAdmin = await userModel.create({
            username,
            email: normalizedEmail,
            password: hashedpassword,
            role: "admin",
            isVerified: true,
            managedProgram: managedProgram,
            managedBranch: managedBranch,
            createdBy: req.user.id // super_admin
        });

        return res.status(201).json({
            message: "Admin created succesfully",
            user: {
                id: newAdmin._id,
                username: newAdmin.username,
                email: newAdmin.email,
                role: newAdmin.role,
                managedProgram: newAdmin.managedProgram,
                managedBranch: newAdmin.managedBranch
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

