import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

//+++++++++++++TO SEND THE DATA++++++++++++++++++


// app.get('/',(req,res)=>{
//     res.send('hello express !!')
// })
// app.get('/ice-tea',(req,res)=>{
//     res.send('hello ice-tea !!')
// })
// app.get('/instagram',(req,res)=>{
//     res.send('hello princegupta.in !!')
// })
// app.listen(port,()=>{
//     console.log(`Server is running at port:${port}...`);

// })

// +++++++++++++TO RECEIVE THE DATA FROM FRONTEND SIDE++++++++++++++++++

app.use(express.json())

let teaData = []
let nextId = 1


//add a new tea
app.post('/teas', (req, res) => {
    //destructuring the data ,like req.body.name
    const { name, price } = req.body

    //storing this data in object
    const newTea = { id: nextId++, name, price }

    teaData.push(newTea)
    res.status(201).send(newTea)
})
//get all tea list
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})
//if want to get an specific tea, pass the id in url
app.get("/teas/:dhaiChudaID", (req, res) => {
    const presentTea = teaData.find((e) => e.id === parseInt(req.params.dhaiChudaID)) //params keyword is used to extract things from url
    if (!presentTea) { return res.status(404).send("Tea Out of Stock") }
    res.status(200).send(presentTea)

})
//update tea
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea Not Found")
    }
    const {name, price} = req.body
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea)
})
//delete tea
app.delete('/teas/:id',(req,res)=>{
    // const tea = teaData.find(t => t.id === parseInt(req.params.id))
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Tea Already Not exist")
    }
    teaData.splice(index,index)
    return res.status(200).send("Deleted")

})
app.listen(port, () => {
    console.log(`Server is running at port:${port}...`);

})