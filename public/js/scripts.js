// const generateColor = () => {
//   let palette = '#';
//   const chars = '0123456789ABCDEF';
//
//   for (let i = 0; i < 6; i++) {
//     palette += chars.charAt(Math.floor(Math.random() * 16));
//   }
//
//   return palette;
// };

let colorPalette = [];

const removePreviousColorPalette = () => {
  colorPalette = [];
};

const generateHexColor = () => {
  let hexColor = '#';
  const chars = '0123456789ABCDEF';

  for (let i = 0; i < 6; i++) {
    hexColor += chars.charAt(Math.floor(Math.random() * 16));
  }
  return hexColor;
};

const generateColors = () => {
  let colorAmount = $('.card-container button.open');
  colorAmount = colorAmount.length;

  for (let i = 0; i < colorAmount; i++) {
    const hexColor = generateHexColor();
    colorPalette.push(hexColor);
  }
  setCSS(colorPalette);
  removePreviousColorPalette();
};

const grabColor = () => {
  let color = colorPalette
};

const setCSS = (colorPalette) => {

  if (!$('card-1 button').hasClass('open')) {
    $('.card-1 .card-bottom p').remove();
    $('.card-1 .card').css('background-color', colorPalette[0]);
    $(`<p>${colorPalette[0]}</p>`).appendTo($('.card-1 .card-bottom'));
  }

  if (!$('card-2 button').hasClass('open')) {
    $('.card-2 .card-bottom p').remove();
    $('.card-2 .card').css('background-color', colorPalette[1]);
    $(`<p>${colorPalette[1]}</p>`).appendTo($('.card-2 .card-bottom'));
  }

  if (!$('card-3 button').hasClass('open')) {
    $('.card-3 .card-bottom p').remove();
    $('.card-3 .card').css('background-color', colorPalette[2]);
    $(`<p>${colorPalette[2]}</p>`).appendTo($('.card-3 .card-bottom'));
  }

  if (!$('card-4 button').hasClass('open')) {
    $('.card-4 .card-bottom p').remove();
    $('.card-4 .card').css('background-color', colorPalette[3]);
    $(`<p>${colorPalette[3]}</p>`).appendTo($('.card-4 .card-bottom'));
  }

  if (!$('card-5 button').hasClass('open')) {
    $('.card-5 .card-bottom p').remove();
    $('.card-5 .card').css('background-color', colorPalette[4]);
    $(`<p>${colorPalette[4]}</p>`).appendTo($('.card-5 .card-bottom'));
  }
};

const createProject = () => {
  const projectName = $('#project-name').val();

  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({
      project_name: projectName
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

// generateColors
//

$('.generator-btn').on('click', generateColors);
$('.lock-btn').click(function () {
  $(this).toggleClass('open');
});

$('.create-project').on('click', createProject);

$(function () {
  fetch('/api/v1/projects', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(response => response.forEach(project => {
      $('#list-projects').append(`<option ${project.project_name} value= selected>${project.project_name}</option>`);
    }))
    .catch(error => console.log(error));
});