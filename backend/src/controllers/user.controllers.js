const User = require('../models/user.model');



exports.registerNewUser = async (req, res) => {
    try {
        let isUser = await User.find({ email: req.body.email });
        console.log(isUser);

        if (isUser.length >= 1) {
            return res.status(409).json({ message: 'Desculpe, este email já foi utilizado!' });
        }

        const newUser = new User(req.body);
        const user = await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).json({ message: 'Usuário criado com sucesso!', user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const senha = req.body.senha;
        const user = await User.findByCredentials(email, senha);

        if (!user) {
            return res.status(401).json({ error: 'Erro ao realizar o Login! Verfique suas credenciais!' })
        }

        const token = await user.generateAuthToken();
        res.status(201).json({ message: 'Usuário logado com sucesso!', user, token });
    } catch (err) {
        res.status(400).json({ message: 'Usuário ou senha incorreto' });
    }
};

exports.returnUserProfile = async (req, res) => {
    await res.json(req.userData);
};
