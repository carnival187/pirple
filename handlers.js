const _data = require("./data")
const conf = require("./conf")
const crypto = require("crypto")

const _users = {
	get({query}, cb) {
		if ( _data.exist("users", query.phone) )
		{
			_data.read("users", query.phone)
				.then(res => {
					delete res.password
					cb(200, res)
				})
		}
		else
		{
			cb(404, {err: "users not exist"})
		}
	},
	post({body}, cb) {
		if ( body.phone && typeof body.phone === "string" && body.password && typeof body.password === "string")
		{
			if ( _data.exist("users", body.phone) )
			{
				cb(400, {err: "this users alraedy exist"})
			}
			else
			{
				body.password = crypto.createHmac( "sha256", conf.secret).update(body.password).digest("hex")
				_data.write("users", body.phone, body)
				.then( res => {
					cb(200, res)
				})
			}
		}
		else
		{
			cb(400, {err: "you need provide a phone number and password at least"})
		}
	},
	delete({query}, cb)
	{
		if ( query.phone && _data.exist("users", query.phone) )
		{
			_data.rm("users", query.phone)
			.then(res => {
				cb(202, res)
			})
		}
		else {
			db(400, {err: "user not found."})
		}
	}
}

module.exports.users = (data, cb) => {
	if ( ["GET", "POST", "PUT", "DELETE"].includes(data.method.toUpperCase()))
	{
		_users[data.method.toLowerCase()](data, cb)
	}
	else {
		cb(405, {err: "method not found"})
	}
}

module.exports.notFound = (data, cb) => {
	cb(404, {err: "Not found"})
}
