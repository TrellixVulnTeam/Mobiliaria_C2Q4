const home_ = require('./home/index');
const auth_ = require('./auth/index');
const profile_ = require('./profile/index');
const security_ = require('./security/index');
const assesor_ = require('./assesor/index');


function routerApi(app, express, path) {
	app.use(express.static(path))
	app.use('/auth', auth_);
	app.use('/profile', profile_)
	app.use('/security', security_);
	app.use('/inmuebles', assesor_)
	app.use('/', home_)
}

module.exports = routerApi;