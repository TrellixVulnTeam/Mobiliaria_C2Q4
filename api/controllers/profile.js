const User = require('../models/user');
const Inm = require('../models/inmuebles');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'HelloPeter17122021';

const getProfile = async (req, res, next) => {
	const psw = req.query.psw;
	const token = req.headers.auth;
	try {
		let pass = undefined;
		const decoded = jwt.verify(token, SECRET_KEY);
		const user = await User.findOne({ email: decoded.email });
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

		if (psw === 'true') {
			pass = user.password;
		}

		res.status(201).json({
			user: {
				profile: user.profile,
				id: user._id,
				rol: user.rol,
				name: user.name,
				lastname: user.lastname,
				email: user.email,
				number: user.number,
				description: user.description,
				password: pass
			},
			context
		});
	} catch (error) {
		res.send(error)
	}
};

const postProfile = (req, res, next) => {
	const file = req.file;
	if (file) {
		console.log(`http://localhost:4000/${file.path.substr(4, file.path.length)}`);
		res.json(`http://localhost:4000/${file.path.substr(4, file.path.length)}`);
	}
};

const updateProfile = async (req, res, next) => {
	const { auth } = req.headers;
	const { body } = req;
	const { id } = req.params;
	const user = await User.findOne({ _id: id });
	try {
		const decoded = jwt.verify(auth, SECRET_KEY);
		console.log(user);
		user.name = body.name;
		user.lastname = body.lastname;
		user.number = body.number;
		user.password = body.password;
		user.description = body.description;
		user.profile = body.img;
		await user.save();
		res.json({
			id: user._id,
			profile: user.profile,
			name: user.name,
			lastname: user.lastname,
			rol: user.rol,
			number: user.number,
			email: user.email,
			password: user.password,
			description: user.description,
			expiressIn: decoded.expiressIn
		});
	} catch (error) {
		res.send(error);
	}
};

const getFavorites = async (req, res, next) => {
	const { id } = req.query;
	try {
		if (id !== 'null') {
			const user = await User.findOne({ _id: id });
			const favorites = user.favorites;
			let favs = [];
			let fav;
			for (let e of favorites) {
				fav = await Inm.findOne({ _id: e });
				favs.push(fav);
			}
			res.json(favs);
		} else {
			const { auth } = req.headers;
			const decoded = jwt.verify(auth, SECRET_KEY);
			const user = await User.findOne({ _id: decoded.id });
			const favorites = user.favorites;
			res.json(favorites);
		}
	} catch (error) {
		res.send(error);
	}
};

const addFavorites = async (req, res, next) => {
	const { idInm } = req.body;
	const { auth } = req.headers;
	try {
		const decoded = jwt.verify(auth, SECRET_KEY);
		const user = await User.findOne({ _id: decoded.id });
		if (!user.favorites.includes(idInm)) {
			const inmueble = await Inm.findOne({ _id: idInm });
			inmueble.favs += 1;
			await inmueble.save();
			user.favorites.push(idInm);
			await user.save();
			res.send({ message: 'Añadido a favoritos', icon: 'success' });
		} else {
			res.send({ message: 'ya esta en tus favoritos', icon: 'info' });
		}
	} catch (error) {
		res.send(error);
	}
};

const removeFavorites = async (req, res, next) => {
	const { idInm } = req.query;
	const { auth } = req.headers;
	try {
		const decoded = jwt.verify(auth, SECRET_KEY);
		const inmueble = await Inm.findOne({ _id: idInm });
		console.log(inmueble);
		inmueble.favs -= 1;
		await inmueble.save();
		const user = await User.findOne({ _id: decoded.id });
		user.favorites.splice(user.favorites.indexOf(idInm), 1);
		await user.save();
		res.send({ message: 'Removido de favoritos', icon: 'success' });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

module.exports = {
	getProfile,
	getFavorites,
	postProfile,
	updateProfile,
	addFavorites,
	removeFavorites
};
