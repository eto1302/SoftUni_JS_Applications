function Sum() {
    let selector1;
    let selector2;
    let resultSelector;

    return {
        init: function (selector1, selector2, resultSelector) {
            firstNum = document.querySelector(selector1);
            secondNum = document.querySelector(selector2);
            result = document.querySelector(resultSelector);
        },

        add: function () {
            result.value = (Number(firstNum.value) + Number(secondNum.value));
        },

        subtract: function(){
            result.value = Number(firstNum.value) - Number(secondNum.value);
        }
    }
}