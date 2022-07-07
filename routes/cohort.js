const express = require('express');
const knex = require('../db/client');

const router = express.Router();
const cookieParser = require('cookie-parser');


router.use(cookieParser());

router.use(express.urlencoded({
  extended: true
}));


router.get('/new', (req, res) => {
  res.render('pickers/new');
});


router.post('/new', (req, res) => {
  knex
    .insert({
      imgURL: req.body.imgURL,
      name: req.body.cohortName
    })
    .into('cohorts')
    .returning('*')
    .then(([cohort]) => {
      for (let member of req.body.members.split(',')) {
        knex
          .insert({
            name: member.trim(),
            cohort_name: req.body.cohortName,
            cohort_id: cohort.id
          })
          .into('members')
          .returning('*')
          .then(([member]) => {

          });
      }
      res.redirect('/cohorts');
    });
});

//


router.post('/:id/teams', (req, res) => {

  const id = req.params.id;
  res.cookie("request", JSON.stringify(req.body));
  res.redirect('/cohorts/' + req.params.id);

});


router.delete('/:id', (req, res) => {
  const id = req.params.id;

  knex('cohorts')
    .where('id', id)
    .del()
    .then(() => {
      knex('members')
        .where('cohort_id', id)
        .del()
        .then(() => {
          res.redirect('/cohorts');
        })
    });

});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  knex
    .select('cohort_name', 'members.name', "imgURL")
    .from('members')
    .where('cohorts.id', req.params.id)
    .innerJoin('cohorts', 'members.cohort_name', 'cohorts.name')
    .then(cohortMembers => {
      if (cohortMembers) {
        const cohort = {
          members: []
        };
        let i = 0;
        for (let member of cohortMembers) {
          cohort["members"].push(member.name);

          if (i == cohortMembers.length - 1) {
            cohort["cohortName"] = member.cohort_name;
            cohort["id"] = req.params.id;
            cohort["imgURL"] = member.imgURL;
          }
          i += 1;
        }
        res.render('pickers/edit', {
          cohort
        });

      } else {
        res.send("pickers/edit", {
          cohort: undefined
        });
      }
    });

});








module.exports = router;