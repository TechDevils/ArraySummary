function ArraySummary() {
    function processData(name, numbers) {
        let output = {
            name: name,
            min: undefined,
            max: undefined,
            mean: undefined,
            median: undefined,
            mode: undefined,
            range: undefined,
            count: undefined,
            total: undefined
        }

        numbers = numbers.sort((a, b) => {
            return b - a
        });

        output.total = getTotal(numbers);

        output.count = numbers.length;
        var minMax = getMinAndMaxFromInts(numbers);
        output.max = minMax.max;
        output.min = minMax.min;
        output.range = output.max - output.min;
        if (isNaN(output.range)) {
            output.range = undefined;
        }
        var mean = getAverage(numbers);
        output.mean = mean;

        var quartiles = getQuartiles(numbers);
        output.median = quartiles.median;
        output.q1 = quartiles.q1;
        output.q3 = quartiles.q3;

        var mode = getMostCommon(numbers);
        output.mode = mode.top;
        output.modeValues = mode.allValues;

        var outputKeys = Object.keys(output);

        for (let k = 0; k < outputKeys.length; k++) {
            const key = outputKeys[k];
            if (output[key] == undefined) {
                delete output[key];
            }
        }

        return output;
    }

    function getMinAndMaxFromInts(input) {
        var output = {
            max: input[0],
            min: input[input.length - 1]
        };
        return output;
    }

    function getAverage(input) {
        var total = input.reduce((a, cv) => a + cv);
        var output = total / input.length;
        if (isNaN(output)) {
            return undefined;
        }
        return output;
    }

    function getQuartiles(input) {
        var middleArrayValue = Math.floor(input.length / 2);
        var output = {};
        if (input.length % 2 == 0) {
            var leftMiddle = input[middleArrayValue - 1];
            var rightMiddle = input[middleArrayValue];
            output.median = (leftMiddle + rightMiddle) / 2;
        } else {
            output.median = input[middleArrayValue];
        }
        return output;
    }

    function getMostCommon(input) {
        var values = {};
        for (let i = 0; i < input.length; i++) {
            const number = input[i];
            if (values[number]) {
                values[number] += 1;
            } else {
                values[number] = {};
                values[number] = 1;
            }
        }
        var keys = Object.keys(values);
        var top = undefined;
        var maxCount = 0;
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            const checkValue = values[key];
            if (checkValue == 1) {
                continue;
            }
            if (checkValue > maxCount) {
                top = key;
                maxCount = checkValue;
            }
        }
        var output = {};
        output["allValues"] = values;
        output["top"] = top;

        return output;
    }

    function getTotal(input) {
        return input.reduce((p, c, i) => {
            return p += c;
        })
    }

    return {
        processData
    }
}

module.exports = ArraySummary;