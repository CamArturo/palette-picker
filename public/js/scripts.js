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
  let color = colorPalette.shift();
  return color;
};

const setCSS = () => {
  if ($('.card-1 button').hasClass('open')) {
    $('.card-1 .card-bottom p').remove();
    const color = grabColor();
    $('.card-1 .card').css('background-color', color);
    $(`<p>${color}</p>`).appendTo($('.card-1 .card-bottom'));
  }

  if ($('.card-2 button').hasClass('open')) {
    $('.card-2 .card-bottom p').remove();
    const color = grabColor();
    $('.card-2 .card').css('background-color', color);
    $(`<p>${color}</p>`).appendTo($('.card-2 .card-bottom'));
  }

  if ($('.card-3 button').hasClass('open')) {
    $('.card-3 .card-bottom p').remove();
    const color = grabColor();
    $('.card-3 .card').css('background-color', color);
    $(`<p>${color}</p>`).appendTo($('.card-3 .card-bottom'));
  }

  if ($('.card-4 button').hasClass('open')) {
    $('.card-4 .card-bottom p').remove();
    const color = grabColor();
    $('.card-4 .card').css('background-color', color);
    $(`<p>${color}</p>`).appendTo($('.card-4 .card-bottom'));
  }

  if ($('.card-5 button').hasClass('open')) {
    $('.card-5 .card-bottom p').remove();
    const color = grabColor();
    $('.card-5 .card').css('background-color', color);
    $(`<p>${color}</p>`).appendTo($('.card-5 .card-bottom'));
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
    .then(response => {
      $('#list-projects').append(`<option value=${response.id}>${projectName}</option>`);
    })
    .catch(error => console.log(error));
};

const getHexColors = () => {
  const finalPalette = [];
  for (let i = 1; i <= 5; i++) {
    const hexColor = $(`.card-${i} .card-bottom p`).text();
    finalPalette.push(hexColor);
  }
  savePalette(finalPalette);
};

const getProjectName = () => {
  const projectName = $( "#list-projects option:selected" ).text();
  return projectName;
};

const savePalette = (finalPalette) => {
  const project_id = $('#list-projects').val();
  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({
      palette_name: getProjectName(),
      color1: finalPalette[0],
      color2: finalPalette[1],
      color3: finalPalette[2],
      color4: finalPalette[3],
      color5: finalPalette[4],
      project_id: project_id
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

const deletePalette = (id) => {

  fetch(`/api/v1/palettes/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
};

$(function () {
  fetch('/api/v1/projects', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(response => response.forEach(project => {
      $('#list-projects').append(`<option ${project.project_name} value=${project.id}>${project.project_name}</option>`);
    }))
    .catch(error => console.log(error));

  fetch('/api/v1/palettes', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(response => response.forEach(project => {
      $('.palettes-container').append(`
      <section class="palette">
        <section class="project-title">
          <h3>${project.palette_name}</h3>
        </section>
        <section class="project-body">
          <section class="palette-color-container">
          <p class="palette-title">${project.palette_name}</p>
            <section class="palette-color color1" style="background-color:${project.color1}"><p>${project.color1}</p></section>
            <section class="palette-color color2" style="background-color:${project.color2}"><p>${project.color2}</p></section>
            <section class="palette-color color3" style="background-color:${project.color3}"><p>${project.color3}</p></section>
            <section class="palette-color color4" style="background-color:${project.color4}"><p>${project.color4}</p></section>
            <section class="palette-color color5" style="background-color:${project.color5}"><p>${project.color5}</p></section>
            <button id="${project.id}" class="delete-palette"></button>
          </section>
        </section>
      </section>  
      `)
    }))
    .catch(error => console.log(error));
});


$('.generator-btn').on('click', generateColors);
// $('.delete-project').on('click', deletePalette(event));
$('.palettes-container').click(function (event) {
  const id = event.target.id;
  deletePalette(id);
});
$('.lock-btn').click(function () {
  $(this).toggleClass('open');
});
$('.create-project').on('click', createProject);
$('#save-palette-btn').on('click', getHexColors);
