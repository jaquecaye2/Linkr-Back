import hastagRepository from "../repositories /hastagRepository.js"

export async function hastag(req,res){
    const { hastag } = req.params;
    const newHastag = hastag?.replace("#", "").trim();
    try{
        const  findHastag =  await hastagRepository.findHastag(newHastag)
        if(findHastag.rowCount == 0){
           return res.status(404).send("hastag Not Found")
        }

       const { rows : postHastag } =  await hastagRepository.redirectHastag(newHastag)
    
        res.status(200).send(postHastag)
    }catch(e){
        console.log(e)
        res.status(500).send("erro na hastag")
    }
}

export async function rankingHastag(req,res){
    const { hastag } = req.params;
    try{
        const  findHastag =  await hastagRepository.findHastag(hastag)
        if(findHastag.rowCount == 0){
           return res.status(404).send("hastag Not Found")
        }
       const sum = findHastag.rows[0].views + 1
       await hastagRepository.updateView(sum,hastag)
        res.status(200).send()
    }catch(e){
        console.log(e)
        res.status(500).send("erro na hastag")
    }
}


