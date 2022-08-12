import bcrypt from 'bcrypt'
import authRepository from '../../repositories /authRepository.js'

export async function signIn(req, res){
   try{
      const {name, password, email, pictureUrl} = req.body
      
      const salt = 10 
      const password_hash = bcrypt.hashSync(password, salt)
      
      const registered = await authRepository.registeredUser(name, password_hash, email, pictureUrl)
      
      if(registered==='23505'){
         return res.status(401).send("Email already registered")
      }
      return res.sendStatus(201)
      
   }catch{
      return res.sendStatus(500)
   }
}