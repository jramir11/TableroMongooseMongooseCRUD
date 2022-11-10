
const { Router } = require('express');

const router= Router();

//mostrar todos los animales de la manada
const {manadaGet,manadaPost,registerGet,registerPost,editarGet,editarPost,destruirGet,destruirPost} = require('../controllers/quotes')
router.get('/manada', manadaGet)


router.post('/manada', manadaPost)


//nuevo animal de la manada : get
router.get('/register', registerGet)



//nuevo animal de la manada : post
router.post('/register',registerPost)


router.get("/editar",editarGet)



//Modificar manada : post
router.post('/editar/:id', editarPost)


router.get("/destruir",destruirGet)



//Eliminar manada : post
router.post('/destruir/:id', destruirPost)



module.exports=router;

