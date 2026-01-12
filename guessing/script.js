const SECRET = "atrodi";

let tries = 0;

const card = document.getElementById("card");
const pw = document.getElementById("pw");
const check = document.getElementById("check");
const hint = document.getElementById("hint");
const reset = document.getElementById("reset");
const toggle = document.getElementById("toggle");

const triesEl = document.getElementById("tries");
const statusEl = document.getElementById("status");
const msg = document.getElementById("msg");

function setMsg(text, kind) {
  msg.textContent = text;
  msg.classList.remove("msg--ok", "msg--bad");
  if (kind) msg.classList.add(kind);
}

function updateMeta(status) {
  triesEl.textContent = String(tries);
  statusEl.textContent = status;
}

function normalize(s) {
  return s.trim();
}

function getHint() {
  if (tries < 2) return "Mājiens: 6 burti, tikai mazie burti.";
  if (tries < 4) return "Mājiens: saistīts ar lapas virsrakstu.";
  if (tries < 6) return "Mājiens: sākas ar “a” un beidzas ar “i”.";
  return `Atbilde: ${SECRET}`;
}

function lock() {
  pw.disabled = true;
  check.disabled = true;
  hint.disabled = true;
  toggle.disabled = true;
}

function unlock() {
  pw.disabled = false;
  check.disabled = false;
  hint.disabled = false;
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
    setMsg("Ievadi paroli un spied “Pārbaudīt”.", null);
    updateMeta("gaida");
    return;
  }

  tries += 1;

  if (guess === SECRET) {
    setMsg(
      "Pareizi. Uzdevums izpildīts. (Reālajā dzīvē šādi paroles neglabā.)",
      "msg--ok"
    );
    updateMeta("atminēts");
    lock();
    return;
  }

  shakeCard();
  updateMeta("mēģina");

  const lengthInfo =
    guess.length === SECRET.length
      ? "garums pareizs"
      : guess.length < SECRET.length
        ? "par īsu"
        : "par garu";

  if (tries === 3 || tries === 5) {
    setMsg(`Nepareizi. (${lengthInfo}) ${getHint()}`, "msg--bad");
  } else {
    setMsg(`Nepareizi. Mēģini vēl. (${lengthInfo})`, "msg--bad");
  }
}

function onReset() {
  tries = 0;
  pw.value = "";
  pw.type = "password";
  toggle.textContent = "Rādīt";
  unlock();
  setMsg("Sāc minēt. Vari spiest “Mājiens”.", null);
  updateMeta("gaida");
  pw.focus();
}

function onHint() {
  setMsg(getHint(), null);
}

function onToggle() {
  const isHidden = pw.type === "password";
  pw.type = isHidden ? "text" : "password";
  toggle.textContent = isHidden ? "Slēpt" : "Rādīt";
  pw.focus();
}

check.addEventListener("click", onCheck);
hint.addEventListener("click", onHint);
reset.addEventListener("click", onReset);
toggle.addEventListener("click", onToggle);

pw.addEventListener("keydown", (e) => {
  if (e.key === "Enter") onCheck();
});

onReset();
