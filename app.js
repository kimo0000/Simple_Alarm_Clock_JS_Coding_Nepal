const selects = document.querySelector(".selects");
const selectMenu = document.querySelectorAll("select");
const timer = document.querySelector(".timer");
const btnSetTimer = document.querySelector(".setTime");

// console.log(selectMenu);

let alarmTime,
  ringtonne = new Audio("./audios/alarm.wav");
let isAlarm = false;

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let options = `<option value="${i}">${i}</option>`;
  selectMenu[0].insertAdjacentHTML("beforeend", options);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let options = `<option value="${i}">${i}</option>`;
  selectMenu[1].insertAdjacentHTML("beforeend", options);
}
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let options = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].insertAdjacentHTML("beforeend", options);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  ampm = "AM";

  // console.log(h, m , s);

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? (h = 12) : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timer.innerText = `${h}:${m}:${s} ${ampm}`;

  // console.log(alarmTime, `${h}:${m} ${ampm}`);

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtonne.play();
    ringtonne.loop = true;
  }
}, 1000);

const setTime = () => {
  if (isAlarm) {
    alarmTime = "";
    ringtonne.pause();
    selects.classList.remove("disabled");
    btnSetTimer.innerText = "Set Alarm";
    return (isAlarm = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  // console.log(time);
  if (
    time.includes("hour") ||
    time.includes("minute") ||
    time.includes("AM/PM")
  ) {
    alert("Please, Select A time For set Alarm!");
  }

  isAlarm = true;
  alarmTime = time;
  console.log(alarmTime);
  selects.classList.add("disabled");
  btnSetTimer.innerText = "Clear Alarm";
};

btnSetTimer.addEventListener("click", setTime);
