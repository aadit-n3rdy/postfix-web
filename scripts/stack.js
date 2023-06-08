let stackSize = 0
let stack = 0;

window.addEventListener("load", stack_init)

function stack_init() {
	stack = document.getElementById("stack")
	stackSize = 0
}


function stack_clear() {
	for (let i = 0; i < stack.children.length; i++) {
		stack.children[i].textContent = "";
		stack.children[i].classList.remove("stack-elem-non-empty");
	}
	stackSize = 0
}


function stack_pop() {
	if (stackSize == 0) {
		console.log("STACK UNDERFLOW");
		return undefined;
	}
	stackSize -= 1;
	const ret = stack.children[stackSize].textContent;
	stack.children[stackSize].textContent = "";
	stack.children[stackSize].classList.remove("stack-elem-non-empty");

	oplist_insert("Popped " + ret.toString())

	return ret;
}

function stack_push(val) {
	if (stackSize >= 10) {
		return -1;
	}
	stack.children[stackSize].textContent = val;
	stack.children[stackSize].classList.add("stack-elem-non-empty");

	oplist_insert("Pushed " + val.toString())

	stackSize += 1;

	return stackSize;
}
