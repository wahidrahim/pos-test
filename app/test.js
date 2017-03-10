const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const client = require('../pos/api')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('app')
})

app.post('/', (req, res, next) => {
    const amount = req.body.amount
    const method = req.body.method

    client.purchase(amount, method)

    res.render('app')
})

app.listen(process.env.PORT || 8080, () => console.log('app running on port 8080...'))
