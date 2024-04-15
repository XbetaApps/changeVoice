let sound;
let isTransformed = false;

function setup() {
  noCanvas();
  setupButtons();

  
  sound = new p5.SoundFile();
}

function setupButtons() {
  document.getElementById('audioFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (sound) {
        sound.stop();
      }
      sound = loadSound(URL.createObjectURL(file), () => {
        console.log("Sound loaded successfully.");
        document.getElementById('playTransformed').style.display = 'none';
        document.getElementById('pauseSound').style.display = 'none';
        document.getElementById('stopSound').style.display = 'inline';
        document.getElementById('downloadSound').style.display = 'inline';
      });
    }
  });

  document.getElementById('playOriginal').addEventListener('click', function() {
    if (sound && sound.isLoaded()) {
      sound.rate(1);
      sound.play();
      document.getElementById('pauseSound').style.display = 'inline';
    }
  });

  document.getElementById('transformToChild').addEventListener('click', function() {
    applyTransformation(1.6); // Higher pitch for child's voice
  });

  document.getElementById('transformToWoman').addEventListener('click', function() {
    applyTransformation(1.3); // Slightly higher pitch for woman's voice
  });

  document.getElementById('playTransformed').addEventListener('click', function() {
    if (isTransformed && sound && sound.isLoaded()) {
      sound.play();
      document.getElementById('pauseSound').style.display = 'inline';
    }
  });

  document.getElementById('pauseSound').addEventListener('click', function() {
    if (sound && sound.isPlaying()) {
      sound.pause();
      document.getElementById('pauseSound').innerText = 'Resume Sound';
    } else if (sound && !sound.isPlaying() && isTransformed) {
      sound.play();
      document.getElementById('pauseSound').innerText = 'Pause Sound';
    }
  });

  document.getElementById('stopSound').addEventListener('click', function() {
    if (sound) {
      sound.stop();
      document.getElementById('playTransformed').style.display = 'none';
      document.getElementById('pauseSound').style.display = 'none';
      document.getElementById('stopSound').style.display = 'none';
    }
  });

  document.getElementById('downloadSound').addEventListener('click', function() {
    if (sound && sound.isLoaded()) {
      const soundUrl = sound.url; 
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = soundUrl;
      a.download = 'Transformed_Sound.mp3'; 
      a.click();
      document.body.removeChild(a);
    }
  });
}

function applyTransformation(rate) {
  if (sound && sound.isLoaded()) {
    sound.stop();
    sound.rate(rate);
    isTransformed = true;
    document.getElementById('playTransformed').style.display = 'inline';
    document.getElementById('pauseSound').style.display = 'inline';
    document.getElementById('pauseSound').innerText = 'Pause Sound';
  }
}
