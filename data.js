const fs = require("fs")
const path = require("path")

const base = path.resolve(__dirname, "./.data/")

module.exports.read = (dir, file) => {
	const fileName = base + "/" + dir + "/" + file + ".json"
	return new Promise( (resolve, reject) => {
		fs.readFile(fileName, "utf-8", (err, data) => {
			if ( err ) reject(err)
			resolve(JSON.parse(data))
		})
	})
}

module.exports.write = (dir, file, data) => {
	const fileName = base + "/" + dir + "/" + file + ".json"
	return new Promise( (resolve, reject) => {
		fs.writeFile(fileName, JSON.stringify(data), err => {
			if ( err ) reject(err)
			resolve(data)
		})
	})
}

module.exports.rm = (dir, file) => {
	return new Promise( (resolve, reject) => {
		fs.unlink(fileName,  err => {
			if ( err ) reject(err)
			resolve(true)
		})
	})
}

module.exports.exist = (dir, file) => fs.existsSync(base + "/" + dir + "/" + file + ".json")
