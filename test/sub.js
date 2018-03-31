const assert = require('assert');

const {sub: subWithMinus} = require('../sub-with-minus');
const subWStringMinus = require('../sub-with-string-minus');
const {sub: subBits} = require('../sub-bits');
const subUsingMinusOne = require('../sub-using-minus-one');

function makeDescribe(name, subFunction) {
	
	describe(name, () => {

		it('must sub lesser from bigger', () => {
			assert.equal(subFunction(5, 2), 3);
		});

		it('must sub bigger from lesser', () => {
			assert.equal(subFunction(2, 5), -3);
		});

		it('must sub equal', () => {
			assert.equal(subFunction(5, 5), 0);
		});

		it('must sub negatives lesser from bigger', () => {
			assert.equal(subFunction(-5, -2), -3);
		});

		it('must sub negatives bigger from lesser', () => {
			assert.equal(subFunction(-2, -5), 3);
		});

		it('must sub negatives equal', () => {
			assert.equal(subFunction(-5, -5), 0);
		});

		it('must sub mixed sign lesser from bigger', () => {
			assert.equal(subFunction(5, -2), 7);
			assert.equal(subFunction(2, -5), 7);
		});

		it('must sub mixed sign bigger from lesser', () => {
			assert.equal(subFunction(-2, 5), -7);
			assert.equal(subFunction(-5, 2), -7);
		});

		it('must sub float lesser from bigger', () => {
			assert.equal(subFunction(5.25, 2.75), 2.5);
		});

		it('must sub float bigger from lesser', () => {
			assert.equal(subFunction(2.25, 5.75), -3.5);
		});

		it('must sub float equal', () => {
			assert.equal(subFunction(0.5, 0.5), 0);
		});

		function roundDigits(a, n) {
			const pow10 = Math.pow(10, n);
			return Math.round(a * pow10) / pow10;
		}

		it('must sub infinite fraction float lesser from bigger', () => {
			assert.notEqual(subFunction(0.3, 0.2), 0.1);
			assert.equal(roundDigits(subFunction(0.3, 0.2), 5), 0.1);
		});

		it('must sub infinite fraction bigger from lesser', () => {
			assert.notEqual(subFunction(0.1, 0.3), -0.2);
			assert.equal(roundDigits(subFunction(0.1, 0.3), 5), -0.2);
		});

	});
}

makeDescribe('test with minus', subWithMinus);
makeDescribe('test with eval', subWStringMinus.subEval);
makeDescribe('test with minus char', subWStringMinus.subParseFromString);
makeDescribe('test with bit operations', subBits); // fails with floats
makeDescribe('test using -1, bits', subUsingMinusOne.subBits);
makeDescribe('test using -1, cos(PI)', subUsingMinusOne.subCosPI);
makeDescribe('test using -1, log', subUsingMinusOne.subLog);
