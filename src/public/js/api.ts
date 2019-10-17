function addFile(file: string): void {
	let file_ref = document.createElement("a");
	file_ref.setAttribute("class", "file");
	file_ref.setAttribute("href", file);
	file_ref.textContent = file;

	let list = document.getElementById("list");
	if (list) {
		list.appendChild(file_ref);
		list.appendChild(document.createElement("br"));
	} else {
		console.log("Couldn't find element with id 'list'.");
	}
}