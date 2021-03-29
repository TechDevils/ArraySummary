var summary = require("summary");

function ArraySummary() {
    function processData(name, numbers) {
        var data = summary(numbers);
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

        output.max = data.max();
        output.min = data.min();
        output.mean = data.mean();
        output.median = data.median();
        output.mode = data.mode();
        output.standardDeviation = data.sd();
        output.quartile = data.quartile();
        output.size = data.size();
        output.total = data.sum();
        output.variance = data.variance();

        var outputKeys = Object.keys(output);

        for (let k = 0; k < outputKeys.length; k++) {
            const key = outputKeys[k];
            if (output[key] == undefined) {
                delete output[key];
            }
        }

        return output;
    }

    return {
        processData
    }
}

module.exports = ArraySummary;