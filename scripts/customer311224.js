document.addEventListener('DOMContentLoaded', async () => {
    const ledgerTable = document.getElementById('ledgerTable');
    const paginationContainer = document.getElementById('paginationContainer');
    const username = sessionStorage.getItem('username');
    //cconsole.log('Fetched username from sessionStorage:', username); // Add this line to log the username
    const welcomeMessage = document.getElementById('welcome-message');
    const totalBalance = document.getElementById('current-due');
    const lastOrderDate = document.getElementById('last-order-date');
    const lastOrderId = document.getElementById('last-order-id');
    const lastOrderAmount = document.getElementById('last-order-amount');
    const lastPaymentDate = document.getElementById('last-payment-date');
    const lastPaymentId = document.getElementById('last-payment-id');
    const lastPaymentAmount = document.getElementById('last-payment-amount');
    const viewLedger = document.getElementById('view-ledger');
    const ledgerContainer = document.getElementById('ledgerContainer');
    const payButton = document.getElementById('payButton');

    // Check authentication
    if (!sessionStorage.getItem('isAuthenticated') || sessionStorage.getItem('userType') !== 'customer') {
        window.location.href = '../index.html';
        return;
    }

  //  welcomeMessage.textContent = `Hello, ${username}!`;

    // Load customer ledger
    const ledger = await window.getLedger();
    const userLedger = ledger.filter(row => row[0] === username);
    const userLedger1 = ledger.filter(row => row[0] === username);
    if (userLedger.length > 0) {
        // Display total outstanding balance
        const lastRow = userLedger[userLedger.length - 1];
        totalBalance.textContent = `Your Total Outstanding Balance is: ${lastRow[lastRow.length - 1]}`;

        // Find last order
        const today = new Date();
        const todayTimestamp = today.getTime();

        // Ensure consistent parsing of DD/MM/YYYY format
        function parseDate(dateString) {
            const [day, month, year] = dateString.split('/');
            return new Date(`${year}-${month}-${day}T00:00:00`);
        }

        // Filter rows where the Type is 'Sale'
        const filteredSales = userLedger.filter(row => row[2] === 'Sale');

        // Log the filtered sales data to the console
        console.log('Filtered Sales Data:', filteredSales);

        // Find the row with the minimum difference between today's date and row[1] date
        const closestRow = filteredSales
            .map(row => {
                const rowDate = parseDate(row[1]);
                const rowTimestamp = rowDate.getTime();
                const diff = Math.abs(todayTimestamp - rowTimestamp);
                return { row, date: rowDate, diff };
            })
            .sort((a, b) => a.diff - b.diff)[0];

        // Log the closest row data to the console
        console.log('Closest Row Data:', closestRow);

        if (closestRow) {
            lastOrderDate.textContent = `${closestRow.row[1]}`;
            lastOrderId.textContent = `${closestRow.row[3]}`;
            lastOrderAmount.textContent = `${closestRow.row[4]}`;
        } else {
            lastOrderDate.textContent = 'No orders found.';
            lastOrderId.textContent = 'No orders found.';
            lastOrderAmount.textContent = 'No orders found.';
        }
        

        // Find last Payment
        const today1 = new Date();
        const todayTimestamp1 = today1.getTime();

        // Filter rows where the Type is 'Pymt'
        const filteredPymt = userLedger1.filter(row => row[2] === 'Rcpt');

        // Log the filtered sales data to the console
        console.log('Filtered Payments Data:', filteredPymt);

        // Find the row with the minimum difference between today's date and row[1] date
        const closestRow1 = filteredPymt
            .map(row => {
                const rowDate1 = parseDate(row[1]);
                const rowTimestamp1 = rowDate1.getTime();
                const diff1 = Math.abs(todayTimestamp - rowTimestamp1);
                return { row, date: rowDate1, diff1 };
            })
            .sort((a, b) => a.diff1 - b.diff1)[0];

        // Log the closest row data to the console
        console.log('Closest Row Data:', closestRow1);

        if (closestRow) {
            lastPaymentDate.textContent = `${closestRow1.row[1]}`;
            lastPaymentId.textContent = `${closestRow1.row[3]}`;
            lastPaymentAmount.textContent = `${closestRow1.row[5]}`;
        } else {
            lastPaymentDate.textContent = 'No orders found.';
            lastPaymentId.textContent = 'No orders found.';
            lastPaymentAmount.textContent = 'No orders found.';
        }
    }
    const userLedger2 = ledger.filter(row => row[0] === username);
    console.log('Filtered Data:', userLedger2);
    userLedger2.forEach(row => {
        const tr = document.createElement('tr');
        row.slice(1).forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        ledgerTable.querySelector('tbody').appendChild(tr);
    });
    paginateTable(ledgerTable, paginationContainer, 10); // Apply pagination

    // Populate ledger table on button click
   // const viewLedgerTab = document.getElementById('view-ledger');
   // viewLedger.addEventListener('click', () => {
   //     showTab('view-ledger');
    //viewLedgerButton.addEventListener('click', () => {
       // ledgerContainer.style.display = 'block';
       // ledgerTable.querySelector('tbody').innerHTML = ''; // Clear existing rows
       

    // Redirect to payment page on pay button click
    //payButton.addEventListener('click', () => {
      //  const paymentAmount = document.getElementById('paymentAmount').value;
      //  if (paymentAmount) {
      //      sessionStorage.setItem('paymentAmount', paymentAmount);
      //      window.location.href = 'payment.html';
     //   } else {
     //       alert('Please enter a payment amount.');
      //  }
    });

    // Logout functionality
    // window.logout = () => {
    //   sessionStorage.clear();
    //   window.location.href = '../index.html';
    // };
