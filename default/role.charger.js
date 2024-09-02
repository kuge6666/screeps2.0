var roleCharger = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var container3 = Game.getObjectById('66a7815543f11ef44764e5bb')
        var extensionsAndSpawn = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                    &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
            }
        });


        if (extensionsAndSpawn.length > 0) {
            creep.transfer(extensionsAndSpawn[0], RESOURCE_ENERGY)
        }







        if (creep.memory.energy && creep.store[RESOURCE_ENERGY] == 0) {  // 状态机
            creep.memory.energy = false;
        }
        if (!creep.memory.energy && creep.store.getFreeCapacity() == 0) {
            creep.memory.energy = true;
        }
        if (!creep.memory.energy) {
            if (!creep.memory.targetRoom || creep.room.name == creep.memory.targetRoom) {

                state = creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
                if (state == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffffff' } });
                }

            }
        else {
            if (creep.room.name !== creep.memory.targetRoom) {
                // 如果不在源房间  
                creep.moveTo(new RoomPosition(20, 25, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        }
            
        else {


        var targets = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => {
            return (
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ||
                structure.structureType == STRUCTURE_TOWER && (structure.store.getCapacity(RESOURCE_ENERGY) - structure.store.getFreeCapacity(RESOURCE_ENERGY)) < structure.store.getCapacity(RESOURCE_ENERGY) * 0.8;
        }
        );


        if(container3 && creep.room.name == 'E52N4') {
            if (container3.store.getCapacity() - container3.store.getFreeCapacity() < container3.store.getCapacity() * 0.8) {
    var targets = [...targets, container3];
}
            }


targets.sort((a, b) => {

    if (a.structureType === STRUCTURE_EXTENSION) return -1;
    if (b.structureType === STRUCTURE_EXTENSION) return 1;
    if (a.structureType === STRUCTURE_TOWER) return -1;
    if (b.structureType === STRUCTURE_TOWER) return 1;
    if (a.structureType === STRUCTURE_SPAWN) return -1;
    if (b.structureType === STRUCTURE_SPAWN) return 1;


    if (a.structureType === STRUCTURE_CONTAINER) return -1;
    if (b.structureType === STRUCTURE_CONTAINER) return 1;


});



if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
}

if (targets.length > 1 && creep.transfer(targets[0], RESOURCE_ENERGY) == OK &&
    creep.store.getCapacity - creep.store.getFreeCapacity > 0
) {
    creep.moveTo(targets[1], { visualizePathStyle: { stroke: '#ffffff' } });
}
if (targets.length == 0 || creep.store.getCapacity - creep.store.getFreeCapacity == 0) {
    creep.moveTo(23, 35, { visualizePathStyle: { stroke: '#ffffff' } });
}
            
        }

    }
};

module.exports = roleCharger;