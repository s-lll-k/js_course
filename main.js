'use strict';

const calculateBtn = document.getElementById('start'),
    resetBtn = document.getElementById('cancel'),
    incomeAddBtn = document.querySelector('.income_add'),
    expensesAddBtn = document.querySelector('.expenses_add'),
    depositCheckbox = document.querySelector('#deposit-check'),
    resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
    resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
    resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    resultAddIncome = document.getElementsByClassName('additional_income-value')[0],
    resultAddExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
    resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    addIncomeItem = document.querySelectorAll('additional_income-item'),
    addIncomeInputs = document.querySelectorAll('.additional_income-item'),
    expensesItems = document.querySelectorAll('.expenses-items');
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
class AppData {
    constructor(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMounth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    start(){
        this.budget = +salary.value;
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
    
        this.showResult();
    }

    showResult(){
        const _this = this;
        resultBudgetMonth.value = this.budgetMonth;
        resultBudgetDay.value = this.budgetDay;
        resultExpensesMonth.value = this.expensesMonth;
        resultAddExpenses.value = this.addExpenses.join(', ');
        resultAddIncome.value = this.addIncome.join(', ');
        resultTargetMonth.value = Math.ceil(this.getTargetMonth());
        resultIncomePeriod.value = this.calcPeriod();
        periodSelect.addEventListener('input', function(){
            resultIncomePeriod.value = _this.calcPeriod();
        });
    }

    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }
    }

    getExpenses(){
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });  
    }

    getIncome(){
        const _this = this;
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
            }
        });  
        for (const key in this.income) {
            this.incomeMounth += parseInt(this.income[key]);
        }
    }

    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAddBtn.style.display = 'none';
        }
    }

    getAddExpenses(){
        const _this = this;
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome(){
        const _this = this;
        addIncomeInputs.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth(){
        for (let key in this.expenses) {
            this.expensesMonth +=  parseInt(this.expenses[key]);
        }
    }

    getBudget(){
        this.budgetMonth = this.budget + this.incomeMounth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth(){
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome(){
        if (this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');    
        } else {
            return('Что то пошло не так');
        }
    }

    getInfoDeposit() {
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if(this.deposit){
            while (!isNumber(this.percentDeposit) || this.percentDeposit === 0) {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(this.moneyDeposit || this.moneyDeposit === 0)) {
                this.moneyDeposit = prompt('Какая сумма заложена?', 100000);
            }
        }
    }

    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }

    eventListeners(){
        const _this = this;
        calculateBtn.addEventListener('click', function () {
            if (salary.value !== '') {
                _this.start();
                document.querySelectorAll('.data input').forEach(function (item) {
                    item.disabled = true;
                });
                this.style.display = 'none';
                resetBtn.style.display = 'block';
            }
        });
    
        expensesAddBtn.addEventListener('click', _this.addExpensesBlock);
        incomeAddBtn.addEventListener('click', _this.addIncomeBlock);
        periodSelect.addEventListener('input', function(){
            periodAmount.textContent = periodSelect.value;
        });
    
        resetBtn.addEventListener('click', function () {
            document.querySelectorAll('.data input').forEach(function (item) {
                item.disabled = false;
            });
            document.querySelectorAll('.calc input').forEach(function (item) {
                if (item === periodSelect) {
                    item.value = 1;
                    periodAmount.textContent = item.value;
                } else if (item.type === "checkbox") {
                    item.checked = false;
                } else {
                    item.value = '';
                }
            });
            this.style.display = 'none';
            calculateBtn.style.display = 'block';
        });
    }
}

const appData = new AppData();

appData.eventListeners();

console.log(appData);
