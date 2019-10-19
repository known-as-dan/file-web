import { addFile, joinPaths, parentDirectory } from "./file";

export function main(): void {
	if (window.location.pathname !== "/") {
		const parent_directory = parentDirectory(window.location.pathname)
		addFile("<", parent_directory)
	}

	const request = joinPaths(["/api/content", window.location.pathname]);
	$.getJSON(request, (data) => {
		let file: string;
		for (let i= 0; i < data.length; i++) {
			file = data[i];
			addFile(file);
		}
	});
}

$(window).ready(main);