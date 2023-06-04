export function randomColor(rgba = false) {
  if (rgba) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }

  const hex = Math.floor(Math.random() * 0xffffff);
  const color = "#" + hex.toString(16);

  return color;
}
