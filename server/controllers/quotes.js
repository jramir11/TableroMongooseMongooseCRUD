const User = require('../models/manada')

const manadaGet =  (req, res) => {
    User.find()
    .then(users => {
        if (users.length == 0){
            res.render('register', { error: '' })
        }
        let manada = users;
        res.render("manada",{manada: users});
    })
    .catch(error => handleError(error));
}

const manadaPost = function(request,response){
    response.redirect('/register')
}


const registerGet =  (req, res) => {
    res.render('register', { error: '' })
}

const registerPost = async (req, res) => {
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
}

const editarGet = function (req, res){
    let my_Id = req.query._id;
    User.find({ _id: my_Id })
        .then(data => res.render("editar", { manada: data }))
        .catch(error => handleError(error));
}


const editarPost = async (req, res) => {
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
}


const destruirGet = function (req, res){
    let my_Id = req.query._id;
    User.find({ _id: my_Id })
        .then(data => res.render("destruir", { manada: data }))
        .catch(error => handleError(error));
}


const destruirPost = async (req, res) => {
    User.remove({id: req.params.id})
        .then(
            () => res.redirect('/manada')
        )
        .catch(error => handleError(error))
}


module.exports={manadaGet,manadaPost,registerGet,registerPost,editarGet,editarPost,destruirGet,destruirPost};
