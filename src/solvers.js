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

  if (n === 1) {
    solution.push([1]);
  } else {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, i);
    } 
    if (!board.hasAnyRooksConflicts()) {
      solution = board.rows().slice();
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var validateCombination = function(currentRow) {
    //stop counting solutions
    if (currentRow === n ) {
      solutionCount++;
      return;
    }
    for (var currentColumn = 0; currentColumn < n; currentColumn++) {
      board.togglePiece(currentRow, currentColumn);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(currentRow, currentColumn);
      } else {  
        validateCombination(currentRow + 1);
        board.togglePiece(currentRow, currentColumn);
      }
    }
  };
  
  validateCombination(0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var numberOfPieces = 0;
  var solution = [];
  
  var board = new Board({n: n});

  if (n === 1) {
    solution.push([n]);
  } else if (n >= 4) {
    var combinationList = generateCombination(n);
    var validCombination = [];
    for (var i = 0; i < combinationList.length; i++) {
      var combination = combinationList[i];
      var pieceToggled = 0;
      var tempCombination = [];
      for (var j = 0; j < combination.length; j++) {
        var rowIndex = combination[j][0];
        var colIndex = combination[j][1];

        if (board.rows()[rowIndex][colIndex] === 0) {
          board.togglePiece(rowIndex, colIndex);
          tempCombination.push([rowIndex, colIndex]);
          pieceToggled++;  
        }
      }
      if (pieceToggled === n) {
        if (!board.hasAnyQueenConflicts()) {
          validCombination.push(tempCombination);
          break;
        }
      }
    }
    solution = board.rows().slice();
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
    var validateCombination = function(currentRow) {
      //stop counting solutions
      if (currentRow === n ) {
        solutionCount++;
        return;
      }
      for (var currentColumn = 0; currentColumn < n; currentColumn++) {
        board.togglePiece(currentRow, currentColumn);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(currentRow, currentColumn);
        } else {  
          validateCombination(currentRow + 1);
          board.togglePiece(currentRow, currentColumn);
        }
      }
    };
    
    validateCombination(0);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
