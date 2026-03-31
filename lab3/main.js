const transactions = [
  {
    transaction_id: "1",
    transaction_date: "2024-01-15",
    transaction_amount: 150.00,
    transaction_type: "debit",
    transaction_description: "Grocery shopping",
    merchant_name: "SuperMart",
    card_type: "debit"
  },
  {
    transaction_id: "2",
    transaction_date: "2024-01-20",
    transaction_amount: 200.00,
    transaction_type: "credit",
    transaction_description: "Electronics purchase",
    merchant_name: "TechStore",
    card_type: "credit"
  },
  {
    transaction_id: "3",
    transaction_date: "2024-02-05",
    transaction_amount: 50.00,
    transaction_type: "debit",
    transaction_description: "Coffee and snacks",
    merchant_name: "CafeShop",
    card_type: "debit"
  },
  {
    transaction_id: "4",
    transaction_date: "2024-02-18",
    transaction_amount: 300.00,
    transaction_type: "debit",
    transaction_description: "Clothing purchase",
    merchant_name: "FashionStore",
    card_type: "debit"
  },
  {
    transaction_id: "5",
    transaction_date: "2024-03-10",
    transaction_amount: 120.00,
    transaction_type: "credit",
    transaction_description: "Restaurant dinner",
    merchant_name: "FoodPlace",
    card_type: "credit"
  },
  {
    transaction_id: "6",
    transaction_date: "2024-03-22",
    transaction_amount: 75.00,
    transaction_type: "debit",
    transaction_description: "Pharmacy",
    merchant_name: "HealthPlus",
    card_type: "debit"
  },
  {
    transaction_id: "7",
    transaction_date: "2024-03-28",
    transaction_amount: 500.00,
    transaction_type: "debit",
    transaction_description: "Online shopping",
    merchant_name: "SuperMart",
    card_type: "debit"
  }
];

/**
 * @param {Object[]} transactions
 * @returns {string[]}
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

/**
 * @param {Object[]} transactions
 * @returns {number}
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * @param {Object[]} transactions
 * @param {number} [year]
 * @param {number} [month]
 * @param {number} [day]
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(t => {
      const date = new Date(t.transaction_date);
      if (year && date.getFullYear() !== year) return false;
      if (month && date.getMonth() + 1 !== month) return false;
      if (day && date.getDate() !== day) return false;
      return true;
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * @param {Object[]} transactions
 * @param {string} type
 * @returns {Object[]}
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

/**
 * @param {Object[]} transactions
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Object[]}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => t.transaction_date >= startDate && t.transaction_date <= endDate);
}

/**
 * @param {Object[]} transactions
 * @param {string} merchantName
 * @returns {Object[]}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * @param {Object[]} transactions
 * @returns {number}
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * @param {Object[]} transactions
 * @param {number} minAmount
 * @param {number} maxAmount
 * @returns {Object[]}
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * @param {Object[]} transactions
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * @param {Object[]} transactions
 * @returns {string}
 */
function findMostTransactionsMonth(transactions) {
  const counts = {};
  transactions.forEach(t => {
    const month = t.transaction_date.slice(0, 7);
    counts[month] = (counts[month] || 0) + 1;
  });
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

/**
 * @param {Object[]} transactions
 * @returns {string}
 */
function findMostDebitTransactionMonth(transactions) {
  const counts = {};
  transactions
    .filter(t => t.transaction_type === "debit")
    .forEach(t => {
      const month = t.transaction_date.slice(0, 7);
      counts[month] = (counts[month] || 0) + 1;
    });
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

/**
 * @param {Object[]} transactions
 * @returns {string}
 */
function mostTransactionTypes(transactions) {
  const debit = transactions.filter(t => t.transaction_type === "debit").length;
  const credit = transactions.filter(t => t.transaction_type === "credit").length;
  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}

/**
 * @param {Object[]} transactions
 * @param {string} date
 * @returns {Object[]}
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => t.transaction_date < date);
}

/**
 * @param {Object[]} transactions
 * @param {string} id
 * @returns {Object|null}
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id) || null;
}

/**
 * @param {Object[]} transactions
 * @returns {string[]}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}


console.log("Unique types:", getUniqueTransactionTypes(transactions));
console.log("Total amount:", calculateTotalAmount(transactions));
console.log("Total by date (2024, Jan):", calculateTotalAmountByDate(transactions, 2024, 1));
console.log("Debit transactions:", getTransactionByType(transactions, "debit"));
console.log("Date range (2024-01-01 to 2024-02-28):", getTransactionsInDateRange(transactions, "2024-01-01", "2024-02-28"));
console.log("By merchant SuperMart:", getTransactionsByMerchant(transactions, "SuperMart"));
console.log("Average amount:", calculateAverageTransactionAmount(transactions));
console.log("Amount range 100-300:", getTransactionsByAmountRange(transactions, 100, 300));
console.log("Total debit:", calculateTotalDebitAmount(transactions));
console.log("Most transactions month:", findMostTransactionsMonth(transactions));
console.log("Most debit month:", findMostDebitTransactionMonth(transactions));
console.log("Most transaction type:", mostTransactionTypes(transactions));
console.log("Before 2024-03-01:", getTransactionsBeforeDate(transactions, "2024-03-01"));
console.log("Find by id 3:", findTransactionById(transactions, "3"));
console.log("Descriptions:", mapTransactionDescriptions(transactions));

console.log("\n--- Empty array tests ---");
console.log("Unique types:", getUniqueTransactionTypes([]));
console.log("Total amount:", calculateTotalAmount([]));
console.log("Average amount:", calculateAverageTransactionAmount([]));
console.log("Most transaction type:", mostTransactionTypes([]));

const single = [transactions[0]];
console.log("\n--- Single transaction tests ---");
console.log("Unique types:", getUniqueTransactionTypes(single));
console.log("Total amount:", calculateTotalAmount(single));
console.log("Average amount:", calculateAverageTransactionAmount(single));
console.log("Most transaction type:", mostTransactionTypes(single));
