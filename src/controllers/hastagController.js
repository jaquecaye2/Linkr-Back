import hastagRepository from "../repositories /hastagRepository.js"

export async function hastag(req,res){
    const { hastag } = req.params;
    try{
        const  findHastag =  await hastagRepository.findHastag(hastag)
        if(findHastag.rowCount == 0){
           return res.status(404).send("hastag Not Found")
        }

        const redirectHastag = await hastagRepository.redirectHastag(hastag)
        console.log(redirectHastag)
        

        res.status(200).send("ok")
    }catch(e){
        console.log(e)
        res.status(500).send("erro na hastag")
    }
}


