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
          row_html += `<td>  </td>`;
        }
        else if (board[i][j] == 2) {
          row_html += `<td>  </td>`;
        }
        else if (board[i][j] == 3) {
          row_html += `<td>  </td>`;
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


function empty_board(){
  board = [[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]]
  return board
}

function drawBoard(board,container){
  document.getElementById(container).innerHTML = generate_board_html(board);
  
}

function main(){
  board = empty_board()
  drawBoard(board, "board")
}