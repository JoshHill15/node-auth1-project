
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'batman', password: "bat123"},
        {username: 'ironman', password: "handsome"},
        {username: 'wolverine', password: "ripped"}
      ]);
    });
};
