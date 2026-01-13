const pwd = "admin";

let tries = 0;

const card = document.getElementById("card");
const pw = document.getElementById("pw");
const check = document.getElementById("check");
const reset = document.getElementById("reset");
const toggle = document.getElementById("toggle");

const triesEl = document.getElementById("tries");

function updateMeta() {
  triesEl.textContent = String(tries);
}

function normalize(s) {
  return s.trim();
}

function getHint() {
  if (tries < 2) return "Mājiens: 6 burti, tikai mazie burti.";
  if (tries < 4) return "Mājiens: saistīts ar lapas virsrakstu.";
  if (tries < 6) return "Mājiens: sākas ar “a” un beidzas ar “n”.";
  return `Atbilde: ${pwd}`;
}

function lock() {
  pw.disabled = true;
  check.disabled = true;
  toggle.disabled = true;
}

function unlock() {
  pw.disabled = false;
  check.disabled = false;
  toggle.disabled = false;
}

function shakeCard() {
  card.classList.remove("shake");
  void card.offsetWidth;
  card.classList.add("shake");
}

function onCheck() {
  const guess = normalize(pw.value);

  if (!guess) {
    alert("Ievadi paroli un spied “Pārbaudīt”.", null);
    updateMeta("gaida");
    return;
  }

  tries += 1;

  if (guess === pwd) {
    alert("Parole atmineta");
    updateMeta("atminēts");
    lock();
    return;
  }

  shakeCard();
  updateMeta("mēģina");

  const lengthInfo =
    guess.length === pwd.length
      ? "ievadītās paroles garums pareizs"
      : guess.length < pwd.length
        ? "ievadītās paroles garums ir par īsu"
        : "ievadītās paroles garums ir par garu";

  if (tries === 3 || tries === 5) {
    alert(`Nepareizi. (${lengthInfo}) ${getHint()}`, "msg--bad");
  } else {
    alert(`Nepareizi. Mēģini vēlreiz. (${lengthInfo})`, "msg--bad");
  }
}

function onReset() {
  tries = 0;
  pw.value = "";
  pw.type = "password";
  toggle.textContent = "Rādīt";
  unlock();
  updateMeta("gaida");
  pw.focus();
}

function onToggle() {
  const isHidden = pw.type === "password";
  pw.type = isHidden ? "text" : "password";
  toggle.textContent = isHidden ? "Slēpt" : "Rādīt";
  pw.focus();
}

check.addEventListener("click", onCheck);
reset.addEventListener("click", onReset);
toggle.addEventListener("click", onToggle);

pw.addEventListener("keydown", (e) => {
  if (e.key === "Enter") onCheck();
});

onReset();
