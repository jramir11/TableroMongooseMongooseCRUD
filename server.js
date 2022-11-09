const express = require('express')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
//const mongooseValidator = require('mongoose-validator')

const app = express()

app.use(bodyParse.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/view')

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/usersDb', { useNewUrlParser: true })

const UserSchema = new mongoose.Schema({
    id:{ type: String, require: [true, 'Se requiere Identificador Manada'] },
    animal: { type: String, require: [true, 'Se requiere Animal'] },
    totalintegrantes: { type: Number,min: 1, max: 1000, require: [true, 'numero de integrantes requerido'] },
    totalhijos: { type: Number,min:0, max: 20 },
    continente: { type: String, require: [true, 'continente es obligatorio'] }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);


//mostrar todos los animales de la manada
app.get('/manada', (req, res) => {
    User.find()
    .then(users => {
        if (users.length == 0){
            res.render('register', { error: '' })
        }
        let manada = users;
        res.render("manada",{manada: users});
    })
    .catch(error => handleError(error));
    
})



app.post('/manada',function(request,response){
    response.redirect('/register')
})





//nuevo animal de la manada : get
app.get('/register', (req, res) => {
    res.render('register', { error: '' })
})

//nuevo animal de la manada : post
app.post('/register', async (req, res) => {
    const { id, animal, totalintegrantes, totalhijos, continente } = req.body
    const user = new User()
    user.id = id
    user.animal = animal
    user.totalintegrantes = totalintegrantes
    user.totalhijos = totalhijos
    user.continente = continente
    user.save()
        .then(
            () => res.redirect('/manada')
        )
        .catch(
            (error) => {
                res.render('register', { error: handleError(error) })
            },
        )
})



app.get("/editar",function (req, res){
    let my_Id = req.query._id;
    User.find({ _id: my_Id })
        .then(data => res.render("editar", { manada: data }))
        .catch(error => handleError(error));
})

//Modificar manada : post
app.post('/editar/:id', async (req, res) => {
    User.updateOne({id: req.params.id}, {
        animal: req.body.animal,
        totalintegrantes: req.body.totalintegrantes,
        totalhijos:req.body.totalhijos,
        continente: req.body.continente
        })
        .then(
            () => res.redirect('/manada')
        )
        .catch(error => handleError(error))
})



app.get("/destruir",function (req, res){
    let my_Id = req.query._id;
    User.find({ _id: my_Id })
        .then(data => res.render("destruir", { manada: data }))
        .catch(error => handleError(error));
})
//Eliminar manada : post
app.post('/destruir/:id', async (req, res) => {
    User.remove({id: req.params.id})
        .then(
            () => res.redirect('/manada')
        )
        .catch(error => handleError(error))
})







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
