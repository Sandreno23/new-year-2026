class Balls {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }
  setup() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
  }
  play() {
    this.setup();
    this.source.start(this.context.currentTime);
  }
  stop() {
    var ct = this.context.currentTime + 1;
    this.gainNode.gain.exponentialRampToValueAtTime(.1, ct);
    this.source.stop(ct);
  }
}

class Buffer {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }
  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      thisBuffer.context
        .decodeAudioData(request.response, function(buffer) {
          thisBuffer.buffer[index] = buffer;
          if(index == thisBuffer.urls.length-1) {
            thisBuffer.loaded();
          }
        });
    };
    request.send();
  };
  getBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    })
  }
  loaded() {
    loaded = true;
  }
  getSound(index) {
    return this.buffer[index];
  }
}

let balls = null,
    preset = 0,
    loaded = false;
let path = 'audio/';
let sounds = [
  path + 'sound1.mp3',
  path + 'sound2.mp3',
  path + 'sound3.mp3',
  path + 'sound4.mp3',
  path + 'sound5.mp3',
  path + 'sound6.mp3',
  path + 'sound7.mp3',
  path + 'sound8.mp3',
  path + 'sound9.mp3',
  path + 'sound10.mp3',
  path + 'sound11.mp3',
  path + 'sound12.mp3',
  path + 'sound13.mp3',
  path + 'sound14.mp3',
  path + 'sound15.mp3',
  path + 'sound16.mp3',
  path + 'sound17.mp3',
  path + 'sound18.mp3',
  path + 'sound19.mp3',
  path + 'sound20.mp3',
  path + 'sound21.mp3',
  path + 'sound22.mp3',
  path + 'sound23.mp3',
  path + 'sound24.mp3',
  path + 'sound25.mp3',
  path + 'sound26.mp3',
  path + 'sound27.mp3',
  path + 'sound28.mp3',
  path + 'sound29.mp3',
  path + 'sound30.mp3',
  path + 'sound31.mp3',
  path + 'sound32.mp3',
  path + 'sound33.mp3',
  path + 'sound34.mp3',
  path + 'sound35.mp3',
  path + 'sound36.mp3'
];
let context = new (window.AudioContext || window.webkitAudioContext)();

function playBalls() {
  let index = parseInt(this.dataset.note) + preset;
  balls = new Balls(context, buffer.getSound(index));
  balls.play();
}

function stopBalls() {
  balls.stop();
}

let buffer = new Buffer(context, sounds);
let ballsSound = buffer.getBuffer();
let buttons = document.querySelectorAll('.b-ball_bounce');
buttons.forEach(button => {
  button.addEventListener('mouseenter', playBalls.bind(button));
  button.addEventListener('mouseleave', stopBalls);
})

function ballBounce(e) {
  var i = e;
  if (e.className.indexOf(" bounce") > -1) {
  return;
  }
  toggleBounce(i);
}

function toggleBounce(i){
  i.classList.add("bounce");
  function n() {
    i.classList.remove("bounce")
    i.classList.add("bounce1");
    function o() {
      i.classList.remove("bounce1")
      i.classList.add("bounce2");
      function p() {
        i.classList.remove("bounce2")
        i.classList.add("bounce3");
        function q() {
          i.classList.remove("bounce3");
        }
        setTimeout(q, 300)
      }
      setTimeout(p, 300)
    }
    setTimeout(o, 300)
  }
  setTimeout(n, 300)
}

var array1 = document.querySelectorAll('.b-ball_bounce')
var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right')

for(var i=0; i<array1.length; i++){
  array1[i].addEventListener('mouseenter', function(){
    ballBounce(this)
  })
}

for(var i=0; i<array2.length; i++){
  array2[i].addEventListener('mouseenter', function(){
    ballBounce(this)
  })
}

let l = ["49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "81", "87", "69", "82", "84", "89", "85", "73", "79", "80", "219", "221", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "220"];
let k = ["90", "88", "67", "86", "66", "78", "77", "188", "190", "191"];
let a = {};
for (let e = 0, c = l.length; e < c; e++) {
    a[l[e]] = e
}
for (let e = 0, c = k.length; e < c; e++) {
    a[k[e]] = e
}

document.addEventListener('keydown', function (j) {
  let i = j.target;
  if (j.which in a) {
    let index = parseInt(a[j.which]);
    balls = new Balls(context, buffer.getSound(index));
    balls.play();
    let ball = document.querySelector('[data-note="' + index + '"]');
    toggleBounce(ball);
  }
});

let backgroundMusic = document.getElementById('background-music');

function tryPlayMusic() {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
            console.log("Autoplay blocked. User interaction required to play music.");
        });
    }
}

document.body.addEventListener('mouseenter', tryPlayMusic, { once: true });

// Tambahkan ini di baris terakhir script.js Anda
document.addEventListener('click', function() {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play();
    }
}, { once: true });

// --- Logika Animasi Salju ---
(function() {
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, snowflakes;

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        snowflakes = [];
        for (let i = 0; i < 50; i++) { // Jumlah butiran salju
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 4 + 1, // Ukuran butiran
                d: Math.random() * 4,     // Kecepatan jatuh
                v: Math.random() * 0.1    // Gerakan goyang ke samping
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (let i = 0; i < snowflakes.length; i++) {
            let f = snowflakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    function update() {
        for (let i = 0; i < snowflakes.length; i++) {
            let f = snowflakes[i];
            f.y += Math.cos(f.d) + 1 + f.r / 2;
            f.x += Math.sin(f.v) * 2;

            if (f.y > height) {
                snowflakes[i] = { x: Math.random() * width, y: -10, r: f.r, d: f.d, v: f.v };
            }
        }
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
})();

// --- Logika Butiran Emas (Gold Sprinkles) ---
(function() {
    const canvas = document.getElementById('sprinkle-canvas');
    const ctx = canvas.getContext('2d');
    const santaImg = document.querySelector('.santa-img');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.color = `hsla(${Math.random() * 20 + 40}, 100%, 50%, ${Math.random()})`; // Warna emas/kuning
            this.life = 2; // Alpha / nyawa partikel
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02; // Partikel menghilang perlahan
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ambil posisi Santa secara real-time
        if (santaImg) {
            const rect = santaImg.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Tambahkan partikel baru di posisi Santa
            if (particles.length < 100) {
                particles.push(new Particle(centerX, centerY));
            }
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
})();