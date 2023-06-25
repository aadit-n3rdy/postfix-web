var input;
var cur;

const inpCount = 16
var autoplay = false
var autoplayInterval = 0;

window.addEventListener("load", eval_load)

function eval_load() {
	input = document.getElementsByClassName("input-box")
	cur = -1;
	document.getElementById("reset").addEventListener("click", eval_reset)
	document.getElementById("next").addEventListener("click", eval_next)
	document.getElementById("back").addEventListener("click", eval_prev);
	document.getElementById("ffw").addEventListener("click", eval_skip_to_end);
	document.getElementById("play").addEventListener("click", eval_toggle_autoplay);
}

function eval_reset() {
	stack_clear()
	oplist_clear()

	cur = -1
	for (i of input) {
		i.classList.remove("input-box-cur")
	}
}

function eval_getres() {
	if (stackSize == 1) {
		oplist_insert("Result is " + stack_pop())
	}
}

function eval_next() {
	var prev = cur
	do {
		if (cur >= 0) {
			input[cur].classList.remove("input-box-cur")
		}
		cur++;
		if (cur >= 16) {
			break;
		}
		input[cur].classList.add("input-box-cur")
		opt = input[cur].value.trim()
	} while (opt==="")
	if (cur >= 16) {
		eval_getres()
		if (autoplay) {
			eval_toggle_autoplay();
		}
		return false
	}
	const num = parseInt(opt)
	if (num.toString() != opt) {
		if (opt != '/' && opt != '*' && opt != '+' && opt != '-') {
			console.log("ERROR: INVALID OP \"" + opt + "\" AT INP NO. " + cur)
			return false
		}
		console.log("Operation " + opt)
		var a = stack_pop()
		var b = stack_pop()
		if (b == undefined) {
			oplist_insert("ERROR: Stack underflow at input no. " + (cur+1))
			return false
		}
		a = parseInt(a)
		b = parseInt(b)
		let res = 0
		if (opt == "*") {
			res = a * b
		} else if (opt == "/") {
			res = a/b
		} else if (opt == "+") {
			res = a+b
		} else if (opt == "-") {
			res = a-b
		}
		oplist_insert(a.toString() + " " + opt + " " + b.toString() + " = " + res.toString())
		var ret = stack_push(res)
		if (ret < 0) {
			oplist_insert("ERROR: Stack overflow at input no. " + (cur+1))
			return false
		}
	} else {
		console.log("Number " + num)
		var ret = stack_push(num)
		if (ret < 0) {
			oplist_insert("ERROR: Stack overflow at input no. " + (cur+1))
			return false
		}
	}
	return true
}

function eval_prev() {
	if (cur == -1) {
		return;
	}
	var target = cur-1
	while (target >= 0) {
		if (input[target].value.trim() != "") {
			break;
		}
		target--;
	}
	eval_reset()
	while (cur < target) {
		eval_next()
	}
}

function eval_skip_to_end() {
	while (eval_next()) {}
}

function eval_toggle_autoplay() {
	console.log("Toggle autoplay");
	if (autoplay) {
		autoplay = false;
		clearInterval(autoplayInterval);
		const button = document.getElementById("play")
		button.classList.remove("bx-pause");
		button.classList.add("bx-play");
	} else {
		autoplay = true;
		autoplayInterval = setInterval(eval_next, 1000);
		const button = document.getElementById("play")
		button.classList.remove("bx-play");
		button.classList.add("bx-pause");

	}
}
