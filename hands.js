///////////////////////////////////////////////////
//				全カードの定義					 //
//  heart: h, spade: s, clover: c, diamond: d	 //
///////////////////////////////////////////////////
	var card = [
	             ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h"],
	             ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "11s", "12s", "13s"],
	             ["1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "11c", "12c", "13c"],
	             ["1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d", "13d"],
	             ["joker", "joker"]
	             ];

	////////////////////////////
	//	各プレイヤの手札管理  //
	////////////////////////////
	var player = [
	              ["1", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	              ["2", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	              ["3", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	              ["4", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
	              ];

	////////////////
	// 手札を配る //
	////////////////
	var hand;
	var card_pass;	//選択したカードを配ったらfalse
	var p_rand;	//プレイヤ選択
	var gamestart = false;

function deal() {
	if(gamestart==true) {
		document.getElementById("top").innerHTML = ("<font size='6'><strong>すでに開始しています。</strong></font>");
		return false;
	}

	for(var i = 0; i<=12; i++) {
		for(var j = 0; j<=3; j++) {
			card_pass = true;

			while(card_pass) {
				hand = 1;
				p_rand = Math.floor(Math.random() *4);	//0-4乱数
				while(player[p_rand][13] == "") {
					if(player[p_rand][hand] == "") {
						player[p_rand][hand] = card[j][i];
						card_pass = false;
						break;
					}else {
						hand++;
					}
				}
			}
		}
	}

	// jokerを配る
	player[Math.floor(Math.random() *4)][14] = card[4][1];
	gamestart = true;

	document.getElementById("top").innerHTML = ("aiueo");

}