const passport = require('passport')

const { HeaderAPIKeyStrategy } = require('passport-headerapikey')

module.exports = app => {
    const strategy = new HeaderAPIKeyStrategy(
        { header: 'Authorization', prefix: 'x-api-key ' },
        true,
        function(apiKey, done, req) {
            const ClientApi = app.mongoose.model('ClientApi')
            ClientApi.findOne({ apiKey: apiKey},{}).then( c => {
                if (!c) { return done(null, false); }
                return done(null, c);
            })
        }
    )
    passport.use(strategy)

    return{
        authenticate: () => passport.authenticate('headerapikey', { session: false}),
    }
}