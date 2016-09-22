// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {      
      // Get the row array based on the given rowIndex
      return this.rows()[rowIndex].filter(function(piece) {
        return piece === 1;
      }).length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false;
      var context = this;

      this.rows().forEach((row, rowIndex) => {
        result = result || this.hasRowConflictAt(rowIndex);
      });

      return result;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var columnList = [];
      this.rows().forEach((row, rowIndex) => {
        columnList.push(this.rows()[rowIndex][colIndex]);
      });

      return columnList.filter(function(piece) {
        return piece === 1;
      }).length > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      var maxIndex = this.get('n') - 1;

      for (var i = 0; i < maxIndex; i++) {
        result = result || this.hasColConflictAt(i);
      }

      return result;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var maxIndex = this.get('n') - 1;
      var diagonalList = [];
      var numberOfPieces = this.get('n') - (majorDiagonalColumnIndexAtFirstRow < 0 ? Math.abs(majorDiagonalColumnIndexAtFirstRow) : majorDiagonalColumnIndexAtFirstRow);

      if (majorDiagonalColumnIndexAtFirstRow === 0) {
        for (var i = 0; i < maxIndex; i++) {
          diagonalList.push(this.rows()[i][i]);
        }
      } else if (majorDiagonalColumnIndexAtFirstRow > 0) {
        for (var i = 0; i < numberOfPieces; i++) {
          diagonalList.push(this.rows()[i][i + majorDiagonalColumnIndexAtFirstRow]);
        }  
      } else {
        for (var i = 0; i < numberOfPieces; i++) {
          diagonalList.push(this.rows()[i + Math.abs(majorDiagonalColumnIndexAtFirstRow)][i]);
        }
      }     

      return diagonalList.filter(function(piece) {
        return piece === 1;
      }).length > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var result = false;
      var maxDiagonalIndex = this.get('n') - 2;

      for (var i = -maxDiagonalIndex; i <= maxDiagonalIndex; i++) {
        result = result || this.hasMajorDiagonalConflictAt(i);
      } 

      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var maxIndex = this.get('n') - 1;
      var diagonalList = [];
      var numberOfPieces = this.get('n') - (minorDiagonalColumnIndexAtFirstRow < 0 ? Math.abs(minorDiagonalColumnIndexAtFirstRow) : minorDiagonalColumnIndexAtFirstRow);

      if (minorDiagonalColumnIndexAtFirstRow === 0) {
        for (var i = 0; i < maxIndex; i++) {
          diagonalList.push(this.rows()[i][maxIndex - i]);
        }
      } else if (minorDiagonalColumnIndexAtFirstRow > 0) {
        for (var i = 0; i < numberOfPieces; i++) {
          diagonalList.push(this.rows()[i][maxIndex - minorDiagonalColumnIndexAtFirstRow - i]);
        }  
      } else {
        for (var i = 0; i < numberOfPieces; i++) {
          diagonalList.push(this.rows()[i + Math.abs(minorDiagonalColumnIndexAtFirstRow)][maxIndex - i]);
        }  
      }

      return diagonalList.filter(function(piece) {
        return piece === 1;
      }).length > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var result = false;
      var maxDiagonalIndex = this.get('n') - 2;

      for (var i = -maxDiagonalIndex; i <= maxDiagonalIndex; i++) {
        result = result || this.hasMinorDiagonalConflictAt(i);
      } 

      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
