var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var parse = require('csv-parse');
var fs = require('fs');
var _ = require('lodash');

USER_BUILDINGS_TABLE = 'user_buildings';

exports.up = function(db, callback) {

  db.createTable(USER_BUILDINGS_TABLE, {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
    building_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'user_buildings_building_id_fk',
        table: 'buildings',
        mapping: 'id',
      }
    },
    building_level_id: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        name: 'user_buildings_building_level_id_fk',
        table: 'building_levels',
        mapping: 'id',
      }
    },
    name: { type: 'string' },
    required_hq: { type: 'int', notNull: true, unsigned: true}
  }, loadUserBuildings);

  function loadUserBuildings() {
    var userBuildings = [];

    var parser = parse({delimiter: ',', columns: true});
    parser.on("readable", readRows);
    parser.on('finish', insertUserBuildings);
    fs.createReadStream(__dirname+'/../seed/buildings-per-hq.csv').pipe(parser);

    function readRows() {
      var record;
      while (record = parser.read()) {
        processRow(record);
      }
    }

    function processRow(row) {
      var buildings_per_hq_level = _.clone(row);
      delete buildings_per_hq_level.name
      var prevQty = 0;
      _.each(buildings_per_hq_level, function(qty, hqLvl) {
        qty = parseInt(qty);
        hqLvl = parseInt(hqLvl);
        if(qty == 0) return;
        if(qty != prevQty) {
          var numNewBuildings = qty - prevQty;
          for(i = 0; i < numNewBuildings; i++) {
            userBuildings.push({name: row.name, required_hq: hqLvl })
          }
        }
        prevQty = qty;
      });
    }

    function insertUserBuildings() {
      db.all('select bl.id, bl.building_id, b.name from building_levels bl join buildings b on b.id = bl.building_id where bl.level = 1', function(err, buildingLevels) {
        // console.log(buildingLevels);
        _.each(userBuildings, function(ub) {

          bl = _.find(buildingLevels, function(b){ return b.name == ub.name });
          if(bl) {
            ub.building_id = bl.building_id;
            if(ub.name == "Headquarters") {
              ub.building_level_id = bl.id;
            }
            db.insert(USER_BUILDINGS_TABLE, _.keys(ub), _.values(ub));
          } else {
            console.log('missing', ub);
          }
        });
        callback();
      });
    }
  }
};

exports.down = function(db, callback) {
  db.dropTable(USER_BUILDINGS_TABLE, callback);
};
