const { CONNREFUSED } = require("dns");
const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Qwerty@32",
    database:"shorturls"
});
con.connect(function(error){
    if(error){
        console.log("Database connection failed");
    }
})

app.get("/",function(request,response){
    response.sendFfile(___dirname + "/public/URL SHORTNER APPLICATION.html");
});

app.post("/api/create-short-url",function(request,response){
    let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substring(2.10)
    let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}'`
    con.query(sql,function(error,result){
        if(error){
            response.status(500).json({
                status:"notbok",
                message:"something went wrong"
                });
        } else {
            response.status(200).json({
                status:"ok",
                shorturlid:uniqueID
            });
        }
    })                                                                                                                                                                
    });

    app.get("/api/create-short-urls",function(request,response){ 
     let sql = `SELECT * FROM links`;
    con.query(sql,function(error,result){
        if(error){
            response.status(500).json({
                status:"notbok",
                message:"Something went wrong"
            });
        } else {
            response.status(200).json(result);
        }
    })
});    
 app.get("/:shorturlid",function(request,response){
    let shorturlid = request.params.shorturlid;
    let sql = `SELECT *  FROM links WHERE shorturlid=${shorturlid} LIMMIT 1`;
    con.query(sql,function(error,result){
        if(error){
            response.status(500).json({
                status:"notok",
                message:"Something went wrong"
            });
        } else {
            sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}' LIMIT 1`;
            con.query(sql,function(error,result2){
                if(error){
                    response.status(500).json({
                        status:"notok",
                        message:"Something went wrong"
                    });
        }else{response.redirect(redirect[0].longurl);
        }
    })
    }
  })
 });

app.listen(5000);
