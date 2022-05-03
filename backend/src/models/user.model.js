const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new  Schema({
    nome: { type: String, maxlength: 50, required: true},
    email: { type: String, maxlength: 30, required: true},
    senha: { type: String, required: true},
    //cpf: { type: String, required: true},
   // telefone: { type: String, required: true},
    //dataNasc: { type: Date, required: true},
   // dataCadast: { type: Date, required: true},
   // bloco: { type: String, required: true},
   // apartamento: { type: Number , maxlength: 50, required: true},
   // inadimplente: { type: Boolean, required: true},
    tokens: [
        {
            token: { type: String, require: true }      
        }        
    ]
}, {
    timestamps: true,
    collection: 'users',
});

userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified('senha')) {
        user.senha = await bcrypt.hash(user.senha, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, nome: user.nome, email: user.email }, 'secret');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, senha) => {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
        throw new Error({ error: 'Login inválido!' });
    }

    const isPasswordMatch = await bcrypt.compare(senha, user.senha);

    if (!isPasswordMatch) {
        throw new Error({ error: 'Senha inválida!' });
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;