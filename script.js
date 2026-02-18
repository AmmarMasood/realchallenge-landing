// ── Countdown ──
// Set launch date: 60 days from now (adjust as needed)
const LAUNCH_DATE = new Date("2026-04-01T00:00:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, LAUNCH_DATE - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── Email form ──
document.getElementById("notifyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("emailInput");
  const msg = document.getElementById("notifyMsg");
  const email = input.value.trim();

  if (!email) return;

  // Store in localStorage as a simple client-side list
  // Replace this with an actual API call when your backend is ready
  const stored = JSON.parse(localStorage.getItem("rc_waitlist") || "[]");

  if (stored.includes(email)) {
    msg.textContent = "You're already on the list!";
    msg.className = "notify__msg";
    return;
  }

  stored.push(email);
  localStorage.setItem("rc_waitlist", JSON.stringify(stored));

  msg.textContent = "You're on the list! We'll notify you at launch.";
  msg.className = "notify__msg";
  input.value = "";
});
