'use strict';

let money = 43000;
let income = 'сдача квартир в аренду';
let addExpenses = 'Кафе, такси, интернет, Рассрочка, Продукты';
let deposit = false;
let mission = 4000000;
let period = 12;

console.log(typeof(money), typeof(income), typeof(deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев \nЦель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = 1450;

console.log(budgetDay);



// lesson03

money = parseInt(prompt('Ваш месячный доход?'));

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = parseInt(prompt('Во сколько это обойдется?'));

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = parseInt(prompt('Во сколько это обойдется?'));

let budgetMounth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' +   budgetMounth);

console.log('Цель будет достигнута за ' + Math.ceil(mission/budgetMounth) + ' месяцев(-а)');

budgetDay = Math.floor(budgetMounth / 30);
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');    
} else {
    console.log('Что то пошло не так');
}


