

function generate_board_html(board,container){
    let board_html = "";
    let temp_row = "";

    for (let i = 0; i < board.length; i++){
      let row_html = "<tr>";
      for(let j = 0; j < board[i].length; j++){
        if (j == 0){
          row_html += `<td class="sidenr">${i}</td>`
        }
        else {
          if (board[i][j] == 0){
            row_html += `<td class="${container}-none" id=${container}:${i}:${j} onclick="click_square(this,'${container}',${container})">  </td>`;
          }
          else if (board[i][j] == 1) {
            row_html += `<td class="${container}-boat" id=${container}:${i}:${j} onclick="click_square(this,'${container}',${container})" >  </td>`;
          }
          else if (board[i][j] == 2) {
            row_html += `<td class="${container}-nextToABoat" id=${container}:${i}:${j} onclick="click_square(this,'${container}',${container})" >  </td>`;
          }
          else if (board[i][j] == 3) {
            row_html += `<td class="${container}-hit" id=${container}:${i}:${j} ><img src="bang.png"></img></td>`;
          }
          else if (board[i][j] == 4) {
            row_html += `<td class="${container}-deadBoat" id=${container}:${i}:${j} > <img src="skull.png"></img> </td>`;
          }
          else if (board[i][j] == 5) {
            row_html += `<td class="${container}-miss" id=${container}:${i}:${j} ><img src="cross.png"></img></td>`;
          }
        }
      }
      row_html += "</tr>";
      board_html += row_html;
    }

    return `<table class="board">${board_html}</table>`;
}


function generate_empty_board(amount_of_rows, amount_of_cols){
  temp_board = [];
  temp_row = [];
  for (let i = 0; i < amount_of_cols + 1; i++) {
    temp_row.push("heading");
  }
  temp_board.push(temp_row)
  for (var row = 0; row < amount_of_rows; row++) {
    temp_row = [row + 1];
      for (var col = 0; col < amount_of_cols; col++) {
        temp_row.push("0")
      }
      temp_board.push(temp_row);
  }
  return temp_board
}

function drawBoard(board,container){
  boats_dead()
  document.getElementById(container).innerHTML = generate_board_html(board, container);
  
}

window.onload = function(){
  
}


function updateTimer(){
  timer += 1;
  document.getElementById("timer").innerHTML = format_timer(timer);
}


function format_timer(timer) {
  hours = Math.floor(timer/3600);
  timer -= hours * 3600
  minutes = Math.floor(timer/60);
  timer -= minutes * 60;
  formatted_timer = `${hours}:${minutes}:${timer}`;
  return `${hours}:${minutes}:${timer}`
}

