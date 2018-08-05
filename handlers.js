
module.exports.sample = (data, cb) => {
	cb(200, {msg: "sample"})
}
module.exports.notFound = (data, cb) => {
	cb(404, {err: "Not found"})
}
