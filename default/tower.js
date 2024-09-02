var Tower = {

    run: function (tower) {
       
        
        var targets = _.filter(tower.room.find(FIND_STRUCTURES),  (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_WALL && structure.hits < 100000||
                    structure.structureType == STRUCTURE_ROAD ||
                    structure.structureType == STRUCTURE_RAMPART && structure.hits < 100000
                ) &&
                    structure.hits < structure.hitsMax
            }
        );
        //targets.sort((b, a) => (a.hitsMax - a.hit) - (b.hitsMax - b.hit))
        

        const patient = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        


        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
        else {

            if (targets.length) {
                tower.repair(targets[0])

            }

        }





    }
};

module.exports = Tower;