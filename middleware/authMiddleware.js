const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido. Por favor, faça login.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Armazenar o ID do usuário no req
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;
