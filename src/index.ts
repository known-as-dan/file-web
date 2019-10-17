"use strict";

import { getContent } from "./file";

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
		handler: {
			directory: {
				path: "public"
			}
		}
	});

	server.route({
		method: "GET",
		path: "/{filename}",
		handler: (request: any, h: any) => {
			const images_path = "images";
			return h.file(Path.join(images_path, request.path));
		}
	});

	server.route({
		method: "GET",
		path: "/api/list",
		handler: (request: any, h: any) => {
			const content = getContent(Path.join(__dirname, "images"))
			return content;
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