const form = (function() {
	const _playersForm = document.querySelector('.form');
	const _playerXInput = document.querySelector('.form__player-x__input');
	const _playerOInput = document.querySelector('.form__player-o__input');
	const playerXNamePlate = document.querySelector('.form__player-x__span');
	const playerONamePlate = document.querySelector('.form__player-o__span');
	const startButton = document.querySelector('.form__buttons__start');
	const restartButton = document.querySelector('.form__buttons__restart');

	//EVENT LISTENERS
	_playerXInput.addEventListener('keyup', () => {
		let _playerXName = _playerXInput.value;
		_setNamePlate(_playerXName, playerXNamePlate);
	});

	_playerOInput.addEventListener('keyup', () => {
		let _playerOName = _playerOInput.value;
		_setNamePlate(_playerOName, playerONamePlate);
	});

	_playersForm.addEventListener('submit', e => {
		e.preventDefault();
	});

	startButton.addEventListener('click', createPlayer);
	startButton.addEventListener('click', _emptyInputFields);

	//FUNCTIONS
	function _setNamePlate(name, namePlate) {
		namePlate.textContent = name.toUpperCase();
	}

	function _emptyInputFields() {
		_playerXInput.value = '';
		_playerOInput.value = '';
	}

	return {
		playerXNamePlate,
		playerONamePlate,
	};
})();

function createPlayer() {
	let playerXFinalName = form.playerXNamePlate.textContent;
	let playerOFinalName = form.playerONamePlate.textContent;
	const playerXSign = 'x';
	const playerOSign = 'o';

	return {
		playerX: [ playerXFinalName, playerXSign ],
		playerO: [ playerOFinalName, playerOSign ],
	};
}

const turnField = (function() {
	const turnSpan = document.querySelector('.turn__span');

	turnSpan.textContent = playerX[0];
})();

const gameBoardContainer = (function() {
	let gameBoard = [ [ '', '', '' ], [ '', '', '' ], [ '', '', '' ] ];
	const topLeftField = document.querySelector('.top-left');
	const topCenterField = document.querySelector('.top-center');
	const topRightField = document.querySelector('.top-right');
	const middleLeftField = document.querySelector('.middle-left');
	const middleCenterField = document.querySelector('.middle-center');
	const middleRightField = document.querySelector('.middle-right');
	const bottomLeftField = document.querySelector('.bottom-left');
	const bottomCenterField = document.querySelector('.bottom-center');
	const bottomRightField = document.querySelector('.bottom-right');
})();

// const gameSettings = (function() {
// 	const _chooseFighterInput = document.querySelector('.header__fieldset__dropdown-fighter');
// 	const _turnSpan = document.querySelector('.header__fieldset__turn__span');
// 	let fighterInput = 'cross';

// 	_chooseFighterInput.addEventListener('change', _setFighterInputStatus);

// 	function _setFighterInputStatus() {
// 		if (_chooseFighterInput.value === 'cross') {
// 			fighterInput = 'cross';
// 		} else if (_chooseFighterInput.value === 'circle') {
// 			fighterInput = 'circle';
// 		}
// 		_setSpan();
// 	}

// 	function _setSpan() {
// 		if (fighterInput === 'cross') {
// 			_turnSpan.textContent = '╳';
// 		} else if (fighterInput === 'circle') {
// 			_turnSpan.textContent = '◯';
// 		}
// 	}

// 	return {
// 		fighterInput,
// 	};
// })();
// console.log(gameSettings);
