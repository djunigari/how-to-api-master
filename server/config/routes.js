module.exports = app => {
    app.post('/signin', app.api.auth.signin)

    app.route('/cheese')
        .all(app.config.passportApiKey.authenticate())
        .get(app.api.cheese.get)
        .post(app.api.cheese.save)
    
    app.route('/cheese/:id')
        .put(app.api.cheese.update)
        .delete(app.api.cheese.remove)

    app.route('/client')
        .all(app.config.passport.authenticate())
        .post(app.api.client.save)
        .get(app.api.client.get)
}