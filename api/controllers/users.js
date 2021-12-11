const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {transporter} = require('../config/mailer')
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
	try {
		const decoded = jwt.verify(auth, SECRET_KEY)
		if(decoded && decoded.rol === 'SECURITY'){
			const userDeleted = await User.findOneAndRemove({email: {$eq: euser}})
			res.status(200).send({message: `${userDeleted.name} ${userDeleted.lastanme} DELETED`});
			console.log(`${userDeleted.name} ${userDeleted.lastanme} DELETED`)
		}
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
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

const sendTokenPass = async (req, res, next)=>{
	const {email} = req.query;
	try {
		const user = await User.findOne({email: email})
		if (user){
			const token = jwt.sign({id:user._id, email: user.email}, SECRET_KEY, {expiresIn: '30m'})
			await transporter.sendMail({
				from: '"Forgot password 👻" <no-reply@architects.com>', // sender address
				to: email, // list of receivers
				subject: "Forgot Password ✔", // Subject line
				html: `
				<h2>Olvidaste tu contraseña</h2>
				<p>hola <b>${user.name} ${user.lastname}</b> hisciste una solicitud para recuperar la contraseña, ingresa al siguiente link antes de que pasen 30 minutos para restablecerla:</p>
				<a href="http://localhost:4200/auth/login/${token}">recovery password</a>
				<p>o sino pega este link en tu navegador <a href="http://localhost:4200/auth/login/${token}">http://localhost:4200/auth/login/${token}</a> </p>
				<p>Cuidate</p>
				`, // html body
			  });
			res.send({isSended: true, message: `revisa tu correo ${user.email} en los proximos 30 minutos`})
		}else{
			res.send({isSended: false, message: "No se econtró el correo ingresado"})
		}
	} catch (error) {
		res.send(error)
	}

}

const getUsers =  async(req, res, next)=>{
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

const verifyTokenPass = async (req, res, next)=>{
	const {token} = req.query;
	try {
		const decoded = jwt.verify(token, SECRET_KEY)
		const user = await User.findById(decoded.id)
		if(user){
			res.send({value: true, id: user._id})
		}else{
			res.send({value: false})
		}
		
	} catch (error) {
		res.send(error)
	}
}

const changePassword = async(req, res, next)=>{
	const { newPassword,idUser } = req.body
	try {
		const user = await User.findById(idUser)
		user.password = user.encryptPassword(newPassword)
		console.log('---------------------->',user.password)
		await user.save()
		res.send({message: 'Cambio de contraseña exitoso'})
	} catch (error) {
		res.send(error)
	}
}

module.exports = {
	signupUser,
	loginUser,
	deleteUser,
	validateUser,
	getUsers,

	sendTokenPass,
	verifyTokenPass,
	changePassword
};
