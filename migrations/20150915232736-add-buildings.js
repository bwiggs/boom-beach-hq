var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var _ = require('lodash');

var BUILDINGS_TABLE = 'buildings';

exports.up = function(db, callback) {

  db.createTable(BUILDINGS_TABLE, {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
    name: 'string',
    type: 'string',
    max_level: 'int'
  }, insertBuildings);

  function insertBuildings(err) {
    if (err) { callback(err); return; }

    [
      { name: 'Headquarters'    , type: 'other'  , max_level: 20 },
      // defense
      { name: 'Sniper Tower'    , type: 'defense', max_level: 20 },
      { name: 'Machine Gun'     , type: 'defense', max_level: 20 },
      { name: 'Mortar'          , type: 'defense', max_level: 20 },
      { name: 'Cannon'          , type: 'defense', max_level: 20 },
      { name: 'Flame Thrower'   , type: 'defense', max_level: 17 },
      { name: 'Boom Cannon'     , type: 'defense', max_level: 14 },
      { name: 'Rocket Launcher' , type: 'defense', max_level: 13 },
      { name: 'Shock Launcher'  , type: 'defense', max_level: 9 },
      // economy
      { name: 'Vault'           , type: 'economy', max_level: 10 },
      { name: 'Residence'       , type: 'economy', max_level: 10 },
      { name: 'Sawmill'         , type: 'economy', max_level: 10 },
      { name: 'Quarry'          , type: 'economy', max_level: 10 },
      { name: 'Iron Mine'       , type: 'economy', max_level: 10 },
      { name: 'Gold Storage'    , type: 'economy', max_level: 10 },
      { name: 'Wood Storage'    , type: 'economy', max_level: 10 },
      { name: 'Stone Storage'   , type: 'economy', max_level: 10 },
      { name: 'Iron Storage'    , type: 'economy', max_level: 10 },
      // support
      { name: 'Landing Craft'   , type: 'support', max_level: 20 },
      { name: 'Gunboat'         , type: 'support', max_level: 20 },
      { name: 'Radar'           , type: 'support', max_level: 20 },
      { name: 'Armory'          , type: 'support', max_level: 20 },
      { name: 'Submarine'       , type: 'support', max_level: 10 },
      { name: 'Sculptor'        , type: 'support', max_level: 8 },
      { name: 'Weapon Lab'      , type: 'support', max_level: 5 }
    ].forEach(function (building) {
      var b = db.insert(BUILDINGS_TABLE, _.keys(building), _.values(building));
    });

    callback();
  }
};

exports.down = function(db, callback) {
  db.dropTable(BUILDINGS_TABLE, callback);
};
