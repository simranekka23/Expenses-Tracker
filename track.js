const amountInput = document.getElementById('amount-input');
const categorySelect = document.getElementById('category-select');
const dateInput = document.getElementById('date-input');
const transactionList = document.getElementById('transaction-list');
const totalAmount = document.getElementById('total-amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

window.addEventListener('load', () => {
    transactions.forEach(transaction => addTransactionToTable(transaction));
    updateTotal();
});

document.getElementById('add-btn').addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const expenseNameInput = document.getElementById('expense-name-input')

    if (isNaN(amount) || amount <= 0 || date === '') {
        alert('Please enter a valid amount and date.');
        return;
    }

    const transaction = { category, amount, date };
    transactions.push(transaction);

    addTransactionToTable(transaction);
    updateTotal();
    saveTransactions();
    expenseNameInput.value = '';
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});

function addTransactionToTable(transaction) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.category}</td>
        <td>${transaction.amount.toFixed(2)}</td>
        <td>${transaction.date}</td>
        <td><button class="Edit">Edit</button></td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    row.querySelector('.Edit').addEventListener('click', function () {
        amountInput.value = transaction.amount;
        dateInput.value = transaction.date;
        categorySelect.value = transaction.category;

        transactions = transactions.filter(t => t !== transaction);
        row.remove();
        updateTotal();
        saveTransactions();
    });

    row.querySelector('.delete-btn').addEventListener('click', function () {
        row.remove();
        transactions = transactions.filter(t => t !== transaction);
        updateTotal();
        saveTransactions();
    });

    transactionList.appendChild(row);
}

function updateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

document.getElementById('clear-all-btn').addEventListener('click', function () {
    transactions = [];
    transactionList.innerHTML = '';
    updateTotal();
    saveTransactions();
});
