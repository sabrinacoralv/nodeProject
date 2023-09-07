const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}));
app.unsubscribe(bodyParser.json())


var DB = {
    games: [
        {
            id: 1,
            title: "call of duty",
            year: 2019,
            price: 85
        },
        {
            id: 2,
            title: "4 horas",
            year: 2014,
            price: 30
        },
        {
            id: 3,
            title: "de crack",
            year: 2010,
            price: 5
        }
    ]
}
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games)
})
app.listen(45678, () => {
    console.log("API RODANDO")
})