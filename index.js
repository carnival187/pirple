

const http = require("http")
const url = require("url")
const StringDecoder = require('string_decoder').StringDecoder
const fs = require('fs')

const server = http.createServer( (req, res) => {

	const URL = url.parse(req.url, true)
	const pathname = URL.pathname.replace(/^\/+|\/+$/g, '')
	const q = URL.query
	const decoder = new StringDecoder("utf-8")

	let buffer = ""

	const r = {
		status: 404,
		msg: "not found"
	}

	req.on("data", data => {
		buffer += decoder.write(data)
	})
	req.on("end", () => {
		if ( pathname === "hello" )
		{
			r.status = 200
			r.msg = "Hello " + buffer
		}

		res.setHeader('Content-Type', 'application/json')
		res.writeHead(r.status)
		res.end(JSON.stringify(r.msg))
		console.log("Returning this response: ")
	})
})



server.listen(3000, () => {
	console.log("server listening")
})
