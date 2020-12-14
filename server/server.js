
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors')
app.use("/", cors());
const port = 3000;

const mongoose = require("mongoose")
const budgetModel = require('./models/budget_schema');
const { db } = require('./models/budget_schema');
//const deleteModel = require('./models/delete_schema')
var ObjectId = mongoose.Types.ObjectId;


let url = 'mongodb://localhost:27017/personal_budgetdb';

// const mongoose = require("mongoose")
// const budgetModel = require('./models/budget_schema')
// let url = 'mongodb://localhost:27017/personal_budgetdb';
//app.use('/', express.static('public'));

app.use(express.json());
app.get('/about', (req, res) => {
  res.send('This is my about page');
});

app.get('/budget', (req,res)=>{
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true})
       .then(()=>{
         budgetModel.find({})
          .then((data)=>{
              
              res.json(data);
              //console.log(data)
              mongoose.connection.close();
    })
          .catch((connectionError)=>{
              console.log(connectionError);
    });
  })
  .catch((connectionError)=>{
    console.log(connectionError);
  });
});

//post insert, put updates
app.post('/insertBudget', (req,res)=>{
    //console.log(req.body);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true})
       .then(()=>{
          const newBudget = ({
           title: req.body.title,
           cost: req.body.cost,
           color: req.body.color,
           username: req.body.username
         });
         console.log(newBudget)
         budgetModel.insertMany(newBudget)
         //console.log('budget inserted')
         .then((data)=> {
           res.json(data);
           mongoose.connection.close();
         })
         .catch((connectionError)=>{
           console.log(connectionError);
         });
        })
        .catch((connectionError)=>{
          console.log(connectionError);
        });
      });


      app.delete('/deleteBudget', (req,res)=>{
        mongodb.connect(url, { useUnifiedTopology: true }, (operationError, dbHandler)=> {
         if(operationError){
             console.log("an error has occured during the connection process");
         }
         else{
             console.log("Connected to the database")
             console.log("to be deleted item",{title: req.body.title})
             var Gtitle = req.body.title
             var titleToUpper = Gtitle.toUpperCase();
             // console.log(Gtitle)
             console.log(titleToUpper)
             
             // var id = req.body._id
              var delTitle = "{title: " + titleToUpper + "}"
              console.log(delTitle)
              dbHandler.db('personal_budgetdb').collection('personal_budget_collection').findOneAndDelete({title: titleToUpper}, (operr, opresult)=>{
                 if(operr){
                     console.log("Unable to insert data into collection")
                 }
                 else{
                     //console.log(opresult)
                     console.log("Delete Successfully")
                     dbHandler.close()
                 }
             }) 
         }
     });
     });
  


app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`)
});

/*app.delete('/deleteBudget', (req,res)=>{
  //console.log(req.body);
  //var id = req.body._id
  //console.log(id)
  //{id: 11}
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true})
     .then(()=>{
        var title = req.body._id
        var delTitle = "{_id: " + ObjectId(title) + "}"
        console.log(delTitle)

        //console.log(newBudget)
        //budgetModel.findByIdAndDelete(delID)
        
        budgetModel.findByIdAndDelete(delTitle, function (err, docs) { 
        if (err){ 
          console.log(err) 
        } 
        else{ 
        console.log("Deleted : ", docs); 
        } 
      })
       //console.log(budgetModel.findByIdAndDelete(id))
       //console.log(newBudget)
       //console.log('budget inserted')
      })
    });
    */

   














/* const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;

//app.use("/", express.static("public"));
app.use("/", cors());

const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 25,
    },
    {
      title: "Rent",
      budget: 375,
    },
    {
      title: "Grocery",
      budget: 110,
    },
  ],
};


//const budget = require("./server_budget");

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

//'http://localhost:3000/budget' */