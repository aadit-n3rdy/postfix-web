
window.addEventListener("load", inputInit)

function inputInit() {
	const container = document.getElementById("input-boxes-container")
	for (const box of container.children) {
		box.addEventListener("blur", inputValidate)
	}
}

function inputValidate(evt) {
	const elem = evt.currentTarget;
	const val = elem.value.trim();
	const num = parseInt(val);
	console.log(`${elem.id} is ${num}`);
	if (parseInt(val).toString() == val || val == '/' || val == '*' 
			|| val == '+' || val == '-' || !val) {
		elem.classList.remove("input-invalid")
	} else {
		elem.classList.add("input-invalid")
		console.log(`${elem.id} is invalid`);
	}
	
}
