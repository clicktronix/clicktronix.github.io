/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by clicktronix on 30.10.16.
	 */
	
	'use strict';
	
	var _controller = __webpack_require__(2);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = new _controller2.default();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _actionScreen = __webpack_require__(3);
	
	var _actionScreen2 = _interopRequireDefault(_actionScreen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Created by clicktronix on 30.10.16.
	                                                                                                                                                           */
	
	var Controller = function Controller() {
	    _classCallCheck(this, Controller);
	
	    var actionScreen = new _actionScreen2.default(40);
	    var $startButton = $('.js-start-button');
	    var $stepButton = $('.js-step-button');
	    var $pauseButton = $('.js-pause-button');
	    var $clearButton = $('.js-clear-button');
	
	    var cells = actionScreen.newEmptyArray();
	    actionScreen.draw(cells);
	
	    function updateAndDraw(event) {
	        if (!event.paused) {
	            cells = actionScreen.updateAllCells(cells);
	            actionScreen.draw(cells);
	        }
	    }
	
	    $startButton.click(function () {
	        createjs.Ticker.addEventListener('tick', updateAndDraw);
	        createjs.Ticker.setPaused(false);
	        createjs.Ticker.setInterval(250);
	    });
	
	    $pauseButton.click(function () {
	        createjs.Ticker.setPaused(true);
	    });
	
	    $stepButton.click(function () {
	        cells = actionScreen.updateAllCells(cells);
	        actionScreen.draw(cells);
	    });
	
	    $clearButton.click(function () {
	        createjs.Ticker.removeEventListener('tick', updateAndDraw);
	        cells = actionScreen.newEmptyArray();
	        actionScreen.draw(cells);
	    });
	};
	
	exports.default = Controller;
	;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _cell = __webpack_require__(4);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Created by clicktronix on 30.10.16.
	                                                                                                                                                           */
	
	var ActionScreen = function ActionScreen(length) {
	    _classCallCheck(this, ActionScreen);
	
	    this.stage = new createjs.Stage('action-screen');
	    this.width = this.height = length;
	};
	
	exports.default = ActionScreen;
	;
	
	ActionScreen.prototype.newEmptyArray = function () {
	    var i = void 0,
	        j = void 0;
	    var cells = [];
	    for (i = 0; i < this.width; i++) {
	        cells[i] = [];
	        for (j = 0; j < this.height; j++) {
	            var cell = new _cell2.default();
	            cells[i][j] = cell;
	        }
	    }
	    return cells;
	};
	
	ActionScreen.prototype.draw = function (cellsArray) {
	    this.stage.removeAllChildren();
	    this.stage.update();
	    var i = void 0,
	        j = void 0;
	    for (i = 0; i < this.width; i++) {
	        for (j = 0; j < this.height; j++) {
	            var currentCell = cellsArray[i][j];
	            if (currentCell.status === currentCell._alive) {
	                currentCell.makeAlive();
	            } else {
	                currentCell.makeDead();
	            }
	            currentCell.shape.x = i * 15;
	            currentCell.shape.y = j * 15;
	            this.stage.addChild(currentCell.shape);
	            currentCell.shape.addEventListener('click', this.toggleCellAt(cellsArray, i, j, currentCell));
	        }
	    }
	    this.stage.update();
	};
	
	ActionScreen.prototype.toggleCellAt = function (cellsArray, i, j) {
	    var self = this;
	    return function () {
	        var currentCell = cellsArray[i][j];
	        if (currentCell.status === currentCell._alive) {
	            currentCell.makeDead();
	        } else {
	            currentCell.makeAlive();
	        }
	        currentCell.shape.x = i * 15;
	        currentCell.shape.y = j * 15;
	        self.stage.update();
	    };
	};
	
	ActionScreen.prototype.getNeighborCount = function (cellsArray, i, j) {
	    var currentCell = cellsArray[i][j];
	    var count = currentCell.status === currentCell._alive ? -1 : 0;
	    for (var w = -1; w <= 1; w++) {
	        for (var h = -1; h <= 1; h++) {
	            if (cellsArray[(this.width + (i + w)) % this.width][(this.height + (j + h)) % this.height].status === currentCell._alive) {
	                count++;
	            }
	        }
	    }
	    return count;
	};
	
	ActionScreen.prototype.cellViability = function (cellsArray, i, j) {
	    var neighborAmount = this.getNeighborCount(cellsArray, i, j);
	    var currentCell = cellsArray[i][j];
	    // if alive
	    if (currentCell.status) {
	        if (neighborAmount < 2 || neighborAmount > 3) {
	            return 0;
	        } else {
	            return 1;
	        }
	    }
	    // if dead
	    if (!currentCell.status && neighborAmount === 3) {
	        return 1;
	    } else {
	        return 0;
	    }
	};
	
	ActionScreen.prototype.updateAllCells = function (cellsArray) {
	    var i = void 0,
	        j = void 0;
	    var newCellsArray = [];
	    for (i = 0; i < this.width; i++) {
	        newCellsArray[i] = [];
	        for (j = 0; j < this.height; j++) {
	            var newCell = new _cell2.default();
	            newCellsArray[i][j] = newCell;
	            if (this.cellViability(cellsArray, i, j)) {
	                newCellsArray[i][j].status = cellsArray[i][j]._alive;
	            } else {
	                newCellsArray[i][j].status = cellsArray[i][j]._dead;
	            }
	        }
	    }
	    return newCellsArray;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by clicktronix on 30.10.16.
	 */
	
	var Cell = function Cell() {
	    _classCallCheck(this, Cell);
	
	    this.status = false;
	    this.shape = new createjs.Shape();
	    this.shape.graphics.beginFill('#666666').beginStroke('#999999').drawRect(0, 0, 15, 15);
	    this._alive = true;
	    this._dead = false;
	};
	
	exports.default = Cell;
	;
	
	Cell.prototype.makeAlive = function () {
	    this.status = this._alive;
	    this.shape.graphics.beginFill('#00ff99').beginStroke('#999999').drawRect(0, 0, 15, 15);
	};
	
	Cell.prototype.makeDead = function () {
	    this.status = this._dead;
	    this.shape.graphics.beginFill('#666666').beginStroke('#999999').drawRect(0, 0, 15, 15);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map