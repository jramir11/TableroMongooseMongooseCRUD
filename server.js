const express = require('express')
const bodyParse = require('body-parser')

const mongoose=require('./server/config/mongoose');

const User=require('./server/models/manada');

const router=require('./server/config/router');


const app = express()
app.use(router);


app.use(bodyParse.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/view')

app.set('view engine', 'ejs')









function handleError(error) {
    // if (error.code === 11000) {
    //     return `Email duplicate: ${error.keyValue.email}`
    // } else if (error.errors.email.path === 'email') {
    //     return `Email invalid: ${error.errors.email.value} `
    // } else {
        console.log(error);
        return error
    // }
}


app.listen(8000, () => {
    console.log('Escuchando http://localhost:8000/manada en puerto 8000');
})
