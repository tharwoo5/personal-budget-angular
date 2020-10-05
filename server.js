const express = require("express");
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

//'http://localhost:3000/budget'