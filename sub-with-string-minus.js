module.exports.subEval = (a, b) => eval(`a${String.fromCharCode(45)}b`);
module.exports.subParseFromString =
    (a, b) => a + (
        b < 0 ?
            Math.abs(b) :
            +`${String.fromCharCode(45)}${b}`
    );