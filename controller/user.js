import usersModel from "../model/users.js";
import Jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
    console.log(res.userName)
    console.log(res.email)
    try {
        const users = await usersModel.find();
        res.status(200).json({
            message :"get users",
            users,
        })
    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong", error: error.message })
        console.log(error)
    }

}

export const registerUsers = async (req, res) => {
    const { userName, email, password } = req.body;

    const isUser = await usersModel.findOne({ email })
    try {

        if (isUser) {
            res.status(400).json({
                message: "Already Created an account"
            });
            return
        }
        const newUser = await usersModel({
            userName,
            email,
            password
        });
        const users = await newUser.save();
        res.status(201).json({
            message: "User Registeration successfull",
            users,
        })
    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong", error: error.message })
        console.log(error)
    }
}

export const loginUsers = async (req, res) => {

    const { email, password } = req.body;

    const isUser = await usersModel.findOne({ email });

    try {
     const tokenScrate = "thisisthetokensecret"
        if (isUser) {
            if (isUser.password === password) {
                res.status(200).json({
                    message: "Login successfull", 
                    token: Jwt.sign({
                        id: isUser._id,
                        userName: isUser.userName,
                        email: isUser.email
                    }, tokenScrate )
                })
            } else {
                res.status(400).json({
                    message: "Invalid Cradintial",
                })
            }

        } else {
            res.status(400).json({
                message: "Invalid Cradintial",
            })
        }



    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong", error: error.message })
        console.log(error)
    }

}


