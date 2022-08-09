import hastagRepository from "../repositories /hastagRepository.js"

export async function hastag(req,res){
    const { hastag } = req.params;
    try{
        const findHastag=  await hastagRepository.findHastag(hastag)
        if(!findHastag){
           return res.status(404).send("hastag Not Found")
        }
        res.status(200).send("oi")
    }catch(e){
        console.log(e)
        res.status(500).send("erro na hastag")
    }
}


