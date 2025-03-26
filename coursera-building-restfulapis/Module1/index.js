const express = require('express')

const bodyParser = require('body-parser')


const app = express();

const port = 8080


app.use(bodyParser.json())

let todos = [
    {id:1, title:'TODO 1'},
    {id:2, title:'TODO 2'},
    {id:3, title:'TODO 3'}
]

// Going to localhost:8080/todos produces this
app.get('/todos', (req,res) => {
    res.json(todos);
})

app.listen(port, () => {
    console.log(`Server running on port localhost:${port}`)
})

