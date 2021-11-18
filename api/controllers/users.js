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
			const expiresIn = 24 * 60 * 60;
			const accessToken = jwt.sign({ id: user.id, name: `${user.name} ${user.lastname}` }, SECRET_KEY, {
				expiresIn: expiresIn
			});
			const dataUser = {
				name: user.name,
				email: user.email,
				accessToken: accessToken,
				expiresIn: expiresIn
			};
			// response
			res.send({ dataUser });
		});
		// res.status(200).json({ msg: 'user has been created', user: newUser });
	}
};

const loginUser = async (req, res, next) => {
	const email = req.body.email;
	const userBD = await User.findOne(
		{ email: email }
		//     ,
		//      (err, user) => {
		//     if (err) return res.status(500).send('Server error!');

		//     if (!user) {
		//       // email does not exist
		//       res.status(409).send({ message: 'Something is wrong-' });
		//     } else {
		//       const resultPassword = user.comparePassword(req.body.password);
		//       console.log("#########################", req.body.password)
		//       if (resultPassword) {
		//         const expiresIn = 24 * 60 * 60;
		//         const accessToken = jwt.sign({ id: user.id, name: `${user.name} ${user.lastname}` }, SECRET_KEY, { expiresIn: expiresIn });

		//         const dataUser = {
		//           name: user.name,
		//           email: user.email,
		//           accessToken: accessToken,
		//           expiresIn: expiresIn
		//         }
		//         res.send({ dataUser });
		//       } else {
		//         // password wrong
		//         res.status(409).send({ message: 'Something is wrong' });
		//       }
		//     }
		//   }
	);

	if (!userBD) {
		res.status(404).json({ msg: 'User not found' });
	} else if (!userBD.comparePassword(req.body.password)) {
		res.status(404).json({ msg: 'Password incorrect' });
	} else {
		const expiresIn = 24 * 60 * 60;
		const accessToken = jwt.sign({ id: userBD.id, name: `${userBD.name} ${userBD.lastname}` }, SECRET_KEY, {
			expiresIn: expiresIn
		});

		const dataUser = {
			name: userBD.name,
			email: userBD.email,
			accessToken: accessToken,
			expiresIn: expiresIn
		};
		res.send({ dataUser });
		next();
	}
};

module.exports = {
	signupUser,
	loginUser
};
