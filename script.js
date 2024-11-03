let options = [];
let totalProbability = 0;

function addOption() {
  const nameInput = document.getElementById("nameInput").value;
  const probabilityInput = parseFloat(document.getElementById("probabilityInput").value);

  if (!nameInput || isNaN(probabilityInput) || probabilityInput <= 0 || probabilityInput > 100) {
    alert("請輸入有效的選項名稱和機率 (1-100)！");
    return;
  }

  if (totalProbability + probabilityInput > 100) {
    alert("機率總和不能超過100！");
    return;
  }

  options.push({ name: nameInput, probability: probabilityInput });
  totalProbability += probabilityInput;
  document.getElementById("nameInput").value = "";
  document.getElementById("probabilityInput").value = "";

  renderOptions();
  drawRoulette();
}

function deleteOption(index) {
  totalProbability -= options[index].probability;
  options.splice(index, 1);
  renderOptions();
  drawRoulette();
}

function renderOptions() {
  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = "";
  options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${option.name} - ${option.probability}% <button onclick="deleteOption(${index})">Delete</button>`;
    optionsList.appendChild(listItem);
  });
}

function startRoulette() {
  if (totalProbability !== 100) {
    alert("機率總和必須正好為100%！");
    return;
  }

  let spinDegrees = Math.random() * 360 + 3600;
  let currentAngle = 0;
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");

  const animateSpin = () => {
    currentAngle += (spinDegrees - currentAngle) / 10;
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
      document.getElementById("result").textContent = `Result: ${result}`;
    }
  };

  animateSpin();
}

function getRandomOption() {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (let option of options) {
    cumulativeProbability += option.probability;
    if (random < cumulativeProbability) {
      return option.name;
    }
  }
}

function drawRoulette() {
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const totalAngle = 2 * Math.PI;
  let startAngle = 0;

  options.forEach(option => {
    const sliceAngle = (totalAngle * option.probability) / 100;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(option.name, canvas.width / 4, 0);
    ctx.restore();

    startAngle += sliceAngle;
  });
}

function getRandomColor() {
  const colors = ["#FFDDC1", "#FEC8D8", "#D4A5A5", "#E7E6ED", "#FFE4E1", "#C9C9FF", "#C8E6C9", "#FFABAB", "#FFD3B6", "#FFAAA5", "#FFECB3", "#E6C9A8"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initial draw
drawRoulette();
