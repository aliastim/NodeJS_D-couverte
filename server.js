let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

// Module de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }

}))
app.use(require('./middlewares/flash'))

// Routes
app.get('/', (request, response) => {

    let Message = require('./models/message')
    Message.all(function (messages) {
        response.render('pages/index', {messages: messages})
    })
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === "")
    {
        request.flash('error', 'aucun message posté')
        response.redirect('/')
    } else
    {
        let Message = require('./models/message')
        Message.create(request.body.message, function () {
            request.flash('success', 'votre message a été posté')
            response.redirect('/')
        })
    }

})

app.get('/message/:id', (request, response) => {
    let Message = require('./models/message')
    Message.find(request.params.id, function (message)
    {
        response.render('messages/show', {message: message})
    })
})

app.listen(8080)