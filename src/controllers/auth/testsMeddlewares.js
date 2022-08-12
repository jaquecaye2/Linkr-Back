
export function tests(req, res){
 
    const idUser = res.locals.idUser
    
    console.log(idUser)
    return res.send("idUser")
}