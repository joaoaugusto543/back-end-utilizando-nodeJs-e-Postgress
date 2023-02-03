import {showUser,insert, showUsers, updateUser, deleteUser} from "../config/dataBase"


class UserController{

    async index(req,res){

        try {

            const users=await showUsers()
            
            return res.status(200).json(users)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'internal error'})
        }

    }

    async show(req,res){
        try {

            const id=req.params.id

            const user=await showUser(id)

            if(!user[0]){
                return res.status(422).json({message:'User does not exist'})
            }

            return res.status(200).json(user)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'internal error'})
        }
    }

    async create(req,res){
        try {
            const {id,name,age}=req.body

            const user=await showUser(id)

            if(user[0]){
                return res.status(422).json({emailAlreadyExists:`User already exists`})
            }

            await insert(id,name,age)

            const newUser=await showUser(id)

            return res.json(newUser)

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'internal error'})
        }
        
        
    }

    async update(req,res){

        try {

            const id=req.params.id

            const {name,age}=req.body

            const user=await showUser(id)

            if(!user[0]){
                return res.status(422).json({message:'User does not exist'})
            }

            if(!name && age){

                updateUser(id,user[0].name,age)

            }else if(!age && name){

                updateUser(id,name,user[0].age)

            }else if(age && name){

                updateUser(id,name,age)

            }

            const updatedUser=await showUser(id)

            return res.status(201).json(updatedUser)

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'internal error'})
        }

    }

    async destroy(req,res){
        try {
            
            const id=req.params.id

            const user= await showUser(id)

            if(!user[0]){
                return res.status(422).json({message:'User does not exist'})
            }

            deleteUser(id)

            return res.status(201).json(user)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'internal error'})
        }
    }

   
}

export default new UserController()