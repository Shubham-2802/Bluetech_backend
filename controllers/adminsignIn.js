const handleadminsignIn = (req,res,bcrypt,db) => {
	const {email, password} = req.body;
	if (!email || !password){
		return res.status(400).json("Unable to signIn")
	}
	db.select('email','hash').from('adminlogin')
	 .where('email','=',email)
	 .then(data => {
	 	const isValid = bcrypt.compareSync(password, data[0].hash);
	 	if(isValid){
	 		return db.select('*').from('adminuser')
	 		.where('email','=',email)
	 		.then(user => {
	 			res.json(user[0])
	 		})
	 		.catch(err => res.status(400).json('No such user'))
	 	} else {
	 		res.status(400).json('wrong credentials')
	 	}
	 })
	 .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleadminsignIn:handleadminsignIn
};