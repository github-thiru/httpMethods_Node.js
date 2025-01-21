let express=require("express")

const bodyParser = require('body-parser');

const cors = require('cors');
const db=require('./db.js')

let app=express()
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.listen(5100,()=>{
  console.log("server started port 5100")
})

app.get('/mobiles',(req,res)=>{

    db.getmobile()
    .then((data)=>{
    res.json(data)
    })

    .catch(()=>{
        res.send("err")
    })
//   res.send("mobile get ")
})


app.post('/mobiles',(req,res)=>{
    db.addmobile(req.body.name,req.body.price,req.body.ram,req.body.storage)
    .then((data)=>{  // data
   res.send(data)  ///check the res data check the req.body
    })

    .catch((err)=>{
        console.error("Error adding mobile:", err);
        res.status(500).send("Error adding mobile");
    })
 
})


app.put('/mobiles',(req,res)=>{
 db.updatemobile(req.body.id,req.body.name,req.body.price,req.body.ram,req.body.storage)
 .then(()=>{     //check data
    res.send(req.body)  // data campare  post and put  data
 })

 .catch(()=>{
    res.send("err")
})
})


app.delete('/mobiles',(req,res)=>{
  db.deletemobile(req.body.id)
  .then((remove)=>{res.send(remove)})
  .catch(()=>{ res.send("err")})
})