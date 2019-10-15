"use strict";

const Hapi = require("@hapi/hapi");
const Path = require("path");

const init: Function = async () => {
	const server = Hapi.server({
		port: 3002,
		host: "localhost",
		routes: {
			files: {
				relativeTo: __dirname
			}
		}
	});

	await server.register(require("inert"));

	server.route({
		method: "GET",
		path: "/{param*}",
		handler: (request: any, h: any) => {
			const images_path = "images";
			return h.file(Path.join(images_path, request.path));
		}
	});

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();