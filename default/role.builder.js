var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var pickup = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,1)
        if(pickup){
             creep.pickup(pickup)
        }
        //creep.say(creep.store.getUsedCapacity() +"/"+ creep.store.getCapacity())

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {  // 升级状态&&能量不足的时候，变为采集者
            creep.memory.upgrading = false;

        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {  // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.upgrading = true;

        }
        
        
        
        if (!creep.memory.targetRoom || creep.room.name == creep.memory.targetRoom) {
            if (creep.memory.upgrading) { // 升级状态，找到控制器并升级 + 可视化

                const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (target) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } ,ignoreCreeps:false});
                    }
                }

                else {
                    
                    var targetRepairRoad = _.filter(creep.room.road, (road) => road.hits < road.hitsMax)
                    var targetRepairContainer = _.filter(creep.room.container, (container) => container.hits < container.hitsMax)
                    
                    
                    var targetRepair = [...targetRepairContainer, targetRepairRoad]
                    if (targetRepair.length > 0) {
                        if (creep.repair(targetRepair[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetRepair[0])
                        }
                    }

                }









            }
            else {  // 采集状态 + 可视化



                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store.getCapacity() - structure.store.getFreeCapacity() > creep.getActiveBodyparts(CARRY) * 50)
                    }
                });

                var storage = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (storage.length > 0) {
                    if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffaa00' } });

                    }
                }
                else if (storage.length == 0){
                    var resources = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (resource) => {
                            return (
                                resource.amount >= creep.getActiveBodyparts(CARRY) * 50
                            )
                        }
                    });
                    if (resources.length > 0) {
                        
                        if (creep.pickup(resources[0]) == -9) {
                            creep.moveTo(resources[0])
                        }
            
                    }
                }
                else if (containers[0].store.getUsedCapacity > 0) {
                    if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.memory.pickup == false) {
                        creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });

                    }
                }
                else {
                    const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                    if (target) {
                        if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }

                    }
                }








            }
        }
        else {
            if (creep.room.name !== creep.memory.targetRoom) {
                // 如果不在源房间  
                creep.moveTo(new RoomPosition(20, 25, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
            }

        }

    }
};

module.exports = roleBuilder;