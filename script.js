let options = [
  { name: "1", probability: 1 },
  { name: "2", probability: 1 },
  { name: "3", probability: 1 },
  { name: "4", probability: 1 },
  { name: "5", probability: 1 },
  { name: "6", probability: 1 },
  { name: "7", probability: 1 },
  { name: "8", probability: 1 },
  { name: "9", probability: 1 },
  { name: "10", probability: 1 },
  { name: "11", probability: 1 },
  { name: "12", probability: 1 },
];

function startRoulette() {
  let spinDegrees = Math.random() * 360 + 3600; // Spin at least 10 full rotations
  let currentAngle = 0;
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");

  const animateSpin = () => {
    currentAngle += (spinDegrees - currentAngle) / 10; // Gradually slow down
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((currentAngle * Math.PI) / 180);
    drawRoulette();
    ctx.restore();

    if (Math.abs(currentAngle - spinDegrees) > 1) {
      requestAnimationFrame(animateSpin);
    } else {
      const result = getRandomOption();
      document.getElementById("result").textContent = `結果：${result}`;
    }
  };

  animateSpin();
}

function getRandomOption() {
  const random = Math.floor(Math.random() * options.length);
  return options[random].name;
}

function drawRoulette() {
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sliceAngle = (2 * Math.PI) / options.length;
  let startAngle = 0;

  options.forEach(option => {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();

    // Add text to slice
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(option.name, canvas.width / 4, 0);
    ctx.restore();

    startAngle += sliceAngle;
  });
}

function getRandomColor() {
  const colors = ["#FFDDC1", "#FEC8D8", "#D4A5A5", "#E7E6ED", "#FFE4E1", "#C9C9FF", "#C8E6C9", "#FFABAB", "#FFD3B6", "#FFAAA5", "#FFECB3", "#E6C9A8"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initial draw of the roulette wheel
drawRoulette();
