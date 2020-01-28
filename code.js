boats = [];
bot_plays = [];
var allowed = true;
var formatted_timer = 0;
var moves = 0;
machine_gun_player = false;
machine_gun_player_moves = 0;
not_machine_gun_moves = 0;
not_machine_gun_moves_bot = 0;


function generate_board_html(board,container){
    let board_html = "";
    let temp_row = "";
    alphabet = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (i = 0; i < board[0].length; i++){
      temp_row += `<th>${alphabet[i]}</th>`;
    }
    board_html += temp_row;

    for (let i = 1; i < board.length; i++){
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


function place_boat(board, length_of_boat, container){
  placed_boat = false;
  for (var i = 0; i < 50; i++) {
    if (!placed_boat){
      orientation = set_direction()

      if (orientation == "horizontal"){
        //horizontal
        random_row = generate_random_number_between(1, board.length);
        random_col = generate_random_number_between(1, board[random_row].length - length_of_boat + 1);
      }
      else {
        //vertical
        random_row = generate_random_number_between(1, board.length - length_of_boat + 1);
        random_col = generate_random_number_between(1, board[random_row].length);
      }
      if (check_squares_for_placing_boat(board, length_of_boat, orientation, random_row, random_col, container)){
        placed_boat = true;
        tmp_boat = [];
        if (orientation == "horizontal"){
          for (var i = random_col; i < random_col + length_of_boat; i++) {
            tmp_cell = [container];
            tmp_cell.push(random_row);
            tmp_cell.push(i);
            board[random_row][i] = 1;
            tmp_boat.push(tmp_cell)
          }
          boats.push(tmp_boat)
        }
        else {
          for (var i = random_row; i < random_row + length_of_boat; i++) {
            tmp_cell = [container];
            tmp_cell.push(i);
            tmp_cell.push(random_col);
            board[i][random_col] = 1;
            tmp_boat.push(tmp_cell);
          }
          boats.push(tmp_boat);
        }
        set_next_to_squares(board, length_of_boat, orientation, random_row, random_col)
      }
    }
    else {
      break;
    }
  }
  drawBoard(board, container);
  return placed_boat
}


function check_squares_for_placing_boat(board, length_of_boat, orientation, start_row, start_col, container) {
  allow = true
  if (orientation == "horizontal"){
    for (var i = start_col; i < start_col + length_of_boat; i++) {
      
      type = document.getElementById(`${container}:${start_row}:${i}`).className;
      if (type == `${container}-boat` || type == `${container}-nextToABoat`){
        allow = false
      } 
    }
  }
  else {
    for (var i = start_row; i < start_row + length_of_boat; i++) {
      
      type = document.getElementById(`${container}:${i}:${start_col}`).className;
      if (type == `${container}-boat` || type == `${container}-nextToABoat`){
        allow = false
      } 
    }
  }
  return allow
}


function set_next_to_squares(board, length_of_boat, orientation, start_row, start_col) {
  if (orientation == "horizontal"){
    set_next_to_horizontal(board, length_of_boat, start_row, start_col)
  }
  else {
    set_next_to_vertical(board, length_of_boat, start_row, start_col)
  }
}


function generate_random_number_between(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}


function drawBoard(board,container){
  boats_dead()
  document.getElementById(container).innerHTML = generate_board_html(board, container);
  
}
function check_win(board, container){
  winner = true;

  for (var row = 1; row < board.length; row++) {
    for (var col = 1; col < board[row].length; col++) {
      if (board[row][col] == 1){
        winner = false;
      }
    }
  }
  if (winner && container == "boardA"){
    alert("You lost")
  }
  else if (winner && container == "boardB"){
    alert(`You won in ${formatted_timer} and ${moves} moves!`)
  }
  return winner
}

function generateTwoBoards(rows, cols){
  boardA = generate_empty_board(rows,cols);
  boardB = generate_empty_board(rows,cols);
  drawBoard(boardA,"boardA");
  drawBoard(boardB,"boardB");
}


window.onload = function(){
  document.getElementById("gun").disabled = false;
  boats = [];
  timer = 0;
  generateTwoBoards(10,10);
  setInterval(updateTimer, 1000);
  generate_boats();
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


function generate_boats() {
  placedBoatsA = place_boats_A();
  placedBoatsB = place_boats_B();
  if (!(placedBoatsA && placedBoatsB)){
    location.reload();
  }
  
}


function place_boats_A(){
  return (place_boat(boardA,6, "boardA") &&
  place_boat(boardA,4, "boardA") &&
  place_boat(boardA,4, "boardA") &&
  place_boat(boardA,3, "boardA") &&
  place_boat(boardA,3, "boardA") &&
  place_boat(boardA,3, "boardA") &&
  place_boat(boardA,2, "boardA") &&
  place_boat(boardA,2, "boardA") &&
  place_boat(boardA,2, "boardA") &&
  place_boat(boardA,2, "boardA"))
}

function place_boats_B(){
  return (place_boat(boardB,6, "boardB") &&
  place_boat(boardB,4, "boardB") &&
  place_boat(boardB,4, "boardB") &&
  place_boat(boardB,3, "boardB") &&
  place_boat(boardB,3, "boardB") &&
  place_boat(boardB,3, "boardB") &&
  place_boat(boardB,2, "boardB") &&
  place_boat(boardB,2, "boardB") &&
  place_boat(boardB,2, "boardB") &&
  place_boat(boardB,2, "boardB"))
}

function set_direction(){
  int = generate_random_number_between(0,2);
  if (int == 1){
    orientation = "horizontal";
  }
  else {
    orientation = "vertical";
  }
  return orientation
}

function set_next_to_horizontal(board, length_of_boat, start_row, start_col){
  if (start_row > 1){
    for (i = start_col; i < start_col + length_of_boat; i++) {    //boat is not located on the top row
      board[start_row - 1][i] = 2;
    }
  }
  if (start_row < board.length - 1){                              //boat is not located on the bottom row
      for (i = start_col; i < start_col + length_of_boat; i++) {
        board[start_row + 1][i] = 2;
      }
    }
  if (start_col > 1){                                             //boat is not leaning against left edge
    board[start_row][start_col - 1] = 2;
  }
  if (start_col + length_of_boat < board[start_row].length){       //boat is not leaning against right edge
    board[start_row][start_col + length_of_boat] = 2;
  }
  
  if (start_row > 1 && start_col > 1){                                                              //upper left square exists
    board[start_row - 1][start_col - 1] = 2;
  }
  if (start_row > 1 && start_col + length_of_boat < board[start_row].length){                       //upper right square exists
    board[start_row - 1][start_col + length_of_boat] = 2;
  }
  if (start_row < board.length - 1 && start_col > 1){                                               //lower left square exists
    board[start_row + 1][start_col - 1] = 2;
  }
  if (start_row < board.length - 1 && start_col + length_of_boat < board[start_row].length){        //lower right square exists
    board[start_row + 1][start_col + length_of_boat] = 2;
  }
}


function set_next_to_vertical(board, length_of_boat, start_row, start_col){
  if (start_col > 1) {                                            //boat is not located in the first column
    for (i = start_row; i < start_row + length_of_boat; i++) {
      board[i][start_col - 1] = 2;
    }
  }
  if (start_col < board[start_row].length - 1) {                      //boat is not located in the last column
    for (i = start_row; i < start_row + length_of_boat; i++) {
      board[i][start_col + 1] = 2;
    }
  }
  if (start_row > 1){                                             //boat does not touch the top
    board[start_row - 1][start_col] = 2;
  }
  if (start_row + length_of_boat < board.length){                 //boat does not touch the bottom
    board[start_row + length_of_boat][start_col] = 2;
  }
  if (start_col > 1 && start_row > 1){                                                      //upper left square exists
    board[start_row - 1][start_col - 1] = 2;
  }
  if (start_col > 1 && start_row + length_of_boat < board.length){                          //bottom left square exists
    board[start_row + length_of_boat][start_col - 1] = 2;
  }
  if (start_row > 1 && start_col < board[start_row].length - 1){                                //upper right square exists
    board[start_row - 1][start_col + 1] = 2;
  } 
  if (start_col < board[start_row].length - 1 && start_row + length_of_boat < board.length) {   //bottom right square exist
    board[start_row + length_of_boat][start_col + 1] = 2;
  }

}

function reset() {
  location.reload()
}


function click_square(cell, container, board) {
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;

  if (container == "boardB"){
    new_class(row, col, board, container);
    drawBoard(board, container);
    if (!check_win(board, container)){
      if (!machine_gun_player){
        not_machine_gun_moves_bot++;
        if (not_machine_gun_moves_bot == 4){
          machine_gun_bot();
          not_machine_gun_moves_bot = 0;
        }
        else{
          bot_play();
        }
        not_machine_gun_moves++;
        if (not_machine_gun_moves == 3){
          document.getElementById('gun').disabled = false;
        } 
      }
      else{
        machine_gun_player_moves++;
        if (machine_gun_player_moves == 5){
          machine_gun_player = false;
          machine_gun_player_moves = 0;
        }
      }
    }
    moves++;

  }
  else {
    alert("The bot plays here ;-)")
  }
}

function new_class(row, col, board, container){
  var type = board[row][col];
  if (type == 0 || type == 2) {
    board[row][col] = 5;
  }
  else if (type == 1){
    board[row][col] = 3;
  }
}

function bot_play(){
  var random_row = generate_random_number_between(1, boardB.length);
  var random_col = generate_random_number_between(1, boardB[random_row].length);
  while (has_played(`${random_row}:${random_col}`)){
    random_row = generate_random_number_between(1, boardB.length);
    random_col = generate_random_number_between(1, boardB[random_row].length);
  }
  bot_plays.push(`${random_row}:${random_col}`);
  new_class(random_row,random_col, boardA, "boardA");
  drawBoard(boardA, "boardA");
  return check_win(boardA, "boardA")
}


function has_played(string){
  for (var i = bot_plays.length - 1; i >= 0; i--) {
    if (bot_plays[i] == string){
      return true
    } 
  }
  return false
}



function boats_dead(){
  for (var boat = 0; boat < boats.length; boat++) {
    dead = true;
    for (cell_of_boat of boats[boat]){
      if (cell_of_boat[0] == ("boardA")){
        if (boardA[cell_of_boat[1]][cell_of_boat[2]] == 1){
          dead = false
        }
      }
      else if (cell_of_boat[0] == ("boardB")){
        if (boardB[cell_of_boat[1]][cell_of_boat[2]] == 1){
          dead = false
        }
      }
    }
    if (dead == true){
      for (cell_of_boat of boats[boat]){
        if (cell_of_boat[0] == ("boardA")){
          boardA[cell_of_boat[1]][cell_of_boat[2]] = 4;
        }
        else if (cell_of_boat[0] == ("boardB")){
          boardB[cell_of_boat[1]][cell_of_boat[2]] = 4;
        }
      }
    }
  }
}


function machine_gun(){
    machine_gun_player = true;
    document.getElementById('gun').disabled = true;
    not_machine_gun_moves = 0;
}

function machine_gun_bot(){
  lp = 0;
  while (lp < 5){
    if (bot_play()){
      lp = 5;
    }
    console.log(lp)
    lp++ 
  }
}
