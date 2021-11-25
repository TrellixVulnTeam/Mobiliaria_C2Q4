const auth_ = require('./auth/index');
const security_ = require('./security/index');
const assesor_ = require('./assesor/index')
const getInm = require('../controllers/home')

function routerApi(app) {
	app.get('/', getInm)
	app.use('/auth', auth_);
	app.use('/security', security_);
	app.use('/inmuebles', assesor_)
}

module.exports = routerApi;