const passport = require('passport')

const { HeaderAPIKeyStrategy } = require('passport-headerapikey')

module.exports = app => {
    const strategy = new HeaderAPIKeyStrategy(
        { header: 'Authorization', prefix: 'x-api-key ' },
        true,
        function(apiKey, done, req) {
            app.db('clientApi')
                .where({apiKey})
                .first()
                .then( c => {
                    if (!c) { return done(null, false); }
                    return done(null, c);
                })
                .catch(err => res.status(500).send(err))
        }
    )
    passport.use(strategy)

    return{
        authenticate: () => passport.authenticate('headerapikey', { session: false}),
    }
}