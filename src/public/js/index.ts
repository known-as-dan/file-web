import { addFile, joinPaths } from "./api";

function main(): void {
	const request = joinPaths(["/api/content", window.location.pathname]);
	$.getJSON(request, (data) => {
		let file: string;
		for (let i= 0; i < data.length; i++) {
			file = data[i];
			addFile(file);
		}
	});
}

main();