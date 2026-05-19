/**
 * Массив всех транзакций
 * @type {Array}
 */
var transactions = [];

/**
 * Добавляет транзакцию в массив
 * @param {Object} transaction - объект транзакции
 * @param {string} transaction.id - уникальный ID
 * @param {string} transaction.date - дата и время
 * @param {number} transaction.amount - сумма
 * @param {string} transaction.category - категория
 * @param {string} transaction.description - описание
 */
function addTransactionToArray(transaction) {
    transactions.push(transaction);
}

/**
 * Удаляет транзакцию из массива по ID
 * @param {string} id - ID транзакции для удаления
 */
function removeTransactionFromArray(id) {
    transactions = transactions.filter(function (t) {
        return t.id !== id;
    });
}

/**
 * Возвращает массив всех транзакций
 * @returns {Array} массив транзакций
 */
function getTransactions() {
    return transactions;
}

export { addTransactionToArray, removeTransactionFromArray, getTransactions };
