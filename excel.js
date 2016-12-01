window.onload = function() {
		"use strict";
		makeTr();
		makeTd();
};

/*　行を追加　*/
function makeTr() {
		//tableを取得
		var table = document.getElementById("table_id");
		//行を行末に追加
		var row = table.insertRow(-1);

		//セル追加
		var colsNumber = table.rows[0].cells.length;//列数
		var rowNumber = table.rows.length;//行数
		for (var i = 0; i < colsNumber; i++) {
				row.insertCell(-1);
				var cell = table.rows[rowNumber - 1].cells[0];
				cell.innerHTML = rowNumber -1;
		}
}

/*　行を削除　*/
function removeTr() {
		//tableを取得
		var table = document.getElementById("table_id");
		//rowsにtr要素がまとまっている
		var rowNumber = table.rows.length;
		if (rowNumber <= 2) {
				alert("これ以上削除しないでください！");
				return;
		}
		//削除
		table.deleteRow(rowNumber - 1);
}

/*　列を追加　*/
function makeTd() {
		//テーブル取得
		var table = document.getElementById("table_id");
		//行数取得
		var rows = table.rows.length;
		//列数取得
		var cols = table.rows[0].cells.length;
		var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		//各行末尾にセルを追加
		for (var i = 0; i < rows; i++) {
				cell = table.rows[i].insertCell(-1);
		}
		var cell = table.rows[0].cells[cols];
		//cell.innerHTML = abc.slice(cols - 1, cols);
		cell.innerHTML = getchar(cols - 1);
}
/*　横の文字の並び　*/
function getchar(colsNumber) {
		//テーブル取得
		var table = document.getElementById("table_id");
		//準備
		var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var mod = colsNumber % abc.length;
		var c = abc.slice(mod, mod + 1);
		var n = Math.floor(colsNumber / abc.length);

		if (n == 0) {
				return c;
		} else {
				return c + "." + n;
		}
}

/*　列を削除　*/
function removeTd() {
		var table = document.getElementById("table_id");
		//行数取得
		var rowNumber = table.rows.length;
		//列数取得
		var colsNumber = table.rows[0].cells.length;
		if (colsNumber <= 2) {
				alert("これ以上削除しないでください！");
				return;
		}

		for (var i = 0; i < rowNumber; i++) {
				table.rows[i].deleteCell(-1);
		}
}
