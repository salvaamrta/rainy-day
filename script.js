let countdown;
let seconds = 900; // default 15 minutes
let isPaused = false;
let isRunning = false;

function playSounds() {
  const rain = document.getElementById('rainAudio');
  const wind = document.getElementById('windAudio');
  const thunder = document.getElementById('thunderAudio');

  if (rain.volume > 0) {
    rain.play().catch(err => console.log("Rain play error:", err));
  }
  if (wind.volume > 0) {
    wind.play().catch(err => console.log("Wind play error:", err));
  }
  if (thunder.volume > 0) {
    thunder.play().catch(err => console.log("Thunder play error:", err));
  }
}

function pauseSounds
