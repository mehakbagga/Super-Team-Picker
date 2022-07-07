const faker = require("faker")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
 return knex('picker')
 .del()
 .then(function () {
  const picker = []
  for (let i = 0; i < array.length; i++) {
    picker.push(
      {
        title: faker.hacker.verb(),
        content: faker.company.catchParser(),
        imageUrl: faker.image.imageUrl(),
        username: faker.name.firstName()
      }
    )
}
    return knex('picker').insert(picker)
 })
};
