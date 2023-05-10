'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.1,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = transactions => {
  containerTransactions.innerHTML = '';
  transactions.forEach((trans, index) => {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const transactionRow = `
    <div class="transactions__row">
    <div class="transactions__type transactions__type--${transType}">
      ${index + 1} ${transType} 
    </div>
    <div class="transactions__value">${trans}</div>
  </div>
  `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

const createNickNames = accounts => {
  accounts.forEach(account => {
    account.nickName = account.userName
      .toLocaleLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');
  });
};

createNickNames(accounts);

const displayBalance = account => {
  const balance = account.transactions.reduce(
    (balance, trans) => balance + trans,
    0
  );
  account.balace = balance;
  labelBalance.textContent = `${balance}$`;
};

const displayTotal = account => {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((total, trans) => total + trans, 0);
  labelSumIn.textContent = `${depositesTotal}$`;

  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((total, trans) => total + trans, 0);
  labelSumOut.textContent = `${withdrawalTotal}$`;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter(int => int >= 5)
    .reduce((dep, int) => dep + int, 0);
  labelSumInterest.textContent = `${interestTotal}$`;
};

const updateUi = (account) => {
  displayTransactions(account.transactions);
  displayBalance(account);
  displayTotal(account);
};

let currentAccount;

btnLogin.addEventListener('click', event => {
  event.preventDefault();
  currentAccount = accounts.find(
    account => account.nickName === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Привет, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    updateUi(currentAccount); 
  }
});

btnTransfer.addEventListener('click', event => {
  event.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickName === recipientNickname
  );
  if (
    transferAmount > 0 &&
    currentAccount.balace >= transferAmount &&
    recipientAccount?.nickName !== currentAccount.nickName &&
    recipientAccount
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    inputTransferTo.blur();
    inputTransferAmount.blur();
  }
});

// const getAverageHumanAge = (catAges) => {
//   const humanAge = catAges.map(age => age <= 2 ? age * 10 : age * 7);
//   const humanAgeAdult = humanAge.filter(age => age >= 18);
//   const averageAge = humanAgeAdult.reduce((aver, age) => aver + age, 0)/humanAgeAdult.length;
//   console.log(humanAge.length);
//   console.log(humanAgeAdult.length);

//   return averageAge
// }

// console.log(getAverageHumanAge([1, 2, 3, 10]));
