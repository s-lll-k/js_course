'use strict';

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
    mission: 4000000,
    period: 12,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        this.addExpenses = addExpenses.toLowerCase().split(', ');
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let expansesVal,
                expansesKey = prompt('Введите обязательную статью расходов?');
            while (!isNumber(expansesVal)) {
                expansesVal = prompt('Во сколько это обойдется?');
            }
            this.expenses[expansesKey] = expansesVal;
        }
    },
    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth +=  parseInt(this.expenses[key]);
        }
    },
    getBudget: function() {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(this.mission / this.budgetMonth);
    },
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');    
        } else {
            return('Что то пошло не так');
        }
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

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