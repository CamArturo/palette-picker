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
  setCSS(colorPalette);
};



const setCSS = (colorPalette) => {
  $('.card-1').css('background-color', colorPalette[0]);
  $(`<p>${colorPalette[0]}</p>`).appendTo( $( ".card-1 .card-bottom" ) );
  $('.card-2').css('background-color', colorPalette[1]);
  $(`<p>${colorPalette[1]}</p>`).appendTo( $( ".card-2 .card-bottom" ) );
  $('.card-3').css('background-color', colorPalette[2]);
  $(`<p>${colorPalette[2]}</p>`).appendTo( $( ".card-3 .card-bottom" ) );
  $('.card-4').css('background-color', colorPalette[3]);
  $(`<p>${colorPalette[3]}</p>`).appendTo( $( ".card-4 .card-bottom" ) );
  $('.card-5').css('background-color', colorPalette[4]);
  $(`<p>${colorPalette[4]}</p>`).appendTo( $( ".card-5 .card-bottom" ) );
};

$('.generator-btn').on('click', generateFiveColors);
$('.lock-btn').on('click', () => {
  $(".lock-btn").toggleClass('open');
});