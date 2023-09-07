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
app.get("/games/:id", (req, res) => {
    var idParam = req.params.id
    if (isNaN(idParam)) {
        res.sendStatus(400) // não pode ser entregue devido a sintaxe incorreta
        res.send("isso não è um numero")
    } else {
        var id = parseInt(idParam)
        var game = DB.games.find(game => game.id == id)
        if (game) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})
app.post("/game", (req, res) => {
    var {title, price, year} = req.body;

    DB.games.push({
        id: 4,
        title,
        price,
        year
    });
    res.sendStatus(200)
})
app.delete("/game/:id", (req, res) => {
    var idParam = req.params.id
    if (isNaN(idParam)) {
        res.sendStatus(400) // não pode ser entregue devido a sintaxe incorreta
        res.send("isso não è um numero")
    } else {
        var id = parseInt(idParam)
        var index = DB.games.findIndex(g => g.id == id)
        if (index == -1) {
            res.sendStatus(404)
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})
app.put("/game/:id", (req,res) => {
    var idParam = req.params.id
    if(isNaN(idParam)) {
        res.sendStatus(400)
    } else {
        const idInt = parseInt(idParam) 
        var game = DB.games.find(game => game.id === idInt)
        if (game) {
            var {title, price, year} = req.body

            if (title !== undefined) {
                game.title = title
            }
            if (price !== undefined) {
                game.price = price
            }
            if (year !== undefined) {
                game.year = year
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(404) 
        }
    }
})
app.listen(45678, () => {
    console.log("API RODANDO")
})