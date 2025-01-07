// global variables
const container = document.querySelector(".container");
const input = document.querySelector("input");
const length = container.offsetWidth;
let random = 0;
let mouseDown = false;
let mode = "Grid Selection";
let color = "black";
// Set default grid to 1x1
setGrid(1);

// Global Event Listener - Click
document.body.addEventListener("click", (event) => {
  if (event.target.nodeName == "BUTTON") {
    // Grid Creation
    if (event.target.parentNode.classList.contains("grid-buttons")) {
      let gridNumber;
      if (event.target.textContent == "Custom") {
        gridNumber = prompt("What size do you want your grid? (max 100)");
      } else {
        let middle = event.target.textContent.indexOf("x");
        gridNumber = Number.parseInt(
          event.target.textContent.substring(0, middle),
        );
      }
      // Check for max
      if (gridNumber > 100) {
        gridNumber = 100;
      }

      // Log grid creation
      console.log(`Creating ${gridNumber} x ${gridNumber} grid`);
      toggleHidden("button");
      toggleHidden("input");
      setGrid(gridNumber);
      setMode("Paint");
    } else {
      let action = event.target.textContent.split(" ");
      switch (action[0]) {
        case "Paint":
          setMode("Paint");
          break;
        case "Eraser":
          setMode("Erase");
          break;
        case "Reset":
          if (confirm("Are your sure you would like to reset?")) {
            setGrid(1);
            setMode("Grid Selection");
            toggleHidden("button");
            toggleHidden("input");
            color = "black";
          }
          break;
      }
    }
  }
});

// Global Event Listener - Hover
document.body.onmousedown = (event) => {
  mouseDown = true;
  if (event.target.classList.contains("grid")) {
    editGrid(event, mode);
  }
};

document.body.onmouseup = () => {
  mouseDown = false;
};

document.body.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("grid") && mouseDown == true) {
    editGrid(event, mode);
  }
});

// Edit grid depending on mode
function editGrid(event, mode) {
  switch (mode) {
    case "Paint":
      setPaintColor(event.target);
      break;
    case "Erase":
      setPaintColor(event.target);
      break;
  }
}

function setPaintColor(target) {
  if (mode == "Erase") {
    target.style.backgroundColor = "white";
  } else {
    if (random == 0) {
      target.style.backgroundColor = color;
    } else {
      target.style.backgroundColor = getRandomColor();
    }
  }
}

// random color generator for paint
function getRandomColor() {
  let color = "red";
  return color;
}

function setMode(text) {
  mode = text;
  setModeText(text);
}

function setModeText(text) {
  const modeText = document.querySelector("h2");
  modeText.textContent = `Current Mode: ${text}`;
}

function setGrid(gridNumber) {
  const createdDivs = document.querySelectorAll(".grid");
  if (createdDivs.length > 0) {
    for (let div of createdDivs) {
      container.removeChild(div);
    }
  }
  for (let i = 0; i < gridNumber * gridNumber; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "grid");
    let gridBasis = length / gridNumber + "px";
    div.style.flexBasis = gridBasis;
    div.style.maxHeight = gridBasis;
    div.style.minHeight = gridBasis;
    container.appendChild(div);
  }
}

const toggleHidden = (item) => {
  if (item == "input") {
    const element = document.querySelector("#color");
    element.classList.toggle("hidden");
  } else {
    const elements = document.querySelectorAll(item);
    elements.forEach((element) => {
      element.toggleAttribute("hidden");
    });
  }
};

// Color Picker Event Listener
document.getElementById("color").addEventListener("open", () => {
  document.addEventListener("coloris:pick", (event) => {
    color = event.detail.color;
  });
});
