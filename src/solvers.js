/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  var board = new Board({n: n});
  var noneConflictsTupple = [];

  var verifyPieces = function(row, column) {
    // These two for loops for the first piece
    for (var a = 0; a < board.rows().length; a++) {
      for (var b = 0; b < board.rows()[a].length; b++) {
        board.togglePiece(a, b);
        // These two for loops for the second piece
        for (var i = 0; i < board.rows().length; i++) {
          for (var j = 0; j < board.rows()[i].length; j++) {
            if (board.rows()[i][j] === 1) {
              continue;
            }
            board.togglePiece(i, j);
            if (board.hasAnyRooksConflicts()) {
              board.togglePiece(i, j);
            } else {
              if (a === i && b === j) {
                continue;
              }
              noneConflictsTupple.push([[a, b], [i, j]]);
            }
          }
        }

        for (var i = 0; i < board.rows().length; i++) {
          for (var j = 0; j < board.rows()[i].length; j++) {
            if (board.rows()[i][j] === 1) {
              continue;
            }
            board.togglePiece(i, j);
            if (board.hasAnyRooksConflicts()) {
              board.togglePiece(i, j);
            } else {
              if (a === i && b === j) {
                continue;
              }
              noneConflictsTupple.push([[a, b], [i, j]]);
            }
          }
        }

        board.togglePiece(a, b);
      }
    }
  };

  debugger;
  verifyPieces(0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
