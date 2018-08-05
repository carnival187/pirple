const http = require("http")
const url = require("url")
const StringDecoder = require('string_decoder').StringDecoder
const handlers = require("./handlers")
const _data = require("./data")

const parseJson = str => {
	try
	{
		return JSON.parse(str)
	}
	catch(e)
	{
		return {}
	}
}

const server = http.createServer( (req, res) => {
	const URL = url.parse(req.url, true)
	const pathname = URL.pathname.replace(/^\/+|\/+$/g, '')
	const decoder = new StringDecoder("utf-8")

	let buffer = ""
	req.on("data", data => {
		buffer += decoder.write(data)
	})
	req.on("end", () => {
		const body = parseJson(buffer)
		console.log({body})
		const handler = pathname in handlers ? handlers[pathname] : handlers.notFound
		handler({query: URL.query, body, method: req.method}, (status = 200, payload = {}) => {
			res.setHeader('Content-Type', 'application/json')
			res.writeHead(status)
			res.end(JSON.stringify(payload))
		})
	})
})

server.listen(3000, () => {
	console.log("server listening")
})
