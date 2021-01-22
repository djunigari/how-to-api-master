const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        if(!email || !password){
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({email: email})
            .first()
        
        if(!user) return res.status(400).send('Usuário não encontrado')

        const isMatch = bcrypt.compareSync(password, user.password)
        if(!isMatch) return res.status(401).send('Email/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            // 60s * 60min * 24h * 3d
            exp: now + (60 * 60 * 24 * 3) 
            //exp: now + 10
        }

        res.json({
            ...payload,
            token: jwt.encode(payload,authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch(e){
            //problema com o token
        }
        res.send(false)
    }
    return { signin, validateToken}
}
