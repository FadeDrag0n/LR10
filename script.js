
const emojis = ["🤡", "🦣", "🎰", "💎", "💰", "🔥", "⭐"];

const multipliers = {
  "🤡": 2,
  "🔥": 3,
  "🦣": 5,
  "💰": 7,
  "🎰": 10,
  "💎": 15,
  "⭐": 20,
};

let balance = 1000;

let username = prompt("Введіть ім’я:");
document.getElementById("username").textContent = username;

function generateColumn() {
  let shuffled = [...emojis].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function displayColumn(id, arr) {
  let col = document.getElementById(id);
  col.innerHTML = "";
  arr.forEach((icon) => {
    let div = document.createElement("div");
    div.className = "emoji";
    div.textContent = icon;
    col.appendChild(div);
  });
}

document.getElementById("spinBtn").onclick = function () {
  let bet = parseInt(document.getElementById("bet").value);

  if (bet <= 0 || bet > balance) {
    alert("Невірна ставка!");
    return;
  }

  balance -= bet;
  updateBalance();

  let col1 = generateColumn();
  let col2 = generateColumn();
  let col3 = generateColumn();

  displayColumn("col1", col1);
  displayColumn("col2", col2);
  displayColumn("col3", col3);

  let winSymbol = null;

  for (let i = 0; i < 3; i++) {
    if (col1[i] === col2[i] && col2[i] === col3[i]) {
      winSymbol = col1[i];
      highlightWin(i);
      break;
    }
  }

  if (winSymbol) {
    let winAmount = bet * multipliers[winSymbol];
    balance += winAmount;
    updateBalance();
    document.getElementById(
      "result"
    ).textContent = `🎉 Ви виграли: ${winAmount}!`;
    endGame();
  } else {
    document.getElementById("result").textContent = "😔 Немає виграшу";
  }
};

function highlightWin(row) {
  document.querySelectorAll("#col1 .emoji")[row].classList.add("win");
  document.querySelectorAll("#col2 .emoji")[row].classList.add("win");
  document.querySelectorAll("#col3 .emoji")[row].classList.add("win");
}

function updateBalance() {
  document.getElementById("balance").textContent = `Баланс: ${balance}`;
}

function endGame() {
  document.getElementById("spinBtn").disabled = true;
  document.getElementById("resetBtn").classList.remove("hidden");
}

document.getElementById("resetBtn").onclick = function () {
  document.getElementById("spinBtn").disabled = false;
  document.getElementById("result").textContent = "";
  document.getElementById("resetBtn").classList.add("hidden");

  document.querySelectorAll(".emoji").forEach((e) => e.classList.remove("win"));
};
