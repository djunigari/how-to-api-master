const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    const { existsOrError } = app.api.validation

    const limit = 3

    const get = async (req, res) => {
        const page = req.query.page || 1
        
        const result = await app.db('clientApi').count('id').first()
        const count = parseInt(result.count)

        app.db('clientApi')
            .select('id','email','clientHostName', 'apiKey')
            .limit(limit)
            .offset(page * limit - limit)
            .then(clients => res.json({data: clients, count, limit}))
            .catch(err => res.status(500).send(err))
    }


    const save = (req, res) => {
        const clientApi = {...req.body}

        try{
            existsOrError(clientApi.email, 'E-mail não informado')
            existsOrError(clientApi.clientHostName, 'Client Hostname não informado')
        }catch(msg){
            return res.status(400).send(msg)
        }

        clientApi.apiKey = uuidv4()
        
        app.db('clientApi')
                .insert(clientApi)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
            
        
    }

    return { get, save }
}