const auth_ = require('./auth/index');
const profile_ = require('./profile/index');
const security_ = require('./security/index');
const assesor_ = require('./assesor/index')
const getInm = require('../controllers/home')

function routerApi(app, express, path) {
	app.use(express.static(path))


	app.get('/', getInm)
	app.use('/auth', auth_);
	app.use('/profile', profile_)
	app.use('/security', security_);
	app.use('/inmuebles', assesor_)
}

module.exports = routerApi;