var roleClearer = {


    run: function (creep) {

        if (!creep.memory.TargetRoomName) {
            creep.memory.TargetRoomName = 'E55N2';
        }

        if (!creep.memory.MyRoomName) {
            creep.memory.MyRoomName = 'E55N2';
        }



        if (creep.memory.working && creep.store.getCapacity() == creep.store.getFreeCapacity()) { // working && 背包为空
            creep.memory.working = false;  // 变为 非building状态

        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
            creep.memory.working = true;  // 变为 building状态

        }
        if (!creep.memory.working) {


            if (toString(creep.room.name) !== toString(creep.memory.TargetRoomName)) {
                // 如果不在源房间  
                creep.moveTo(new RoomPosition(20, 25, creep.memory.TargetRoomName), { visualizePathStyle: { stroke: '#ffffff' } });
            } else {

                if (creep.memory.TargetRoomName == creep.room.name) {
creep.say(55)
                    const target1 = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                    const target2 = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

                    if (target2) {
                        

                        if (creep.pickup(target2) == ERR_NOT_IN_RANGE) {

                            creep.moveTo(target2, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                    else if (target1) {
                        

                        if (creep.dismantle(target1) == ERR_NOT_IN_RANGE) {

                            creep.moveTo(target1, { visualizePathStyle: { stroke: '#ffffff' } });
                        }

                    }
                    else {

                        creep.memory.targetRoom = creep.room.name
                        creep.memory.role = 'harvester'
                    }
                }


            }
        }
        else {
            if (creep.room.name !== creep.memory.MyRoomName) {
                // 如果不在汇房间  
                creep.moveTo(new RoomPosition(20, 25, creep.memory.MyRoomName), { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                console.log((creep.memory.MyRoomName))

                if (creep.memory.MyRoomName == creep.room) {
                    const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if (target) {
                        if (creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }

                }


            }









        }










    }

}

module.exports = roleClearer;