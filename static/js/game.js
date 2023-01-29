reloaded = false;
var current_turn, player_one_id, player_two_id, game_result;
function autoUpdate() {
  myVar = setInterval(getNewBoard, 1000);
}

function displayBoard(board) {
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[0].length; col++) {
      if (board[row][col] == 'RED') {
        document.querySelectorAll('[num="' + col + '"]')[
          row
        ].style.backgroundColor = 'red';
      } else if (board[row][col] == 'BLUE') {
        document.querySelectorAll('[num="' + col + '"]')[
          row
        ].style.backgroundColor = 'yellow';
      }
    }
  }
}
function getNewBoard() {
  const Http = new XMLHttpRequest();
  var game_id_input = document.getElementById('game_id');
  var url = 'http://127.0.0.1:5000/board?game_id=' + game_id_input.value;
  Http.open('GET', url);
  Http.send();
  Http.onload = function () {
    if (Http.readyState == Http.DONE) {
      if (Http.status == 200) {
        data = JSON.parse(Http.response);
        result = JSON.parse(data.game_state);
        current_turn = result['current_turn'];
        player_one_id = result['player_one_id'];
        player_two_id = result['player_two_id'];
        game_result = result['game_result'];
        if (game_result != '') {
          document.getElementById('status').innerHTML = '';
          document.getElementById('status').innerHTML = '';

          document.getElementById('winner').innerHTML =
            'Winner is ' + game_result + ' .The game is over';
            document.getElementById("board").style.display = "none";
            document.getElementById("game-actions").style.display = "block";

        }
        displayBoard(result.board);
      }
    }
  };
}
getNewBoard();

function move(event) {
  console.log('move', player_one_id, player_two_id, current_turn);
  console.log(
    'current cj',
    current_turn == player_one_id,
    current_turn == player_two_id
  );
  if (current_turn == player_one_id) {
    document.getElementById('status').innerHTML = 'Player two turn';
  } else if (current_turn == player_two_id) {
    document.getElementById('status').innerHTML = 'Player one turn';
  }
  const Http = new XMLHttpRequest();

  var url = 'http://127.0.0.1:5000/move';

  Http.open('POST', url);
  Http.setRequestHeader('Content-Type', 'application/json');
  let colNum = event.target.getAttribute('num');
  data = JSON.stringify({ column: colNum });

  Http.responseType = 'text';
  Http.send(data);
}

autoUpdate();