let options = [];
let currentRotation = 0;  // 保留轉盤的旋轉角度累計值

function addOption() {
  const nameInput = document.getElementById("nameInput").value.trim();
  const probabilityInput = parseInt(document.getElementById("probabilityInput").value);

  if (!nameInput || isNaN(probabilityInput) || probabilityInput <= 0 || probabilityInput > 100) {
    alert("請輸入有效的選項名稱和機率（1-100）");
    return;
  }

  const totalProbability = options.reduce((acc, option) => acc + option.probability, 0);
  if (totalProbability + probabilityInput > 100) {
    alert("總機率不能超過 100%");
    return;
  }

  options.push({ name: nameInput, probability: probabilityInput });
  updateOptionsList();
  drawRoulette();

  document.getElementById("nameInput").value = "";
  document.getElementById("probabilityInput").value = "";
}

function updateOptionsList() {
  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = "";

  options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${option.name} - ${option.probability}% `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteOption(index);
    listItem.appendChild(deleteButton);

    optionsList.appendChild(listItem);
  });
}

function deleteOption(index) {
  options.splice(index, 1);
  updateOptionsList();
  drawRoulette();
}

function drawRoulette() {
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");
  const totalProbability = options.reduce((acc, option) => acc + option.probability, 0);

  if (totalProbability === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  let startAngle = 0;
  options.forEach(option => {
    const sliceAngle = (option.probability / 100) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = getRandomColor();
    ctx.fill();

    const textAngle = startAngle + sliceAngle / 2;
    const textX = canvas.width / 2 + Math.cos(textAngle) * (canvas.width / 3);
    const textY = canvas.height / 2 + Math.sin(textAngle) * (canvas.height / 3);
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(option.name, textX, textY);

    startAngle = endAngle;
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function startRoulette() {
  if (options.length === 0) {
    alert("請先新增選項");
    return;
  }

  const randomNumber = Math.random() * 100;
  let cumulativeProbability = 0;
  let result = "";

  for (const option of options) {
    cumulativeProbability += option.probability;
    if (randomNumber <= cumulativeProbability) {
      result = option.name;
      break;
    }
  }

  const resultText = document.getElementById("result");
  resultText.textContent = `結果：${result}`;

  const totalSpin = 360 * 5;  // 設定多轉幾圈，以增強動畫效果
  const selectedAngle = 360 * (cumulativeProbability / 100);
  const finalRotation = totalSpin + selectedAngle - currentRotation;

  currentRotation += finalRotation;

  const wheel = document.getElementById("rouletteContainer");
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${currentRotation}deg)`;
}
