var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var parse = require('csv-parse');
var fs = require('fs');
var _ = require('lodash');

var BUILDING_LEVELS_TABLE = 'building_levels';

exports.up = function(db, callback) {
  db.createTable(BUILDING_LEVELS_TABLE, {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
    building_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'building_levels_building_id_fk',
        table: 'buildings',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    level: { type: 'int'},
    time: { type: 'int'}, //minutes
    gold: { type: 'int'},
    wood: { type: 'int'},
    stone: { type: 'int'},
    iron: { type: 'int'},
    required_hq_level: { type: 'int'},
    experience: { type: 'int'},
  }, insertBuildingLevels);

  function insertBuildingLevels(err) {
    var buildingLevels = [];
    var parser = parse({delimiter: ',', columns: true});

    parser.on("readable", function(){
      var record;
      while (record = parser.read()) {
        buildingLevels.push(record);
      }
    });

    parser.on('finish', function () {

      buildingLevels.forEach(function (bl) {
        var building  = bl;
        db.all('select * from buildings where name = ?', bl.name, function (err, results) {
          var b = results[0];
          var levels = bl;
          delete levels.name;
          _.each(levels, function (time, level) {
            if(level > 1 && time == 0) return;
            time = parseInt(time)
            level = parseInt(level)
            console.log(b.name, "level", level, "time", time);
            var insertion = {
              building_id: b.id,
              time: time,
              level: level
            };
            console.log(insertion);
            db.insert(BUILDING_LEVELS_TABLE, _.keys(insertion), _.values(insertion));
          });


        });
      });

      callback();
    });

    fs.createReadStream(__dirname+'/../data/building-level-times.csv').pipe(parser);
  }
};

exports.down = function(db, callback) {
  db.dropTable(BUILDING_LEVELS_TABLE, callback);
};
