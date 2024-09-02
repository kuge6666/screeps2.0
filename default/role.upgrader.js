var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {  // 升级状态&&能量不足的时候，变为采集者
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {  // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.upgrading = true;
        }
        if (creep.memory.upgrading) { // 升级状态，找到控制器并升级 + 可视化
            
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {  // 采集状态 + 可视化
            if (!creep.memory.targetRoom) {
                var container3 = Game.getObjectById('66a7815543f11ef44764e5bb')
                if (creep.withdraw(container3, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.pos != toString(container3.pos)) {
                    creep.moveTo(container3, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else {
                if(creep.memory.targetRoom == creep.room.name){
                    var container = creep.room.container
                if(container.length> 0)  {
                    if (creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    
                    creep.moveTo(container[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
                }
                else{
                    var resources = creep.room.find(FIND_DROPPED_RESOURCES,{
                        filter :(resource) => {
                            return (
                                resource.amount >= creep.getActiveBodyparts(CARRY) * 50
                            )
                        }
                    });
                    if(resources.length>0){
                        
                        if(creep.pickup(resources[0]) == -9){
                            creep.moveTo(resources[0])
                        }
                    }
                }
                
                }
                else{

                    creep.moveTo(new RoomPosition(20, 25, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
                }
                
            }


        }
    }
};

module.exports = roleUpgrader;