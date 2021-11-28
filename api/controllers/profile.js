const User = require('../models/user');
const Inm = require('../models/inmuebles');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'HelloPeter17122021';

const getProfile = async (req, res, next) => {
	const { token } = req.params;
	try {
		decoded = jwt.verify(token, SECRET_KEY);
		let user = await User.findOne({ email: decoded.email });
		let context = [];
		switch (decoded.rol) {
			case 'CLIENT':
				break;
			case 'ASESOR':
				context = await Inm.find({ 'assesor.email': decoded.email });
				break;
			case 'ADMIN':
				break;
			case 'SECURITY':
				break;
			default:
				break;
		}
		res.status(201).json({
			user: {
				...user,
				name: decoded.name,
				lastname: undefined,
				password: undefined
			},
            context
		});
	} catch (error) {}
};

module.exports = {
    getProfile,
}