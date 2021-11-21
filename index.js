const game = (function() {
	const startButton = document.querySelector('.form__buttons__start');

	startButton.addEventListener('click', setup);

	function setup() {
		if (formField.checkNames() === false) {
			alert('Please type both players names');
		} else {
			let playerX = createPlayers(formField.setNamePlates().playerXName, 'x');
			let playerO = createPlayers(formField.setNamePlates().playerOName, 'o');
			formField.setNamePlates();
			formField.setTurn(playerX, playerO);
			formField.emptyInputFields();
		}
	}

	function run(id) {
		if (formField.checkNames() !== 'game set') {
			alert('Please first type both players names and press "Start"');
		} else {
			gameBoard.makeMove(id);
		}
	}

	return {
		run,
	};
})();

function createPlayers(name, sign) {
	return { name: name, sign: sign };
}

const formField = (function() {
	const playerXNamePlate = document.querySelector('.form__player-x__span');
	const playerONamePlate = document.querySelector('.form__player-o__span');
	const _playersForm = document.querySelector('.form');
	const _playerXInput = document.querySelector('.form__player-x__input');
	const _playerOInput = document.querySelector('.form__player-o__input');
	const turnSpan = document.querySelector('.turn__span');

	_playersForm.addEventListener('submit', e => {
		e.preventDefault();
	});
	_playersForm.addEventListener('click', e => {
		e.preventDefault();
	});

	function checkNames() {
		if (_playerXInput.value && _playerOInput.value) {
			return true;
		} else if (turnSpan.textContent !== '') {
			return 'game set';
		} else {
			return false;
		}
	}

	function setNamePlates() {
		let playerXName = _playerXInput.value.toUpperCase();
		let playerOName = _playerOInput.value.toUpperCase();
		playerXNamePlate.textContent = playerXName;
		playerONamePlate.textContent = playerOName;
		return { playerXName, playerOName };
	}

	function setTurn(playerX, playerO) {
		let currentPlayer;
		if (turnSpan.textContent === '') {
			turnSpan.textContent = playerX.name;
			turnSpan.classList.add('form__player-x__span');
			currentPlayer = playerX;
		} else if (turnSpan.textContent === playerX.name) {
			turnSpan.classList.remove('form__player-x__span');
			turnSpan.textContent = playerO.name;
			turnSpan.classList.add('form__player-o__span');
			currentPlayer = playerO;
		} else if (turnSpan.textContent === playerO.name) {
			turnSpan.classList.remove('form__player-o__span');
			turnSpan.textContent = playerX.name;
			turnSpan.classList.add('form__player-x__span');
			currentPlayer = playerX;
		}
		return { currentPlayer };
	}

	function emptyInputFields() {
		_playerXInput.value = '';
		_playerOInput.value = '';
	}

	return {
		checkNames,
		setNamePlates,
		setTurn,
		emptyInputFields,
	};
})();

const gameBoard = (function() {
	let gameArray = [
		[ { sign: '', id: 'tlf' }, { sign: '', id: 'tcf' }, { sign: '', id: 'trf' } ],
		[ { sign: '', id: 'mlf' }, { sign: '', id: 'mcf' }, { sign: '', id: 'mrf' } ],
		[ { sign: '', id: 'blf' }, { sign: '', id: 'bcf' }, { sign: '', id: 'brf' } ],
	];
	const topLeftField = document.querySelector('.top-left');
	const topCenterField = document.querySelector('.top-center');
	const topRightField = document.querySelector('.top-right');
	const middleLeftField = document.querySelector('.middle-left');
	const middleCenterField = document.querySelector('.middle-center');
	const middleRightField = document.querySelector('.middle-right');
	const bottomLeftField = document.querySelector('.bottom-left');
	const bottomCenterField = document.querySelector('.bottom-center');
	const bottomRightField = document.querySelector('.bottom-right');
	let id;

	topLeftField.addEventListener('click', () => {
		game.run('tlf');
	});
	topCenterField.addEventListener('click', () => {
		game.run('tcf');
	});
	topRightField.addEventListener('click', () => {
		game.run('trf');
	});
	middleLeftField.addEventListener('click', () => {
		game.run('mlf');
	});
	middleCenterField.addEventListener('click', () => {
		game.run('mcf');
	});
	middleRightField.addEventListener('click', () => {
		game.run('mrf');
	});
	bottomLeftField.addEventListener('click', () => {
		game.run('blf');
	});
	bottomCenterField.addEventListener('click', () => {
		game.run('bcf');
	});
	bottomRightField.addEventListener('click', () => {
		game.run('brf');
	});

	function setGameFieldTextContent() {
		topLeftField.textContent = gameArray[0][0].sign;
		topCenterField.textContent = gameArray[0][1].sign;
		topRightField.textContent = gameArray[0][2].sign;
		middleLeftField.textContent = gameArray[1][0].sign;
		middleCenterField.textContent = gameArray[1][1].sign;
		middleRightField.textContent = gameArray[1][2].sign;
		bottomLeftField.textContent = gameArray[2][0].sign;
		bottomCenterField.textContent = gameArray[2][1].sign;
		bottomRightField.textContent = gameArray[2][2].sign;
	}

	function makeMove(id) {
		let filteredArray;
		for (let i = 0; i < gameArray.length; i++) {
			const index = gameArray[i].findIndex(field => field.id === id);
			if (index !== -1) {
				filteredArray = gameArray[i][index];
			}
		}
		if (formField.setTurn().currentPlayer === playerX) {
			console.log('hi');
		}
	}

	return {
		makeMove,
	};
})();

// const form = (function() {
// 	const _playersForm = document.querySelector('.form');
// 	const _playerXInput = document.querySelector('.form__player-x__input');
// 	const _playerOInput = document.querySelector('.form__player-o__input');
// const playerXNamePlate = document.querySelector('.form__player-x__span');
// const playerONamePlate = document.querySelector('.form__player-o__span');
// 	const startButton = document.querySelector('.form__buttons__start');
// 	const restartButton = document.querySelector('.form__buttons__restart');

// 	//EVENT LISTENERS
// 	_playerXInput.addEventListener('keyup', () => {
// 		let _playerXName = _playerXInput.value;
// 		_setNamePlate(_playerXName, playerXNamePlate);
// 	});

// 	_playerOInput.addEventListener('keyup', () => {
// 		let _playerOName = _playerOInput.value;
// 		_setNamePlate(_playerOName, playerONamePlate);
// 	});

// 	_playersForm.addEventListener('submit', e => {
// 		e.preventDefault();
// 	});

// 	startButton.addEventListener('click', createPlayer);
// 	startButton.addEventListener('click', _emptyInputFields);

// 	//FUNCTIONS
// 	function _setNamePlate(name, namePlate) {
// 		namePlate.textContent = name.toUpperCase();
// 	}

// 	function _emptyInputFields() {
// 		_playerXInput.value = '';
// 		_playerOInput.value = '';
// 	}

// 	return {
// 		playerXNamePlate,
// 		playerONamePlate,
// 		startButton,
// 	};
// })();

// function createPlayer() {
// 	let playerXFinalName = form.playerXNamePlate.textContent;
// 	let playerOFinalName = form.playerONamePlate.textContent;
// 	const playerXSign = 'x';
// 	const playerOSign = 'o';

// 	// DELETE
// 	const turnSpan = document.querySelector('.turn__span');

// 	turnSpan.textContent = playerXFinalName;

// 	//

// 	return [ { name: playerXFinalName, sign: playerXSign }, { name: playerOSign, sign: playerOSign } ];
// }

// const turn = function() {
// 	const turnSpan = document.querySelector('.turn__span');

// 	function setTurn() {
// 		turnSpan.textContent = createPlayer()[0];
// 	}
// };

// const gameBoardContainer = (function() {
// let gameBoard = [ [ '', '', '' ], [ '', '', '' ], [ '', '', '' ] ];
// const topLeftField = document.querySelector('.top-left');
// const topCenterField = document.querySelector('.top-center');
// const topRightField = document.querySelector('.top-right');
// const middleLeftField = document.querySelector('.middle-left');
// const middleCenterField = document.querySelector('.middle-center');
// const middleRightField = document.querySelector('.middle-right');
// const bottomLeftField = document.querySelector('.bottom-left');
// const bottomCenterField = document.querySelector('.bottom-center');
// const bottomRightField = document.querySelector('.bottom-right');
// })();
