window.onload = function() {
		/*　ボタンの設定　*/
		document.getElementById("makeColumn").onclick = makeColumn;
		document.getElementById("removeColumn").onclick = removeColumn;
		document.getElementById("makeRow").onclick = makeRow;
		document.getElementById("removeRow").onclick = removeRow;

		makeColumn();
		makeRow();
};

/*　横に追加　*/
function makeColumn() {
		var table = document.getElementById("excel");	//tableを取得

		var cellNumber = table.rows[0].cells.length;	//セル数
		var rowNumber = table.rows.length;				//行数
		for (var i = 0; i < rowNumber; i++) {
				var cell = table.rows[i].insertCell(-1);
		}
		table.rows[0].cells[cellNumber].innerHTML = getColumnNumber(cellNumber - 1);
}

/*　Column　文字列　*/
function getColumnNumber(number) {
		var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");	//これで配列として扱える
		var m = "";
		while (number > 25) {
				m += abc[Math.floor(number / 26) - 1];
				number -= 26
		}
		m += abc[number % 26];
		return m;
}

/*　横を削除　*/
function removeColumn() {
		var table = document.getElementById("excel");

		var cellNumber = table.rows[0].cells.length;
		if (cellNumber <= 2) {
				alert("これ以上削除しないでね");
				return;
		}
		var rowNumber = table.rows.length;
		for (var i = 0; i < rowNumber; i++) {
				table.rows[i].deleteCell(-1);		//cell削除
		}
}
/*　縦に追加　*/
function makeRow() {
		var table = document.getElementById("excel");

		var rowNumber = table.rows.length;
		var row = table.insertRow(-1);					//row追加
		var cellNumber = table.rows[0].cells.length;	//cellの数
		for (var i = 0; i < cellNumber; i++) {
				var cell = row.insertCell(i);			//cell追加
		}
		table.rows[rowNumber].cells[0].innerHTML = rowNumber;
}
/*　縦を削除　*/
function removeRow() {
		var table = document.getElementById("excel");

		var rowNumber = table.rows.length;
		if (rowNumber <= 2) { 
				alert("これ以上削除しないでね");
				return;
		}
		var cellNumber = table.rows[0].cells.length;
		for (var i = 0; i < cellNumber; i++) {
				table.rows[rowNumber - 1].deleteCell(-1);
		}
		table.deleteRow(-1);
}

/*　formの中のボタンに呼び出される　*/
function sendText() {
		var form = document.form;
		//テキストボックスの内容
		var textbox = form.commandText.value;
		//テキストを記号の前と後ろに分ける
		var formula_obj = make_formula_object(textbox);

		let sign_kind = formula_obj.signText;
		if (sign_kind == "") {
				//内容を表示
				let positionText = formula_obj.beforText;
				let tdObject = get_td_object(positionText);
				let cell = tdObject.innerHTML;
				let message = "「" + positionText + "」の値は" + cell + "です";
				document.getElementById("textMessage").innerHTML = message;
		} else if (sign_kind == "=") {
				//左の位置に右の内容を入れる
				let positionText = formula_obj.beforText;
				let text_value = formula_obj.afterText;

				input_content_to_cell(positionText, text_value);
		} else if (sign_kind == "+") {
				//左右の位置にあるセルの内容をたす
				let position1 = formula_obj.beforText;
				let td_obj_1 = get_td_object(position1);
				let cell_1 = parseInt(td_obj_1.innerHTML);
				let position2 = formula_obj.afterText;
				let td_obj_2 = get_td_object(position2);
				let cell_2 = parseInt(td_obj_2.innerHTML);
				console.log(cell_1 + cell_2);
				let sum = cell_1 + cell_2;
				let message = "「" + position1 + "」＋「" + position2 + "」＝" + sum + "です。";
				document.getElementById("textMessage").innerHTML = message;
		}
}

/*　内容をセルに入れる　*/
//　引数　文字列の列と行の内容、内容
//　戻り　なし
function input_content_to_cell(stringPosition, content) {
		let divideObject = make_positionindex_object(stringPosition);
		let rowindex = divideObject.rowindex;
		rowindex = parseInt(rowindex);
		let columnindex = divideObject.columnindex;
		columnindex = getColumnindex(columnindex);

		let table = document.getElementById("excel");
		let tdObject = table.rows[rowindex].cells[columnindex];
		tdObject.innerHTML = content;

		let message = "「" + stringPosition + "」に「" + content + "」を入れました。";
		document.getElementById("textMessage").innerHTML = message;
}

/*　セルの内容を取得する　*/
//　引数　文字列の列と行の内容
//　戻り　tdObject(tdなので、使う時はtdにアクセスして使う)
function get_td_object(textindex) {
		let rowAndColumn = make_positionindex_object(textindex);
		let rowindex = rowAndColumn.rowindex;
		rowindex = parseInt(rowindex);
		let columnindex = rowAndColumn.columnindex;  
		columnindex = getColumnindex(columnindex);

		let table = document.getElementById("excel");
		let tdObject = table.rows[rowindex].cells[columnindex];
		return tdObject ;
}

/*　記号の前後で分ける　*/
function make_formula_object(textbox) {
		textbox = textbox.split("");
		var signKind = "=+";
		signKind = signKind.split("");
		//var arrayText = text.split("");
		var beforText = "";
		var afterText = "";
		var signText = "";

		let index = textbox.length;
		L: for (let i = 0; i < textbox.length; i++) {
				for (let n = 0; n < signKind.length; n++) {
						if (textbox[i] == signKind[n]) {
								index = i;
								break L;
						}
				}
		}

		let text = "";
		//記号の前を入れる
		for (let i = 0; i < index; i++) {
				text += textbox[i];
		}
		beforText= text;
		if (index < textbox.length) {
				//記号
				signText= textbox[index];
				//後半
				text = "";
				for (let i = index + 1; i < textbox.length; i++) {
						text += textbox[i];
				}
				afterText = text;
		}

		return {
				beforText: beforText,
				afterText: afterText,
				signText: signText
		}
}

/*　列要素と行要素に分ける　*/
function make_positionindex_object(positionName) {
		let arrayPositionName = positionName.split("");			//配列に
		var columnindex = "";
		var rowindex = "";

		for (let i = 0; i < arrayPositionName.length; i++) {
				sozai = parseInt(arrayPositionName[i]);
				if (isNaN(sozai)) {
						//文字
						columnindex += arrayPositionName[i];
				} else {
						//数字
						rowindex += arrayPositionName[i];
				}
		}
		return {
				columnindex: columnindex,
				rowindex: rowindex
		}
}

/*　どこの列かを返す　*/
/*　引数　A,Bなどの列の名前
  　戻り　0から始まる番号　*/
function getColumnindex(ColumnPositionName) {
		var abc = "ABCKEFGHIJKLMNOPQRSTUVWXYZ";
		abc = abc.split("");			//配列に

		for (let i = 0; i < 26; i++) {
				if (abc[i] == ColumnPositionName) {
						return i + 1;
				}
		}
		return null;
}
