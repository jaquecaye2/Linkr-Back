
export async function test(req, res) {
    try {
        res.status(201).send("created")

    } catch (e) {
        console.log(e)
        res.status(500).send("xabu")
    }


}