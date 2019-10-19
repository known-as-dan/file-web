/**
 * Add a file to the list of files.
 */
export function addFile(name: string, path?: string): void {
	path = path || joinPaths([window.location.pathname, name]);
	path = "https://" + joinPaths([window.location.hostname, path]);

	let file_ref = document.createElement("a");
	file_ref.setAttribute("class", "file");
	file_ref.setAttribute("href", path);
	file_ref.textContent = name;
	
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
	path.replace(/\/$/g, "") // gets rid of any "/" at the end of the path.
	return path;
}

export function parentDirectory(path: string): string {
	const parent_path = path.substring(0, path.lastIndexOf("/"));
	return parent_path || ".";
}