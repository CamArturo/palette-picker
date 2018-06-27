exports.seed = function (knex, Promise) {
  return (
    knex('palettes')
      .del()
      .then(() => knex('projects').del())
      .then(() => {
        return Promise.all([
          knex('projects')
            .insert(
              {
                project_name: 'turing'
              },
              'id'
            )
            .then(project => {
              return knex('palettes').insert([
                {
                  palette_name: 'warm',
                  color1: '#000000',
                  color2: '#111111',
                  color3: '#ffffff',
                  color4: '#bcbcbc',
                  color5: '#fffff',
                  project_id: project[0]
                },
                {
                  palette_name: 'cold',
                  color1: '#000000',
                  color2: '#111111',
                  color3: '#ffffff',
                  color4: '#bcbcbc',
                  color5: '#fffff',
                  project_id: project[1]
                }
              ]);
            })
            .then(() => console.log('Seeding complete!'))
            .catch(error => console.log(`Error seeding data: ${error}`))
        ]);
      })
      .catch(error => console.log(`Error seeding data: ${error}`))
  );
};