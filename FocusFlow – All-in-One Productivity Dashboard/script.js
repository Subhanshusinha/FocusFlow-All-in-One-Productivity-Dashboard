// ==== Real-Time Clock & Quotes ====
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';

  h = h % 12 || 12;
  const formattedTime = `${h.toString().padStart(2, '0')}:${m}:${s} ${ampm}`;

  document.getElementById("clock").textContent = formattedTime;
  document.getElementById("date").textContent = now.toDateString();
  showQuoteByHour(now.getHours());
}
setInterval(updateClock, 1000);
updateClock();

function showQuoteByHour(hour) {
  const quotes = {
    morning: "🌅 Rise and shine! A new day to conquer!",
    afternoon: "☀️ Keep pushing through, you're doing great!",
    evening: "🌆 Late nights can be creative, but don’t forget to rest!",
    night: "🌙 It's quiet now. Time to recharge."
  };

  const message = hour >= 5 && hour < 12 ? quotes.morning :
                  hour >= 12 && hour < 18 ? quotes.afternoon :
                  hour >= 18 && hour < 22 ? quotes.evening :
                  quotes.night;

  document.getElementById("quote").textContent = message;
}

// ==== Pomodoro Timer ====
let pomodoroInterval;
let totalSeconds = 1500; // 25 minutes

function startPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroInterval = setInterval(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById("timer").innerText = 
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (totalSeconds <= 0) {
      clearInterval(pomodoroInterval);
      document.getElementById("alarmSound").play(); // Ring when time is up
      alert("Pomodoro completed!");
    }
    totalSeconds--;
  }, 1000);
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  totalSeconds = 1500;
  document.getElementById("timer").innerText = "25:00";
}


// ==== World Clock (Live) ====
function updateWorldTime() {
  const timezone = document.getElementById("timezone").value;
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  document.getElementById("worldClock").textContent = time;
}
setInterval(updateWorldTime, 1000);

// ==== Productivity Meter ====
let productivityValue = 0;
let productivityInterval;

function startProductivityMeter() {
  productivityValue = 0;
  document.getElementById("productivityMeter").value = 0;
  document.getElementById("productivityLabel").textContent = "0% Focused";

  clearInterval(productivityInterval);
  productivityInterval = setInterval(() => {
    productivityValue = Math.min(productivityValue + 1, 100);
    document.getElementById("productivityMeter").value = productivityValue;
    document.getElementById("productivityLabel").textContent = `${productivityValue}% Focused`;
  }, 60000); // 1 min
}
function resetProductivityMeter() {
  clearInterval(productivityInterval);
  startProductivityMeter();
}
window.addEventListener("load", startProductivityMeter);

// ==== Focus Mode Timer ====
let focusInterval;
let focusTimeLeft = 0;

function startFocusTimer() {
  const mins = parseInt(document.getElementById("focusMinutes").value, 10);
  if (isNaN(mins) || mins <= 0) {
    alert("Enter a valid number of minutes.");
    return;
  }

  clearInterval(focusInterval);
  focusTimeLeft = mins * 60;
  updateFocusDisplay();

  focusInterval = setInterval(() => {
    focusTimeLeft--;
    updateFocusDisplay();

    if (focusTimeLeft <= 0) {
      clearInterval(focusInterval);
      document.getElementById("focusDisplay").textContent = "00:00";
      const audio = new Audio("sounds/focus.mp3"); // or any sound you prefer
      audio.play();
      if ("vibrate" in navigator) navigator.vibrate(500);
      alert("🎯 Focus session complete!");
    }
  }, 1000);
}

function stopFocusTimer() {
  clearInterval(focusInterval);
}

function resetFocusTimer() {
  clearInterval(focusInterval);
  const mins = parseInt(document.getElementById("focusMinutes").value, 10);
  focusTimeLeft = mins * 60;
  updateFocusDisplay();
}

function updateFocusDisplay() {
  const mins = Math.floor(focusTimeLeft / 60).toString().padStart(2, '0');
  const secs = (focusTimeLeft % 60).toString().padStart(2, '0');
  document.getElementById("focusDisplay").textContent = `${mins}:${secs}`;
}


// ==== Ambient Sound Player ====
const ambientAudio = document.getElementById("ambientAudio");
const soundMap = {
  rain: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
  ocean: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  campfire: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
};

function playAmbient() {
  const sound = document.getElementById("ambientSelect").value;
  ambientAudio.src = soundMap[sound];
  ambientAudio.volume = document.getElementById("volumeSlider").value;
  ambientAudio.play();
}
function pauseAmbient() {
  ambientAudio.pause();
}
document.getElementById("volumeSlider").addEventListener("input", () => {
  ambientAudio.volume = document.getElementById("volumeSlider").value;
});

// ==== To-Do List ====
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  li.appendChild(span);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.onclick = () => li.remove();
  li.appendChild(removeBtn);

  li.onclick = () => li.classList.toggle("completed");

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

// ==== Dark Mode Toggle ====
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "enabled" : "disabled");
});
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
  }
});
