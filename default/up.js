var roleUp = {

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
            var source = creep.room.find(FIND_SOURCES)
            var harvested = creep.harvest(source[0])
            if( harvested == -9) creep.moveTo(source[0])
        }
    }
};

module.exports = roleUp;