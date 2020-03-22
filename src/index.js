function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    var f = {
        add: '+',
        sub: '-',
        div: '/',
        mlt: '*',
        mod: '%',
        exp: '^'
    };

    f.ooo = [
        [
            [f.mlt],
            [f.div],
            [f.mod],
            [f.exp]
        ],
        [
            [f.add],
            [f.sub]
        ]
    ];

    expr = expr.replace(/[^0-9%^*\/()\-+.]/g, '');

    var output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {

        var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
        re.lastIndex = 0;

        while (re.test(expr)) {
            output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output))
                return output;
            expr = expr.replace(re, output);
        }
    }

    return output;

    function _calculate(a, op, b) {
        a = a * 1;
        b = b * 1;
        switch (op) {
            case f.add:
                return a + b;
            case f.sub:
                return a - b;
            case f.div:
                return a / b;
            case f.mlt:
                return a * b;
            case f.mod:
                return a % b;
            case f.exp:
                return Math.pow(a, b);
            default:
                return null;
        }
    }
}

module.exports = {
    expressionCalculator
}