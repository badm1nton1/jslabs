/**
 * Генерирует уникальный идентификатор
 * @returns {string} уникальный ID
 */
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Форматирует дату и время в читаемый вид
 * @param {string} dateStr - строка с датой
 * @returns {string} отформатированная дата и время
 */
function formatDate(dateStr) {
    var date = new Date(dateStr);
    return date.toLocaleString();
}

export { generateId, formatDate };
