const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    const ClientApi = app.mongoose.model('ClientApi', {
        _id: String,
        apiKey: String,
        email: String,
        client: String
    })

    const get = (req, res) => {
        Client.findOne({},{}, { sort: {'createdAt': -1}})
            .then(client => res.json(client)) 
    }

    const save = (req, res) => {
        const clientApi = new ClientApi({
            _id: Date.now(),
            apiKey: uuidv4(),
            email: req.body.email,
            client: req.body.client
        })
    
        clientApi.save().then(c => {
            res.status(201).send({data: c})
        })
            
        
    }

    return { ClientApi, get, save }
}