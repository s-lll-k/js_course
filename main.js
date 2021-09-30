'use strict';

const calculateBtn = document.getElementById('start');
const incomeAddBtn = document.querySelector('.income_add');
const expensesAddBtn = document.querySelector('.expenses_add');
const depositCheckbox = document.querySelector('#deposit-check');
const addIncomeInputs = document.querySelectorAll('.additional_income-item');
const resultBudgetMonth = document.getElementsByClassName('budget_month-value');
const resultBudgetDay = document.getElementsByClassName('budget_day-value');
const resultExpensesMonth = document.getElementsByClassName('expenses_month-value');
const resultAddIncome = document.getElementsByClassName('additional_income-value');
const resultAddExpenses = document.getElementsByClassName('additional_expenses-value');
const resultIncomePeriod = document.getElementsByClassName('income_period-value');
const resultTargetMonth = document.getElementsByClassName('target_month-value');
const salary = document.querySelector('.salary-amount');
const incomeName = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const addIncomeItem = document.querySelectorAll('additional_income-item');
const expensesName = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodAmount = document.querySelector('.period-select');


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, 
    start = function () {
        do {
            money = prompt('Ваш месячный доход?');
        } 
        while (!isNumber(money));
    };

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 4000000,
    period: 12,
    asking: function() {

        if(confirm('Есть ли у вас доп. заработок?')){
            let itemIncome,
                cashIncome;
            while (isNumber(itemIncome) || itemIncome === undefined) {
                itemIncome = prompt('Какой у вас есть дополнительный зароботок?', 'Таксую');
            }
            while (!isNumber(cashIncome)) {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            }
            appData.income[itemIncome] = cashIncome;
        }


        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let expansesVal,
                expansesKey;
            while (isNumber(expansesKey) || expansesKey === undefined) {
                expansesKey = prompt('Введите обязательную статью расходов?');
            }
            while (!isNumber(expansesVal)) {
                expansesVal = prompt('Во сколько это обойдется?');
            }
            appData.expenses[expansesKey] = expansesVal;
        }
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth +=  parseInt(appData.expenses[key]);
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');    
        } else {
            return('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if(appData.deposit){
            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 100000);
            }
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);


if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута!');
} else {
    console.log('Срок достижения цели: ' + appData.getTargetMonth());
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}


let addExpensesStr = '';

for (const key in appData.addExpenses) {
    addExpensesStr += appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1) + ', ';
};

console.log(addExpensesStr.slice(0, -2));