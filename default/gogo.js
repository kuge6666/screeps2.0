var roleGogo = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var room = 'E52N4'
        var my = 'E53N4'
        if(!creep.memory.working) {
            creep.memory.working = false;
        }
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {  // 升级状态&&能量不足的时候，变为采集者
            creep.memory.working = false;

        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {  // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.working = true;

        }
        if(creep.memory.working == false){
            if (creep.room.name !== my) {
                // 如果不在源房间  
                creep.moveTo(new RoomPosition(20, 25, my), { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                var storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (storage.length > 0) {
                    console.log(555)
                    if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffaa00' } });

                    }
                }
            }
        }
        else{
            if (creep.room.name !== room) {
            // 如果不在源房间  
            creep.moveTo(new RoomPosition(20, 25, room), { visualizePathStyle: { stroke: '#ffffff' } });
            } else {

                var storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (storage.length > 0) {
                    if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffaa00' } });

                    }
                }
        }


        }
        




    }
};

module.exports = roleGogo;
















