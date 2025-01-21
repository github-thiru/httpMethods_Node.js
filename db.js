const { promises } = require("dns")
let sql=require("mysql2")

const con=sql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'123456',
        database:'mobiles'

    }

)

function getmobile(){
   return new Promise((res, rej) => {
    con.query(`select * from mobiles`,(err,row,col)=>{
        if(err){
           rej(err)
        }else{
            res(row)
        //    console.log(row)
           // console.log(col)
        }
        con.end()
       })
   })
}

// getmobile()

function addmobile(n,p,r,s){
    return new Promise((resolve, reject) => {
        con.query(`
                    INSERT INTO mobiles (name, price, ram, storage) 
            VALUES (?, ?, ?, ?)
            `,[n,p,r,s],(err,row,col)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(row)
                }
            })
    })
 
}

// addmobile('infinix',7000,'4gb','64gb')


function updatemobile(id,n,p,r,s){
    return new Promise((resolve, reject) => {
        con.query( `UPDATE mobiles SET name = ?, price = ?, ram = ?, storage = ? WHERE id = ?`, 
            [n, p, r, s, id], 
  function(err,row,col){
    if(err){
        reject(err)
    }else{
        resolve(row)
    }
  }
   )
    })
   
}

function deletemobile(id){
   return new Promise((resolve, reject) => {
    con.query(`delete from mobiles where id=?`,[id],
        function(err,row,col){
          if(err){
              reject(err)
          }else{
              resolve(row)
          }
        }
         )
   })
}

module.exports={
    addmobile,getmobile,updatemobile,deletemobile
}