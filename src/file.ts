import FS from "fs";

/**
 * Get a list of elements within a directory.
 */
export function getContent(path: string): Array<string> {
	const content: Array<string> = FS.readdirSync(path);
	return content;
}

export function isDirectory(path: string): boolean {
	const stat = FS.statSync(path);
	return stat.isDirectory();
}

export function isFile(path: string): boolean {
	const stat = FS.statSync(path);
	return stat.isFile();
}