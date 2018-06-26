const generateColor = () => {
  let palette = '#';
  const chars = '0123456789ABCDEF';

  for (let i = 0; i < 6; i++) {
    palette += chars.charAt(Math.floor(Math.random() * 16));
  }

  return palette;
};

const generateFiveColors = () => {
  const colorPalette = [];
  for (let i = 0; i <= 4; i++) {
    const hexColor = generateColor();
    colorPalette.push(hexColor);
  }
  console.log(colorPalette);
  return colorPalette;
};

$('.generator-btn').on('click', generateFiveColors);