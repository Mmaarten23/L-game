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
  board = [[3,1,1,0],
           [0,2,1,0],
           [0,2,1,0],
           [0,2,2,3]];
  return board
}


window.onload = function(){
  main()
}


function check_l_valid(board, startRow, startCol, rotation){
  positions = decode_rotation(startRow, startCol, rotation)
  old_count = 0
  for (var i = positions.length - 1; i >= 0; i--) {
    // is it within the board boundries
    if (positions[i][0] < 0 || positions[i][0] > 3 || positions[i][1] < 0 || positions[i][1] > 3){
      return false
    }
    // is it on top of a neutral piece
    if (board[positions[i][0]][positions[i][1]] == 3){
      return false
    }
    // is it on a spot accupied by the opponent
    if (board[positions[i][0]][positions[i][1]] == 2){
      return false
    }
    if (board[positions[i][0]][positions[i][1]] == 4){
      old_count++
    }
  }
  // same position as where it started
  if (old_count == 4) {
    return false
  }
  return true
}


function decode_rotation(startRow, startCol, rotation){
  console.log(rotation)
  if (rotation == "up-left") {
    return [[startRow,startCol],[startRow - 1,startCol],[startRow - 2,startCol],[startRow - 2,startCol - 1]]
  }
  if (rotation == "up-right") {
    return [[startRow,startCol],[startRow - 1,startCol],[startRow - 2,startCol],[startRow - 2,startCol + 1]]
  }
  if (rotation == "right-up") {
    return [[startRow,startCol],[startRow,startCol + 1],[startRow,startCol + 2],[startRow - 1,startCol + 2]]
  }
  if (rotation == "right-down") {
    console.log("test");
    return [[startRow,startCol],[startRow,startCol + 1],[startRow,startCol + 2],[startRow + 1,startCol + 2]]
  }
  if (rotation == "down-left") {
    return [[startRow,startCol],[startRow + 1,startCol],[startRow + 2,startCol],[startRow + 2,startCol - 1]]
  }
  if (rotation == "down-right") {
    return [[startRow,startCol],[startRow + 1,startCol],[startRow + 2,startCol],[startRow + 2,startCol + 1]]
  }
  if (rotation == "left-up") {
    return [[startRow,startCol],[startRow,startCol - 1],[startRow,startCol - 2],[startRow - 1,startCol - 2]]
  }
  if (rotation == "left-down") {
    return [[startRow,startCol],[startRow,startCol - 1],[startRow,startCol - 2],[startRow + 1,startCol - 2]]
  }
}



/*NOTES*/
// rotations = ["up-left","up-right","right-up","right-down","down-left","down-right","left-up","left-down"]

/*
0 = EMPTY
1 = PLAYER_1
2 = PLAYER_2
3 = NEUTRAL_PIECE
4 = OLD
*/