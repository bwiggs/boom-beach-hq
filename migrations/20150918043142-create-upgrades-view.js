var dbm = global.dbm || require('db-migrate');

exports.up = function(db, callback) {
  var sql = 'create view upgrades as \
  select \
    ub.name, \
    nl.level, \
    max(ub.required_hq, nl.required_hq) as required_hq, \
    nl.gold, nl.wood, nl.stone, nl.iron, nl.time, nl.experience,  \
    printf("%.2f", (1.0 * nl.experience / nl.time * 60)) as exp_per_hour \
  from user_buildings ub \
  join buildings b        on b.id = ub.building_id \
  left join building_levels bl on bl.id = ub.building_level_id \
  join building_levels nl on nl.level = (coalesce(bl.level, 0)+1) AND nl.building_id = ub.building_id;';

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.runSql('drop view upgrades;', callback);
};
