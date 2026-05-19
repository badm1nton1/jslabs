import { generateId, formatDate } from './utils.js';
import { addTransactionToArray, removeTransactionFromArray } from './transactions.js';
import { addTransactionRow, removeTransactionRow, calculateTotal, showDescription } from './ui.js';

/**
 * Считывает данные из формы, создаёт объект транзакции,
 * добавляет его в массив и отрисовывает строку в таблице
 */
function addTransaction() {
    var date = document.getElementById('date').value;
    var amount = parseFloat(document.getElementById('amount').value);
    var category = document.getElementById('category').value;
    var description = document.getElementById('description').value;

    if (!date || isNaN(amount) || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    var transaction = {
        id: generateId(),
        date: formatDate(date),
        amount: amount,
        category: category,
        description: description
    };

    addTransactionToArray(transaction);
    addTransactionRow(transaction);
    calculateTotal();
}

var form = document.getElementById('transaction-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    addTransaction();
});

var table = document.getElementById('transaction-table');
table.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        var id = event.target.dataset.id;
        removeTransactionFromArray(id);
        removeTransactionRow(id);
        calculateTotal();
    } else if (event.target.tagName === 'TD') {
        var row = event.target.parentElement;
        var id = row.dataset.id;
        if (id) {
            showDescription(id);
        }
    }
});
