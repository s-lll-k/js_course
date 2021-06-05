'use strict';

let income = 'сдача квартир в аренду';
let mission = 4000000;
let period = 12;


// Lesson04
let showTypeOf = function (data) {
    console.log(data, typeof(data));
};

let money = parseInt(prompt('Ваш месячный доход?'));

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = parseInt(prompt('Во сколько это обойдется?'));

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = parseInt(prompt('Во сколько это обойдется?'));

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
    return amount1 + amount2;
}
getExpensesMonth();

console.log(addExpenses.split(', '));

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}
console.log('Срок достижения цели: ' + getTargetMonth());

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




