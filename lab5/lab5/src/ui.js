import { getTransactions } from './transactions.js';

/**
 * Возвращает первые 4 слова из текста
 * @param {string} text - полный текст описания
 * @returns {string} первые 4 слова
 */
function getShortDescription(text) {
    var words = text.split(' ');
    return words.slice(0, 4).join(' ');
}

/**
 * Добавляет строку транзакции в таблицу
 * @param {Object} transaction - объект транзакции
 */
function addTransactionRow(transaction) {
    var tbody = document.getElementById('table-body');
    var row = document.createElement('tr');
    row.dataset.id = transaction.id;

    if (transaction.amount > 0) {
        row.style.backgroundColor = '#a8f0a8';
    } else {
        row.style.backgroundColor = '#f0a8a8';
    }

    row.innerHTML =
        '<td>' + transaction.date + '</td>' +
        '<td>' + transaction.category + '</td>' +
        '<td>' + getShortDescription(transaction.description) + '</td>' +
        '<td><button class="delete-btn" data-id="' + transaction.id + '">Удалить</button></td>';

    tbody.appendChild(row);
}

/**
 * Удаляет строку таблицы по ID транзакции
 * @param {string} id - ID транзакции
 */
function removeTransactionRow(id) {
    var row = document.querySelector('tr[data-id="' + id + '"]');
    if (row) {
        row.remove();
    }
}

/**
 * Пересчитывает и отображает общую сумму транзакций
 */
function calculateTotal() {
    var all = getTransactions();
    var total = 0;
    for (var i = 0; i < all.length; i++) {
        total += all[i].amount;
    }
    document.getElementById('total').textContent = total;
}

/**
 * Отображает полное описание транзакции по ID
 * @param {string} id - ID транзакции
 */
function showDescription(id) {
    var all = getTransactions();
    for (var i = 0; i < all.length; i++) {
        if (all[i].id === id) {
            document.getElementById('description-block').textContent = 'Описание: ' + all[i].description;
            break;
        }
    }
}

export { addTransactionRow, removeTransactionRow, calculateTotal, showDescription };
