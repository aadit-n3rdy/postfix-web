let ops_list = 0

window.addEventListener("load", oplist_init);

function oplist_init() {
	ops_list = document.getElementById("ops-list");
}


function oplist_clear() {
	while (ops_list.firstChild) {
		ops_list.removeChild(ops_list.firstChild)
	}
}

function oplist_insert(str) {
	let op_new = document.createElement("li");
	op_new.appendChild(document.createTextNode(str));
	ops_list.appendChild(op_new);
}
