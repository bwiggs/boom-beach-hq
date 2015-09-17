var dbm = global.dbm || require('db-migrate');

exports.up = function(db, callback) {
  var sql = 'create view upgrades as select b.id, b.name, bl.level, bl.time, bl.required_hq, bl.gold, bl.wood, bl.stone, bl.iron, bl.experience, (1.0 * bl.experience / bl.time * 60) as exp_per_hour from buildings b join building_levels bl on bl.building_id = b.id order by b.name, bl.level';
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.runSql('drop view upgrades;', callback);
};
