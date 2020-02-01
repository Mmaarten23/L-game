function generate_board_html(board){
    let board_html = "";
    let temp_row = "";


    for (let i = 0; i < board.length; i++){
      let row_html = "<tr>";
      for(let j = 0; j < board[i].length; j++){
        if (board[i][j] == 0){
          row_html += `<td>  </td>`;
        }
        else if (board[i][j] == 1) {
          row_html += `<td> 1 </td>`;
        }
        else if (board[i][j] == 2) {
          row_html += `<td> 2 </td>`;
        }
        else if (board[i][j] == 3) {
          row_html += `<td> 3 </td>`;
        }
        else if (board[i][j] == 4) {
          row_html += `<td>  </td>`;
        }
        else if (board[i][j] == 5) {
          row_html += `<td>  </td>`;
        }
      }
      row_html += "</tr>";
      board_html += row_html;
    }

    return `<table class="board">${board_html}</table>`;
}


function drawBoard(board,container){
  document.getElementById(container).innerHTML = generate_board_html(board);
}

function main(){
  board = initialise_board()
  drawBoard(board, "board")
}

function initialise_board(){
  /*
  3 = NEUTRAL
  1 = PLAYER_1
  */
  board = [[3,1,1,0],
           [0,2,1,0],
           [0,2,1,0],
           [0,2,2,3]]
  return board
}


window.onload = function(){
  main()
}