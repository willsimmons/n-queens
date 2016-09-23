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


//we just need a single solution...
window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});

  var findSolution = function(currentRow) {
    if (currentRow === n ) {
      solution = board.rows().slice();
      return;
    }
    for (var currentColumn = 0; currentColumn < n; currentColumn++) {
      board.togglePiece(currentRow, currentColumn);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(currentRow, currentColumn);
      } else {  
        findSolution(currentRow + 1);
        if (solution.length > 0) {
          break;
        }
        board.togglePiece(currentRow, currentColumn);
      }
    }
  };

  findSolution(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var findSolution = function(currentRow) {
    if (currentRow === n ) {
      solutionCount++;
      return;
    }
    for (var currentColumn = 0; currentColumn < n; currentColumn++) {
      board.togglePiece(currentRow, currentColumn);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(currentRow, currentColumn);
      } else {  
        findSolution(currentRow + 1);
        board.togglePiece(currentRow, currentColumn);
      }
    }
  };
  
  findSolution(0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var numberOfPieces = 0;
  var solution = [];
  
  var board = new Board({n: n});

  if (n === 2 | n === 3) {
    solution = board.rows().slice();
  } else {
    var findSolution = function(currentRow) {
      if (currentRow === n ) {
        solution = board.rows().slice();
        return;
      }
      for (var currentColumn = 0; currentColumn < n; currentColumn++) {
        board.togglePiece(currentRow, currentColumn);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(currentRow, currentColumn);
        } else {  
          findSolution(currentRow + 1);
          if (solution.length > 0) {
            break; 
          }
          board.togglePiece(currentRow, currentColumn);
        }
      }
    };
    
    findSolution(0);
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  if (n === 2 | n === 3) {
  } else {
    var findSolution = function(currentRow) {
      if (currentRow === n ) {
        solutionCount++;
        return;
      }
      for (var currentColumn = 0; currentColumn < n; currentColumn++) {
        board.togglePiece(currentRow, currentColumn);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(currentRow, currentColumn);
        } else {  
          findSolution(currentRow + 1);
          board.togglePiece(currentRow, currentColumn);
        }
      }
    };
    
    findSolution(0);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
