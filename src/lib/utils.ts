function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addTableResizableColumnEvents(
  column: HTMLElement,
  resizer: HTMLElement,
): void {
  let x = 0;
  let w = 0;

  const mouseDownHandler = (e: MouseEvent | TouchEvent) => {
    if (e instanceof MouseEvent) {
      x = e.clientX;
    } else {
      x = e.touches[0].clientX;
    }

    const styles = window.getComputedStyle(column);
    w = parseInt(styles.width, 10);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("touchmove", mouseMoveHandler);
    document.addEventListener("touchend", mouseUpHandler);

    resizer.classList.add("resizer__dragging");
  };

  const mouseMoveHandler = (e: MouseEvent | TouchEvent) => {
    let dx;
    if (e instanceof MouseEvent) {
      dx = e.clientX - x;
    } else {
      dx = e.touches[0].clientX - x;
    }

    column.style.width = `${w + dx}px`;
  };

  const mouseUpHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    document.removeEventListener("touchmove", mouseMoveHandler);
    document.removeEventListener("touchend", mouseUpHandler);

    resizer.classList.remove("resizer__dragging");
  };

  resizer.addEventListener("mousedown", mouseDownHandler);
  resizer.addEventListener("touchstart", mouseDownHandler);
}

export { capitalizeFirstLetter, addTableResizableColumnEvents };
