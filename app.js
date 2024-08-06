/* imports */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importa o pacote cors

const app = express();

// Middleware para parsing de JSON
app.use(express.json()); // Adicione isso se estiver recebendo dados JSON nas requisições

// Configura o middleware cors
app.use(cors()); // Adiciona o middleware cors ao app

//Models
const User = require('./models/User');

// Rota pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API!' });
});

//Rota Privada
app.get('/user/:id', checkToken, async (req, res) => {   
    const id = req.params.id;

    //checar se o usuario existe
    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({ msg: 'Usuario não encontrado' });
    }

    res.status(200).json({ user });
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado' });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (erro) {
        res.status(400).json({ msg: "Token invalido" });
    }
}

//Registro usuario
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    //validações
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatorio' });
    }

    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatorio' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatoria' });
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    //cheque se o usuario existe
    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(422).json({ msg: 'Por favor utilize outro email' });
    }

    //criar senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //criar um usuario
    const user = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await user.save();
        res.status(201).json({ msg: 'Usuario criado com sucesso' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "O servidor está com problemas, tente novamente mais tarde" });
    }
});

//Login
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    //validação
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatorio' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatoria' });
    }

    //checar se o usuario existe
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: 'Usuario não encontrado' });
    }

    // checar a senha
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha invalida' });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({
            id: user._id,
        }, secret);

        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ancontece um erro no servidor, tente novamente mais tarde!'
        });
    }
});

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

// URL de conexão com MongoDB
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.rhsc7jf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Conectado ao banco de dados!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.log('Erro ao conectar ao banco de dados:', err));
