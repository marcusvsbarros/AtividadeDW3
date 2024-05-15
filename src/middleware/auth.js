const jwt = require('jsonwebtoken')

exports.auth = async function (req, res, next) {
    const token = req.header('access-token')
    if (!token) return res.status(401).json({
        msg: 'Acesso negado. É obrigatorio o envio do token JWT'
    })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        /**o decoded irá conter:
         * payload - id do usuário
         * exp (expiration) - data de epiração
         * iat (issued at) - data da criação
         */
        req.usuario = await decoded.usuario
        next() //direcionamos para o endpoint
    } catch (e) {
        res.status(403).send({ error: `Token inválido: ${e.message}` })
    }
}