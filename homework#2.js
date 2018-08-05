const http = require("http")
const url = require("url")
const fs = require('fs')
const StringDecoder = require('string_decoder').StringDecoder
const handlers = require("./handlers")

const router = {

}
const server = http.createServer( (req, res) => {
	const URL = url.parse(req.url, true)
	const pathname = URL.pathname.replace(/^\/+|\/+$/g, '')
	const q = URL.query
	const decoder = new StringDecoder("utf-8")

	let buffer = ""
	req.on("data", data => {
		buffer += decoder.write(data)
	})
	req.on("end", () => {
		const handler = pathname in handlers ? handlers[pathname] : handlers.notFound

		handler(buffer, (status = 200, payload = {}) => {

			res.setHeader('Content-Type', 'application/json')
			res.writeHead(status)
			res.end(JSON.stringify(payload))
		})
	})
})

server.listen(3000, () => {
	console.log("server listening")
})
