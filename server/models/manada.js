const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id:{ type: String, require: [true, 'Se requiere Identificador Manada'] },
    animal: { type: String, require: [true, 'Se requiere Animal'] },
    totalintegrantes: { type: Number,min: 1, max: 1000, require: [true, 'numero de integrantes requerido'] },
    totalhijos: { type: Number,min:0, max: 20 },
    continente: { type: String, require: [true, 'continente es obligatorio'] }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports=User;
