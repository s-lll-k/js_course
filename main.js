'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    addExpenses,
    income = 'сдача квартир в аренду',
    mission = 4000000,
    period = 12;


let start = function () {
    do {
        money = prompt('Ваш месячный доход?');
    } 
    while (!isNumber(money));
};

start();

// Lesson04
let showTypeOf = function (data) {
    console.log(data, typeof(data));
};

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let deposit = confirm('Есть ли у вас депозит в банке?');


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [],
    amount = [];

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');

        while (!isNumber(amount[i])) {
            amount[i] = prompt('Во сколько это обойдется?');
        }
        sum +=  parseInt(amount[i]);
    }

    return sum;
}
let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

console.log(addExpenses.toLowerCase().split(', '));

function getAccumulatedMonth() {
    return money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}
if (getTargetMonth() < 0) {
    console.log('Цель не будет достигнута!');
} else {
    console.log('Срок достижения цели: ' + getTargetMonth());
}

let budgetDay = Math.floor(accumulatedMonth / 30);
let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
        return('К сожалению у вас уровень дохода ниже среднего');    
    } else {
        return('Что то пошло не так');
    }
};

console.log('Бюджет на день: ' + budgetDay);

console.log(getStatusIncome());