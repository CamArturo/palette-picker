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
  $(`<p>${colorPalette[0]}</p>`).appendTo($('.card-1 .card-bottom'));
  $('.card-2').css('background-color', colorPalette[1]);
  $(`<p>${colorPalette[1]}</p>`).appendTo($('.card-2 .card-bottom'));
  $('.card-3').css('background-color', colorPalette[2]);
  $(`<p>${colorPalette[2]}</p>`).appendTo($('.card-3 .card-bottom'));
  $('.card-4').css('background-color', colorPalette[3]);
  $(`<p>${colorPalette[3]}</p>`).appendTo($('.card-4 .card-bottom'));
  $('.card-5').css('background-color', colorPalette[4]);
  $(`<p>${colorPalette[4]}</p>`).appendTo($('.card-5 .card-bottom'));
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

$('.generator-btn').on('click', generateFiveColors);
$('.lock-btn').click(function () {
  $(this).toggleClass('open');
});

$('.create-project').on('click', createProject);

$(function() {
  fetch('/api/v1/projects', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(response => response.forEach(project => {
      $('#list-projects').append(`<option ${project.project_name} value= selected>${project.project_name}</option>`);
    }))
    .catch(error => console.log(error));
});