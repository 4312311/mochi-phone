// ================================================================
//  BANK CARDS
//  银行卡模块
// ================================================================

function renderBankCard() {
  const container = $('#rp-bank-card');
  if (!STATE.bankData) {
    STATE.bankData = {
      balance: 5000.00,
      cardNumber: '**** **** **** 8888',
      bankName: 'Raymond Bank',
      transactions: [
        { date: '2024-01-15', desc: '购物消费', amount: -128.50 },
        { date: '2024-01-14', desc: '工资收入', amount: 8000.00 },
        { date: '2024-01-13', desc: '餐饮消费', amount: -45.00 },
      ]
    };
  }
  const balance = STATE.bankData.balance.toFixed(2);
  const transactionsHtml = STATE.bankData.transactions.slice(0, 10).map(t => {
    const isIncome = t.amount > 0;
    const amountClass = isIncome ? 'rp-bank-income' : 'rp-bank-expense';
    const amountText = (isIncome ? '+' : '') + t.amount.toFixed(2);
    return `
      <div class="rp-bank-txn">
        <div class="rp-bank-txn-desc">${t.desc}</div>
        <div class="rp-bank-txn-date">${t.date}</div>
        <div class="rp-bank-txn-amount ${amountClass}">${amountText}</div>
      </div>
    `;
  }).join('');
  container.html(`
    <div class="rp-bank-card-front">
      <div class="rp-bank-chip"></div>
      <div class="rp-bank-number">${STATE.bankData.cardNumber}</div>
      <div class="rp-bank-info">
        <div class="rp-bank-name">${STATE.bankData.bankName}</div>
        <div class="rp-bank-holder">持卡人</div>
      </div>
    </div>
    <div class="rp-bank-balance">
      <div class="rp-bank-balance-label">账户余额</div>
      <div class="rp-bank-balance-amount">¥${balance}</div>
    </div>
    <div class="rp-bank-transactions">
      <div class="rp-bank-txn-title">最近交易</div>
      ${transactionsHtml}
    </div>
  `);
}

function addBankTransaction(desc, amount) {
  if (!STATE.bankData) {
    STATE.bankData = {
      balance: 5000.00,
      cardNumber: '**** **** **** 8888',
      bankName: 'Raymond Bank',
      transactions: []
    };
  }
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  STATE.bankData.transactions.unshift({
    date: dateStr,
    desc: desc,
    amount: amount
  });
  STATE.bankData.balance += amount;
  renderBankCard();
  saveState();
}