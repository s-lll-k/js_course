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
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

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
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
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

    addExpIncBlock(item){
        const cloningElement = item.previousElementSibling;
        const clone = cloningElement.cloneNode(true);
        clone.querySelectorAll('input').forEach(item => {
            item.value = '';
        });
        item.before(clone);
        if (document.querySelectorAll(`.${cloningElement.className}`).length === 3) {
            item.style.display = 'none';
        }
    }


    getExpInc(){
        const count = item =>{
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);
        
        for (const key in this.income) {
            this.incomeMounth += parseInt(this.income[key]);
        }
    }

    getAddExpInc(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
        addIncomeInputs.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth(){
        for (let key in this.expenses) {
            this.expensesMonth +=  parseInt(this.expenses[key]);
        }
    }

    getBudget(){
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMounth - this.expensesMonth + monthDeposit;
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

    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }

    getInfoDeposit() {
        if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    checkPercent(){
        if(!isNumber(depositPercent.value) || depositPercent.value > 100 || depositPercent.value < 0){
            alert('Введите процент депозита корректно!');
            calculateBtn.disabled = true;
        } else {
            calculateBtn.disabled = false;
        }
    }

    changePercent(e){
        const valueSelect = e.target.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('change', this.checkPercent);
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.removeEventListener('change', this.checkPercent);
        }
    }

    depositHandler(){
        if (depositCheckbox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent.bind(this));
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent.bind(this));
        }
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
    
        expensesAddBtn.addEventListener('click', function(){_this.addExpIncBlock(this)});
        incomeAddBtn.addEventListener('click', function(){_this.addExpIncBlock(this)});

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

        depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();

appData.eventListeners();

console.log(appData);
