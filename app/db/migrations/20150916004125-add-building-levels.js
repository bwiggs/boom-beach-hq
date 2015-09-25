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
    experience: { type: 'int'},
    required_hq: { type: 'int'}
  }, insertBuildingLevels);

  function insertBuildingLevels(err) {
    var buildingLevels = {};
    var records = [];
    var parser = parse({delimiter: ',', columns: true});

    parser.on("readable", function(){
      var record;
      while (record = parser.read()) {
        processRecord(record);
      }
    });

    function processRecord(record) {
      var name = record.name;
      var type = record.type;

      delete record.name;
      delete record.type;

      if(!_.has(buildingLevels, name)) {
        buildingLevels[name] = [];
      }

      _.each(record, function (v, lvl) {

        lvl = parseInt(lvl);

        if(_.isUndefined(v) || _.isEmpty(v)) { return; }

        // console.log(name, 'level['+lvl+']',type, v);
        var level = _.find(buildingLevels[name], {level: lvl});
        if(!level) {
          level = { level: lvl };
          buildingLevels[name].push(level);
        }

        level[type] = v;
      });
    }

    parser.on('finish', function () {
      _.each(buildingLevels, function (levels, name) {
        db.all('select * from buildings where name = ?', name, function (err, results) {
          if(_.isEmpty(results)) { return; }
          var b = results[0];
          _.each(levels, function (level) {

            level.building_id = b.id;
            db.insert(BUILDING_LEVELS_TABLE, _.keys(level), _.values(level));
          });
        });
      });

      callback();
    });

    fs.createReadStream(__dirname+'/../seed/master.csv').pipe(parser);
  }
};

exports.down = function(db, callback) {
  db.dropTable(BUILDING_LEVELS_TABLE, callback);
};
