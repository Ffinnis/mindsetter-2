import rect from "./rect";
import clear from "./clear";

const start = (canvas: HTMLCanvasElement) => {
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  const boundingRect = canvas.getBoundingClientRect();
  const offsetX: number = boundingRect.left;
  const offsetY: number = boundingRect.top;
  const canvasWidth: number = canvas.width;
  const canvasHeight: number = canvas.height;

  let dragIsOk: boolean = false;
  let startX, startY: number;

  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUp;
  canvas.onmousemove = mouseMove;

  const rects: any[] = [];

  rects.push({
    x: 75 - 15,
    y: 50 - 15,
    width: 30,
    height: 30,
    fill: "#444444",
    isDragging: false,
  });
  rects.push({
    x: 75 - 25,
    y: 50 - 25,
    width: 30,
    height: 30,
    fill: "#ff550d",
    isDragging: false,
  });
  rects.push({
    x: 75 - 35,
    y: 50 - 35,
    width: 30,
    height: 30,
    fill: "#800080",
    isDragging: false,
  });
  rects.push({
    x: 75 - 45,
    y: 50 - 45,
    width: 30,
    height: 30,
    fill: "#0c64e8",
    isDragging: false,
  });

  draw();

  function draw() {
    clear(ctx, canvasWidth, canvasHeight);
    ctx.fillStyle = "#FAF7F8";
    rect(ctx, 0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      ctx.fillStyle = r.fill;
      rect(ctx, r.x, r.y, r.width, r.height);
    }
  }

  function mouseDown(e: Event) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // test each rect to see if mouse is inside
    dragIsOk = false;
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragIsOk = true;
        r.isDragging = true;
      }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
  }

  function mouseUp(e: Event) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragIsOk = false;
    for (var i = 0; i < rects.length; i++) {
      rects[i].isDragging = false;
    }
  }
  function mouseMove(e: Event) {
    // if we're dragging anything...
    if (dragIsOk) {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      var mx = parseInt(e.clientX - offsetX);
      var my = parseInt(e.clientY - offsetY);

      // calculate the distance the mouse has moved
      // since the last mousemove
      var dx = mx - startX;
      var dy = my - startY;

      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;
        }
      }

      // redraw the scene with the new rect positions
      draw();

      // reset the starting mouse position for the next mousemove
      startX = mx;
      startY = my;
    }
  }
};

export default start;
