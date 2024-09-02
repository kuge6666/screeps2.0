var roleTransfer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        var pickup = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,1)
        if(pickup){
             creep.pickup(pickup)
        }
       
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





        var containers = _.filter(creep.room.container, (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER &&
                structure !== container3)
        }
        );


        containers.sort((b, a) => (a.store.getCapacity() - a.store.getFreeCapacity()) - (b.store.getCapacity() - b.store.getFreeCapacity()))

        if (creep.memory.energy && creep.store[RESOURCE_ENERGY] == 0) {  // 状态机
            creep.memory.energy = false;
        }
        if (!creep.memory.energy && creep.store.getFreeCapacity() == 0) {
            creep.memory.energy = true;
        }
        
        
            if (!creep.memory.energy) {
                
                if (!creep.memory.targetRoom || creep.room.name == creep.memory.targetRoom) {



                    
                        var withdrawState = creep.withdraw(containers[0], RESOURCE_ENERGY)
                        if (withdrawState == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                        if (withdrawState == OK) {
                            creep.memory.energy = true;
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
                if (creep.room.name == creep.memory.targetRoom || !creep.memory.targetRoom) {
                    for (let resourceType in creep.store) {
                        if (creep.store[resourceType] > 0) {
                            if (creep.transfer(creep.room.storage, (resourceType)) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffffff' } });
                            }
                        }


                    }
                }
                else {
                    creep.moveTo(new RoomPosition(48, 21, 'E52N4'), { visualizePathStyle: { stroke: '#ffffff' } });
                }

            }
            if (containers.length == 0 && !creep.memory.targetRoom) {//无container充spawn
                creep.memory.set = 'spawn'
            }

        
        




    }
};

module.exports = roleTransfer;