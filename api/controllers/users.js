const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'HelloPeter17122021';

const signupUser = async (req, res) => {
	const email = req.body.email;
	const userBD = await User.findOne({ email: email });
	if (userBD) {
		res.status(404).json({ msg: 'Email has an account' });
	} else {
		const newUser = new User();
		newUser.name = req.body.name;
		newUser.lastname = req.body.lastname;
		newUser.rol = req.body.rol;
		newUser.number = req.body.number;
		newUser.email = req.body.email;
		newUser.password = newUser.encryptPassword(req.body.password);
		await newUser.save((err, user) => {
			if (err && err.code === 11000) return res.status(409).send('Email already exists');
			if (err) return res.status(500).send('Server error');
			const accessToken = jwt.sign({ id: user.id, name: `${user.name} ${user.lastname}` , email: user.email, rol:user.rol}, SECRET_KEY, {
				expiresIn: '1d'
			});
			const dataUser = {
				name: `${user.name} ${user.lastname}`,
				email: user.email,
				rol: user.rol,
				accessToken: accessToken,
				expiresIn: '1d'
			};
			// response 
			res.send({ dataUser });
		});
		// res.status(200).json({ msg: 'user has been created', user: newUser });
	}
};

const loginUser = async (req, res, next) => {
	const email = req.body.email;
	const userBD = await User.findOne({ email: email });

	if (!userBD) {
		res.status(404).json({ msg: 'User not found' });
	} else if (!userBD.comparePassword(req.body.password)) {
		res.status(404).json({ msg: 'Password incorrect' });
	} else {
		const accessToken = jwt.sign({ id: userBD.id, name: `${userBD.name} ${userBD.lastname}`, email: userBD.email, rol:userBD.rol }, SECRET_KEY, {
			expiresIn: '1d'
		});

		const dataUser = {
			name: `${userBD.name} ${userBD.lastname}`,
			email: userBD.email,
			rol: userBD.rol,
			accessToken: accessToken,
			expiresIn: '1d'
		};
		res.send({ dataUser });
		next();
	}
};

const deleteUser = async (req, res, next)=>{
	const {auth, euser} = req.headers;
	console.log('------------------>',auth)
	console.log('------------------>',euser)
	try {
		const decoded = jwt.verify(auth, SECRET_KEY)
		if(decoded && decoded.rol === 'SECURITY'){
			const userDeleted = await User.findOneAndRemove({email: {$eq: euser}})
			res.status(200).send({message: `${userDeleted.name} ${userDeleted.lastanme} DELETED`});
			console.log(`${userDeleted.name} ${userDeleted.lastanme} DELETED`)
		}
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
}

const validateUser = (req, res, next)=>{
	const token = req.headers.autorization;
	jwt.verify(token, SECRET_KEY, (err, decoded)=>{
		if (err){
			res.status(500).send({agree: false})
			next(err)
		}else{
			console.log(decoded);
			res.status(200).send({agree: true});
		}
	})	
}

const getUsers =  async(req, res, next)=>{
	console.log(req.headers)
	if(req.headers.token){
		const {token} = req.headers
		console.log(token)
		try {
			const decoded = jwt.verify(token, SECRET_KEY)
			const mail = decoded.email
			const user = await User.find({email: {$ne: mail}})
			res.status(200).json(user);

		} catch (error) {
			next(error)
		}

	}
	else{
		console.log('error mi perro')
		res.status(400);
	}
}
module.exports = {
	signupUser,
	loginUser,
	deleteUser,
	validateUser,
	getUsers 
};
