const FS = require("fs");

export function getContent(path: string): Array<string> {
	const content: Array<string> = FS.readdirSync(path);
	return content;
}