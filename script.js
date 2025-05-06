<script>
    let countdown;
    let seconds = 900; // default to 15 minutes
    let isPaused = false;
    let isRunning = false;

    function playSounds() {
      const rain = document.getElementById('rainAudio');
      const wind = document.getElementById('windAudio');
      const thunder = document.getElementById('thunderAudio');

      if (rain.volume > 0) {
        rain.play()
        .then(() => console.log("Rain playing"))
        .catch(err => console.log("Rain play error:", err));
      }
      if (wind.volume > 0) {
        wind.play()
        .then(() => console.log("Wind playing"))
        .catch(err => console.log("Wind play error:", err));
      }
      if (thunder.volume > 0) {
        thunder.play()
        .then(() => console.log("Thunder playing"))
        .catch(err => console.log("Thunder play error:", err));
      }
    }

    function pauseSounds() {
      document.getElementById('rainAudio').pause();
      document.getElementById('windAudio').pause();
      document.getElementById('thunderAudio').pause();
    }

    function stopSounds() {
      ['rainAudio', 'windAudio', 'thunderAudio'].forEach(id => {
        const audio = document.getElementById(id);
        audio.pause();
        audio.currentTime = 0; // rewind to start
      });
    }

    const display = document.getElementById('time');
    const select = document.getElementById('duration');
    const circle = document.getElementById('circle');
    const startBtn = document.getElementById('startBtn');
    const toggleBtn = document.getElementById('modeToggle');
    const body = document.body;
    
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('night');
      if (body.classList.contains('night')) {
        toggleBtn.textContent = '🌞'; // Sun icon for dark mode
      } else {
        toggleBtn.textContent = '🌙'; // Moon icon for light mode
      }
    });

    startBtn.addEventListener('click', () => {
      playSounds(); // trigger sounds IMMEDIATELY on click
      startTimer(); // then start the timer
      });

  
    function updateDisplay() {
      const min = String(Math.floor(seconds / 60)).padStart(2, '0');
      const sec = String(seconds % 60).padStart(2, '0');
      display.textContent = `${min}:${sec}`;
    }
    document.querySelector('.rain').addEventListener('input', (e) => {
      document.getElementById('rainAudio').volume = e.target.value / 100;
    });
    document.querySelector('.wind').addEventListener('input', (e) => {
      document.getElementById('windAudio').volume = e.target.value / 100;
    });
    document.querySelector('.thunder').addEventListener('input', (e) => {
      document.getElementById('thunderAudio').volume = e.target.value / 100;
    });
  
    function startTimer() {
      if (!isRunning) {
        if (!isPaused) {
          seconds = parseInt(select.value);
          updateDisplay();
        }

        isRunning = true;
        isPaused = false;
        circle.classList.add('ticking');
        document.getElementById('pauseLabel').style.display = 'none';
        startBtn.textContent = '▶️';

        playSounds();

        countdown = setInterval(() => {
          if (!isPaused && seconds > 0) {
            seconds--;
            updateDisplay();
          } else if (seconds === 0) {
            clearInterval(countdown);
            circle.classList.remove('ticking');
            isRunning = false;
            startBtn.textContent = '▶️ Start';
            stopSounds();
            alert("Time's up!");
          }
        }, 1000);
      } else if (isPaused) {
        isPaused = false;
        circle.classList.add('ticking');
        document.getElementById('pauseLabel').style.display = 'none';
        playSounds();
      }
    }

    window.addEventListener('load', () => {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 6) {
        document.body.classList.add('night');
        toggleBtn.textContent = '🌞';  // Set to sun icon when in night mode
      } else {
        toggleBtn.textContent = '🌙';  // Set to moon icon when in day mode
      }

    });

  
    function pauseTimer() {
      isPaused = true;
      circle.classList.remove('ticking');
      pauseSounds();
      document.getElementById('pauseLabel').style.display = 'block';
    }
  
    function resetTimer() {
      clearInterval(countdown);
      seconds = parseInt(select.value);
      updateDisplay();
      isPaused = false;
      isRunning = false;
      document.getElementById('pauseLabel').style.display = 'none';
      circle.classList.remove('ticking');
      startBtn.textContent = '▶️';
      stopSounds();
    }
  
    // Set initial time on load
    window.onload = () => {
      seconds = parseInt(select.value);
      updateDisplay();
      // Set default audio volume if not set by user yet
      document.getElementById('rainAudio').volume = 0.5;
      document.getElementById('windAudio').volume = 0.5;
      document.getElementById('thunderAudio').volume = 0.5;
    };
  
    // Reset timer when dropdown value changes
    select.addEventListener('change', () => {
      resetTimer();
    });
  </script>