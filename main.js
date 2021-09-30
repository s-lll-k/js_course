'use strict';

let calculateBtn = document.getElementById('start'),
    incomeAddBtn = document.querySelector('.income_add'),
    expensesAddBtn = document.querySelector('.expenses_add'),
    depositCheckbox = document.querySelector('#deposit-check'),
    addIncomeInputs = document.querySelectorAll('.additional_income-item'),
    resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
    resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
    resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    resultAddIncome = document.getElementsByClassName('additional_income-value')[0],
    resultAddExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
    resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'),
    addIncomeItem = document.querySelectorAll('additional_income-item'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMounth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = +salary.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        // appData.getTargetMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit();
    },
    showResult: function () {
        resultBudgetMonth.value = appData.budgetMonth;
        resultBudgetDay.value = appData.budgetDay;
        resultExpensesMonth.value = appData.expensesMonth;
        resultAddExpenses.value = appData.addExpenses.join(', ');
        resultAddIncome.value = appData.addIncome.join(', ');
        resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
        periodSelect.addEventListener('input', function(){
            resultIncomePeriod.value = appData.calcPeriod();
        });

    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });  
    },
    getIncome: function () {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });  
        for (const key in appData.income) {
            appData.incomeMounth += parseInt(appData.income[key]);
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAddBtn.style.display = 'none';
        }
    },
    getAddExpenses: function () {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        addIncomeInputs.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth +=  parseInt(appData.expenses[key]);
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMounth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if(appData.deposit){
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit === 0) {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(appData.moneyDeposit || appData.moneyDeposit === 0)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 100000);
            }
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};

calculateBtn.addEventListener('click', appData.start);

expensesAddBtn.addEventListener('click', appData.addExpensesBlock);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.textContent = periodSelect.value;
});

calculateBtn.disabled = true;
salary.addEventListener('change', function () {
    if (salary.value !== '') {
        calculateBtn.disabled = false;
    } else {
        calculateBtn.disabled = true;
    }
});



// console.log('Расходы за месяц: ' + appData.expensesMonth);


// if (appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута!');
// } else {
//     console.log('Срок достижения цели: ' + appData.getTargetMonth());
// }

// console.log(appData.getStatusIncome());

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//     console.log(key + ': ' + appData[key]);
// }


// let addExpensesStr = '';

// for (const key in appData.addExpenses) {
//     addExpensesStr += appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1) + ', ';
// };

// console.log(addExpensesStr.slice(0, -2));