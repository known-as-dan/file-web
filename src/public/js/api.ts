/**
 * Add a file to the list of files.
 * @param file Name of the file.
 */
export function addFile(file: string): void {
	let path = joinPaths([window.location.pathname, file]);

	let file_ref = document.createElement("a");
	file_ref.setAttribute("class", "file");
	file_ref.setAttribute("href", path);
	file_ref.textContent = file;

	let list = document.getElementById("list");
	if (list) {
		list.appendChild(file_ref);
		list.appendChild(document.createElement("br"));
	} else {
		console.log("Couldn't find element with id 'list'.");
	}
}

/**
 * Join an array of paths into one path.
 * @param paths An array of paths to join.
 */
export function joinPaths(paths: Array<string>): string {
	let path = paths.join("/");
	path = path.replace(/\/{2,}/g, "/"); // replace every occurance of multiple "/" with a single "/".
	return path;
}