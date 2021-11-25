const game = (function() {
	const startButton = document.querySelector('.form__buttons__start');
	const restartButton = document.querySelector('.form__buttons__restart');

	let playerX;
	let playerO;

	startButton.addEventListener('click', setupGame);
	restartButton.addEventListener('click', restartGame);

	function setupGame() {
		if (formField.checkNames() === false) {
			alert('Please type both players names');
		} else {
			playerX = createPlayers(formField.setNamePlates().playerXName, '╳');
			playerO = createPlayers(formField.setNamePlates().playerOName, '◯');
			formField.setNamePlates();
			formField.setFirstTurn(playerX);
			formField.emptyInputFields();
		}
	}

	function runGame(id) {
		if (formField.checkNames() !== 'game set') {
			alert('Please first type both players names and press "Start"');
		} else if (gameBoard.checkIfFilled(id) === 'already checked') {
			return;
		} else {
			gameBoard.makeMove(id, playerX, playerO);
			gameBoard.setGameFieldTextContent();
			gameBoard.checkIfWin(playerX, playerO);
			gameBoard.checkIfTie();
		}
	}

	function restartGame() {
		gameBoard.cleanGameArray();
		gameBoard.cleanGameField();
		formField.cleanFormField();
		formField.setFirstTurn(playerX);
	}

	return {
		runGame,
		restartGame,
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
		if (_playerXInput.value.trim() && _playerOInput.value.trim()) {
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

	function setFirstTurn(playerX) {
		if (turnSpan.classList.contains('form__player-o__span')) {
			turnSpan.classList.remove('form__player-o__span');
		}
		turnSpan.textContent = playerX.name;
		turnSpan.classList.add('form__player-x__span');
	}

	function setTurn(playerX, playerO) {
		if (turnSpan.textContent === playerX.name) {
			turnSpan.classList.remove('form__player-x__span');
			turnSpan.textContent = playerO.name;
			turnSpan.classList.add('form__player-o__span');
		} else if (turnSpan.textContent === playerO.name) {
			turnSpan.classList.remove('form__player-o__span');
			turnSpan.textContent = playerX.name;
			turnSpan.classList.add('form__player-x__span');
		}
	}

	function exposeCurrentPlayer(playerX, playerO) {
		let currentPlayer;
		if (turnSpan.textContent === playerX.name) {
			currentPlayer = playerX;
		} else if (turnSpan.textContent === playerO.name) {
			currentPlayer = playerO;
		}

		return { currentPlayer };
	}

	function emptyInputFields() {
		_playerXInput.value = '';
		_playerOInput.value = '';
	}

	function cleanFormField() {
		emptyInputFields();
	}

	return {
		checkNames,
		setNamePlates,
		setFirstTurn,
		setTurn,
		emptyInputFields,
		exposeCurrentPlayer,
		cleanFormField,
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

	topLeftField.addEventListener('click', () => {
		game.runGame('tlf');
	});
	topCenterField.addEventListener('click', () => {
		game.runGame('tcf');
	});
	topRightField.addEventListener('click', () => {
		game.runGame('trf');
	});
	middleLeftField.addEventListener('click', () => {
		game.runGame('mlf');
	});
	middleCenterField.addEventListener('click', () => {
		game.runGame('mcf');
	});
	middleRightField.addEventListener('click', () => {
		game.runGame('mrf');
	});
	bottomLeftField.addEventListener('click', () => {
		game.runGame('blf');
	});
	bottomCenterField.addEventListener('click', () => {
		game.runGame('bcf');
	});
	bottomRightField.addEventListener('click', () => {
		game.runGame('brf');
	});

	function checkIfFilled(id) {
		for (let i = 0; i < gameArray.length; i++) {
			const index = gameArray[i].findIndex(field => field.id === id);
			if (index !== -1 && gameArray[i][index].sign !== '') {
				return 'already checked';
			}
		}
	}

	function makeMove(id, playerX, playerO) {
		let filteredArray;
		for (let i = 0; i < gameArray.length; i++) {
			const index = gameArray[i].findIndex(field => field.id === id);
			if (index !== -1) {
				filteredArray = gameArray[i][index];
			}
		}
		if (formField.exposeCurrentPlayer(playerX, playerO).currentPlayer === playerX) {
			filteredArray.sign = '╳';
		} else if (formField.exposeCurrentPlayer(playerX, playerO).currentPlayer === playerO) {
			filteredArray.sign = '◯';
		}
	}

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

	function checkIfWin(playerX, playerO) {
		const winConditions = [
			[ gameArray[0][0].sign, gameArray[0][1].sign, gameArray[0][2].sign ],
			[ gameArray[1][0].sign, gameArray[1][1].sign, gameArray[1][2].sign ],
			[ gameArray[2][0].sign, gameArray[2][1].sign, gameArray[2][2].sign ],
			[ gameArray[0][0].sign, gameArray[1][1].sign, gameArray[2][2].sign ],
			[ gameArray[0][2].sign, gameArray[1][1].sign, gameArray[2][0].sign ],
			[ gameArray[0][0].sign, gameArray[1][0].sign, gameArray[2][0].sign ],
			[ gameArray[0][1].sign, gameArray[1][1].sign, gameArray[2][1].sign ],
			[ gameArray[0][2].sign, gameArray[1][2].sign, gameArray[2][2].sign ],
		];

		const win = winConditions.some(
			array => array[0] !== '' && array[1] !== '' && array[2] !== '' && array[0] === array[1] && array[0] === array[2]
		);

		if (win) {
			const winner = formField.exposeCurrentPlayer(playerX, playerO).currentPlayer;
			setTimeout(() => {
				congratulateWinner(winner);
			}, 10);
		} else {
			formField.setTurn(playerX, playerO);
		}
	}

	function congratulateWinner(winner) {
		alert(`${winner.name} won! Congratulations!`);
		game.restartGame();
	}

	function checkIfTie() {
		const flattenedArray = gameArray.flat();
		const emptyFields = flattenedArray.filter(field => field.sign === '');
		setTimeout(() => {
			if (emptyFields.length === 0) {
				alert('TIE');
				game.restartGame();
			}
		});
	}

	function cleanGameArray() {
		gameArray = [
			[ { sign: '', id: 'tlf' }, { sign: '', id: 'tcf' }, { sign: '', id: 'trf' } ],
			[ { sign: '', id: 'mlf' }, { sign: '', id: 'mcf' }, { sign: '', id: 'mrf' } ],
			[ { sign: '', id: 'blf' }, { sign: '', id: 'bcf' }, { sign: '', id: 'brf' } ],
		];
	}

	function cleanGameField() {
		topLeftField.textContent = '';
		topCenterField.textContent = '';
		topRightField.textContent = '';
		middleLeftField.textContent = '';
		middleCenterField.textContent = '';
		middleRightField.textContent = '';
		bottomLeftField.textContent = '';
		bottomCenterField.textContent = '';
		bottomRightField.textContent = '';
	}

	return {
		checkIfFilled,
		makeMove,
		setGameFieldTextContent,
		checkIfWin,
		checkIfTie,
		cleanGameArray,
		cleanGameField,
	};
})();
