let options = [];

function addOption() {
  const name = document.getElementById("option-name").value;
  const probability = parseInt(document.getElementById("option-probability").value, 10);

  if (name && probability > 0 && probability <= 100) {
    options.push({ name, probability });
    document.getElementById("option-name").value = "";
    document.getElementById("option-probability").value = "";
    displayOptions();
  } else {
    alert("Please enter a valid name and probability (1-100)");
  }
}

function displayOptions() {
  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";

  options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = `${option.name} - ${option.probability}%`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteOption(index);
    li.appendChild(deleteButton);
    optionsList.appendChild(li);
  });
}

function deleteOption(index) {
  options.splice(index, 1);
  displayOptions();
}

function startRoulette() {
  const totalProbability = options.reduce((total, option) => total + option.probability, 0);
  if (totalProbability !== 100) {
    alert("Total probability should add up to 100%");
    return;
  }

  const random = Math.random() * 100;
  let cumulativeProbability = 0;
  let selectedOption = null;

  for (const option of options) {
    cumulativeProbability += option.probability;
    if (random < cumulativeProbability) {
      selectedOption = option.name;
      break;
    }
  }

  document.getElementById("result").textContent = `Result: ${selectedOption}`;
  drawRoulette(selectedOption);
}

function drawRoulette(selectedOption) {
  const canvas = document.getElementById("roulette");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const totalProbability = options.reduce((total, option) => total + option.probability, 0);
  let startAngle = 0;

  options.forEach(option => {
    const sliceAngle = (option.probability / totalProbability) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = option.name === selectedOption ? "#FF6347" : getRandomColor();
    ctx.fill();
    startAngle += sliceAngle;
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
