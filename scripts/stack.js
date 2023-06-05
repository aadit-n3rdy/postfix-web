
var stackSize = 3;


function stack_pop() {
	if (stackSize == 0) {
		console.log("STACK UNDERFLOW");
		return undefined;
	}
	const stack= document.getElementById("stack")
	stackSize -= 1;
	const ret = stack.children[stackSize].textContent;
	stack.children[stackSize].textContent = "";
	stack.children[stackSize].classList.remove("stack-elem-non-empty");

	const ops_list = document.getElementById("ops-list");
	let op_new = document.createElement("li");
	op_new.appendChild(document.createTextNode("Pop " + ret.toString()));
	ops_list.appendChild(op_new);

	return ret;
}

function stack_push(val) {
	if (stackSize >= 10) {
		console.log("STACK OVERFLOW");
		return undefined;
	}
	const stack = document.getElementById("stack");
	stack.children[stackSize].textContent = val;
	stack.children[stackSize].classList.add("stack-elem-non-empty");

	const ops_list = document.getElementById("ops-list");
	let op_new = document.createElement("li");
	op_new.appendChild(document.createTextNode("Push " + val.toString()));
	ops_list.appendChild(op_new);

	stackSize += 1;
}
