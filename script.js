document.addEventListener(`DOMContentLoaded`, () => {
  const gridBlock = document.querySelector(`div.grid`);
  const head = document.head;

  let CANVAS = document.querySelector(`div.grid`);
  let CANVAS_SIZE = CANVAS.clientHeight;
  let gridMultiplier = 16;
  let blockSize = CANVAS_SIZE / gridMultiplier;

  const colorInput = document.getElementById(`setColor`);
  let pickedColor = colorInput.value;

  colorInput.addEventListener(`input`, function () {
    pickedColor = colorInput.value;
  });

  const rangeInput = document.getElementById(`gridSizeRange`);
  const rangeValue = document.getElementById(`gridSizeValue`);

  rangeInput.addEventListener(`input`, function () {
    rangeValue.textContent = rangeInput.value;
    gridMultiplier = parseInt(rangeInput.value);
    blockSize = CANVAS_SIZE / gridMultiplier;
    createGrid();
  });

  head.appendChild(document.createElement(`style`));
  const style = head.querySelector(`style`);

  function pixelBuilder(parentElement, tagName, className) {
    const element = document.createElement(tagName);
    element.setAttribute(`class`, className);
    element.setAttribute(`data-colored`, `false`);
    parentElement.appendChild(element);
  }

  function colorPixel(pixel) {
    pixel.style.background = pickedColor;
    if (pickedColor !== `white`) {
      pixel.style.borderStyle = `none`;
      pixel.style.borderColor = `none`;
    }
    pixel.setAttribute(`data-colored`, `true`);
  }

  function createGrid() {
    gridBlock.innerHTML = ``;

    let LIMIT = gridMultiplier ** 2;
    while (LIMIT--) {
      pixelBuilder(gridBlock, `span`, `pixel`);
    }

    const pixels = document.getElementsByClassName(`pixel`);
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].addEventListener(`mouseenter`, function (e) {
        if (!(e.ctrlKey || e.metaKey)) {
          colorPixel(this);
        }
      });

      pixels[i].addEventListener(`touchstart`, function (event) {
        colorPixel(this);
        event.preventDefault();
      });

      pixels[i].addEventListener(`touchmove`, function (event) {
        const touch = event.touches[0];
        const pixel = document.elementFromPoint(touch.clientX, touch.clientY);
        if (pixel && pixel.classList.contains(`pixel`)) {
          colorPixel(pixel);
        }
        event.preventDefault();
      });
    }

    const styleSheet = `
    
      .pixel {
        background: transparent;
        width: ${blockSize}px;
        height: ${blockSize}px;
        border: 1px solid whitesmoke;
      }

    `;
    style.innerHTML = styleSheet;
  }

  createGrid(); // Initial grid creation

  document.querySelector(`button.clear`).addEventListener(`click`, () => {
    document.querySelectorAll(`.pixel`).forEach(pixel => {
      pixel.style.background = `none`;
      pixel.style.borderColor = ``;
      pixel.setAttribute(`data-colored`, `false`);
    });
  });

  document.querySelector(`button.gridLinesOff`).addEventListener(`click`, () => {
    document.querySelectorAll(`.pixel`).forEach(pixel => {
      pixel.style.border = `none`;
    });
  });

  document.querySelector(`button.gridLinesOn`).addEventListener(`click`, () => {
    document.querySelectorAll(`.pixel`).forEach(pixel => {
      if (pixel.getAttribute(`data-colored`) === `false`) {
        pixel.style.border = `1px solid gainsboro`;
      }
    });
  });

  document.querySelector(`button.eraser`).addEventListener(`click`, () => {
    pickedColor = `white`;
  });
});
