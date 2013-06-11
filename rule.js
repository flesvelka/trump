var num = 0;
var open = 0;
var suit = null;

//////////////////////////
//中央のカード表示, 更新//
//////////////////////////

function open_card(open, num) {
	this.open = parseInt(open.substr(0, 2));
	this.num = num;
	this.suit = open.substr(2, 3);
}

///////////////////////////////
//			手札の描写	     //
///////////////////////////////

function hand_reload () {
	var i;
	var target = '<img src="./cards/blank.jpg"></img>';
	var p_rand = Math.floor(Math.random() *13);
	for (i = 0; i<p_rand; i++) {
		target += '<img src="./cards/blank.jpg" style="margin-left: -70px"></img>';
	}
	document.getElementById("bottom").innerHTML = (target);
}