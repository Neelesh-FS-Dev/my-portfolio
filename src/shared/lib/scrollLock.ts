let count = 0;
let prevOverflow = "";

export function lockBodyScroll(): () => void {
  if (count === 0) {
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  count++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    count = Math.max(0, count - 1);
    if (count === 0) {
      document.body.style.overflow = prevOverflow;
    }
  };
}
