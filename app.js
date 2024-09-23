require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const compiler = require('compilex');
const path = require('path');

// Configura o compilador
const options = { stats: true };
compiler.init(options);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos
app.use('/codemirror-5.65.16', express.static(path.join(__dirname, 'codemirror-5.65.16')));
app.use(express.static(path.join(__dirname, 'public')));

// Modelos
const User = require('./models/User');

// Importar as rotas
const challengeRoutes = require('./routes/challenges');
const submissionRoutes = require('./routes/submissions');
const rankingRoutes = require('./routes/ranking');

// Middleware para as rotas de desafios e submissões
app.use('/api/challenges', challengeRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api', rankingRoutes);


// Rota pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API!' });
});

// Rota privada
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({ msg: 'Usuario não encontrado' });
    }

    res.status(200).json({ user });
});

// Função para verificar o token
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
    } catch (error) {
        res.status(400).json({ msg: "Token inválido" });
    }
}

// Registro de usuário
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: 'Por favor, preencha todos os campos.' });
    }

    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ msg: 'E-mail já registrado.' });
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criar novo usuário
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ msg: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor.' });
    }
});

// Login
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    // Verificação de email e senha
    if (!email || !password) {
        return res.status(422).json({ msg: 'O email e a senha são obrigatórios' });
    }

    // Busca o usuário no banco de dados
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha ou email inválidos' });
    }

    try {
        const secret = process.env.JWT_SECRET;

        // Gera o token JWT com expiração de 7 dias
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });

        // Retorna o token e o ID do usuário
        res.status(200).json({
            msg: 'Autenticação realizada com sucesso',
            token,
            userId: user._id  // Inclui o ID do usuário na resposta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde!' });
    }
});

// Compilação de código
app.post('/compile', async (req, res) => {
    const { code, lang, testCases = [] } = req.body;
    const results = [];

    if (testCases.length === 0) {
        // Se nenhum test case foi fornecido, execute o código sem entrada
        const envData = { OS: "windows" };

        try {
            let result = "";
            if (lang === "Cpp") {
                result = await new Promise((resolve, reject) => {
                    compiler.compileCPP(envData, code, function (data) {
                        if (data.error) reject(data.error);
                        resolve(data.output || "No output");
                    });
                });
            } else if (lang === "Java") {
                result = await new Promise((resolve, reject) => {
                    compiler.compileJava(envData, code, function (data) {
                        if (data.error) reject(data.error);
                        resolve(data.output || "No output");
                    });
                });
            } else if (lang === "Python") {
                result = await new Promise((resolve, reject) => {
                    compiler.compilePython(envData, code, function (data) {
                        if (data.error) reject(data.error);
                        resolve(data.output || "No output");
                    });
                });
            }
            results.push({ output: (result || "").trim() });
        } catch (error) {
            console.log(error);
            results.push({ output: "Erro na execução: " + (error.message || "Erro desconhecido") });
        }
    } else {
        // Se test cases foram fornecidos, execute o código com as entradas
        for (const testCase of testCases) {
            const { input, expected } = testCase;
            const envData = { OS: "windows" };

            try {
                let result = "";
                if (lang === "Cpp") {
                    result = await new Promise((resolve, reject) => {
                        compiler.compileCPPWithInput(envData, code, input, function (data) {
                            if (data.error) reject(data.error);
                            resolve(data.output || "No output");
                        });
                    });
                } else if (lang === "Java") {
                    result = await new Promise((resolve, reject) => {
                        compiler.compileJavaWithInput(envData, code, input, function (data) {
                            if (data.error) reject(data.error);
                            resolve(data.output || "No output");
                        });
                    });
                } else if (lang === "Python") {
                    result = await new Promise((resolve, reject) => {
                        compiler.compilePythonWithInput(envData, code, input, function (data) {
                            if (data.error) reject(data.error);
                            resolve(data.output || "No output");
                        });
                    });
                }
                results.push({ input, expected, output: (result || "").trim(), passed: (result || "").trim() === expected.trim() });
            } catch (error) {
                console.log(error);
                results.push({ input, expected, output: "Erro na execução: " + (error.message || "Erro desconhecido"), passed: false });
            }
        }
    }

    res.send(results);
});

// Conexão com o MongoDB e inicialização do servidor
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.rhsc7jf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Conectado ao banco de dados!');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => console.log('Erro ao conectar ao banco de dados:', err));
