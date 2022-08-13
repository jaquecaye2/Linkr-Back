import bcrypt from 'bcrypt'
import authRepository from '../../repositories/authRepository.js'
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export async function logIn(req, res){
    dotenv.config();

    const {email, password} = req.body

    try{
        let {rows: user} = await authRepository.getUser(email)
        
        if(user.length===0){
            return  res.status(401).send("email or password incorrect");
        }
        
        user = user[0]
        const passwordVerify = bcrypt.compareSync(password, user.password_hash)

        if(!passwordVerify){
            return  res.status(401).send("email or password incorrect");
        }

        const iduser = user.id
        const secretKey = process.env.JWT_SECRET
        const config = { expiresIn: 60*60*2 }

        const token = Jwt.sign({iduser}, secretKey, config)

        const dataUser = {
            token,
            picture: user.picture,
            name: user.name
        }

        return res.status(200).send(dataUser)

    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }

}