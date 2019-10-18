"use strict";

import Hapi from "@hapi/hapi";
import Path from "path";
import { getContent, isDirectory, isFile } from "./file";

/**
 * Initialize HapiJS server
 */
const init: Function = async () => {
	const server = new Hapi.Server({
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
		path: "/{filename*}",
		handler: (request: any, h: any) => {
			const storage_path = "files";
			const doc_path = "public/index.html";

			const request_path = Path.join(storage_path, request.params.filename);
			const full_request_path = Path.join(__dirname, request_path);

			if (isDirectory(full_request_path)) {
				return h.file(doc_path);
			} else if (isFile(full_request_path)) {
				return h.file(request_path);
			}
		}
	});

	server.route({
		method: "GET",
		path: "/public/{filename*}",
		handler: (request: any, h: any) => {
			const file_path = Path.join("public", request.params.filename);
			return h.file(file_path);
		}
	});

	server.route({
		method: "GET",
		path: "/api/content/{path*}",
		handler: (request: any, h: any) => {
			const storage_path = "files";
			const requested_path = request.params.path || "";
			const path = Path.join(__dirname, storage_path, requested_path);
			console.log(path);
			if (isDirectory(path)) {
				const content = getContent(path);
				return content;
			}
		}
	});

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

/**
 * @param args Arguments.
 */
function main(args: Array<string>): number {
	init();

	return 0; // 0 == successful execution
}

// NOTE: This part should ALWAYS be at the end of the file!
const exit_code: number = main([...process.argv]);