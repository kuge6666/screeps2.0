var roleHarvester = {


    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.containerNearId) {
            var containerNear = Game.getObjectById(creep.memory.containerNearId)
        }

        if (!creep.memory.targetRoom || creep.room.name == creep.memory.targetRoom) {//房间检测
            harvesters = creep.room.find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return (creep.memory.role == 'harvester')
                }
            })
            var sourceIndexs1 = _.filter(harvesters, (creep) => creep.memory.sourceIndex == 1)
            var sourceIndexs0 = _.filter(harvesters, (creep) => creep.memory.sourceIndex == 0)

            if (sourceIndexs0.length < 1 && creep.memory.sourceIndex == null) {//自动分配矿点
                creep.memory.sourceIndex = 0
            }
            else if (sourceIndexs1.length < 1 && creep.memory.sourceIndex == null) {
                creep.memory.sourceIndex = 1
            }
            //const extensions = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {
            //    filter: (extension) => {
            //        return (extension.structureType == STRUCTURE_EXTENSION &&
            //            extension.store.getFreeCapacity(RESOURCE_ENERGY)) > 0
            //    }
            //});
            //if (extensions.length > 0) {
            //
            //     creep.transfer(extensions[0], RESOURCE_ENERGY)
            //
            // }
            if (!creep.memory.containerNearId) {


                for (var containerNearb of creep.room.container) {

                    if (containerNearb) {
                        
                        if ((Math.pow((creep.room.source[creep.memory.sourceIndex].pos.x - containerNearb.pos.x) , 2) + Math.pow((creep.room.source[creep.memory.sourceIndex].pos.y - containerNearb.pos.y) , 2)) == 1 ||
                            (Math.pow((creep.room.source[creep.memory.sourceIndex].pos.x - containerNearb.pos.x) , 2) + Math.pow((creep.room.source[creep.memory.sourceIndex].pos.y - containerNearb.pos.y) , 2)) == 2) {

                            //console.log(containerNear)
                            creep.memory.containerNearId = containerNearb.id
                            break;
                        }

                    }

                }

            }





            if (!creep.memory.containerNearId) {

                const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (target) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {

                    }

                }
            }

            else if (creep.memory.containerNearId && containerNear < 200000 && creep.room.tower.length == 0) {

                creep.repair(containerNear);
            }
            if (!creep.memory.harvested) {
                creep.memory.harvested = 'off'
            }
            if (creep.memory.harvested == 'on' && containerNear) {
                

                var harvested = creep.harvest(creep.room.source[creep.memory.sourceIndex])
                if (harvested == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.source[creep.memory.sourceIndex], { visualizePathStyle: { stroke: '#ffffff' } })
                }

                if (harvested == ERR_NOT_ENOUGH_RESOURCES && creep.pos.x == containerNear.pos.x && creep.pos.y == containerNear.pos.y&&containerNear.store[RESOURCE_ENERGY] == 2000) {
                    creep.memory.harvested == 'off'
                }
                else {
                    creep.moveTo(containerNear.pos);
                    creep.memory.harvested == 'on'
                }

            }
            if (creep.memory.harvested == 'on') {
                if (!creep.memory.linkNearId)
                    console.log(creep.room.link)
                    for (var linkNear of creep.room.link) {

                        if (linkNear) {
                            
                            if ((Math.pow((creep.pos.x - linkNear.pos.x) , 2) + Math.pow((creep.pos.y - linkNear.pos.y) , 2)) == 1 ||
                            (Math.pow((creep.pos.x - linkNear.pos.x) , 2) + Math.pow((creep.pos.y - linkNear.pos.y) , 2)) == 2) {


                                creep.memory.linkNearId = linkNear.id
                                break;
                            }

                        }

                    }
                if (creep.memory.linkNearId) {
                    var linkNear = Game.getObjectById(creep.memory.linkNearId)
                }

                var withdrawed = creep.withdraw(containerNear, RESOURCE_ENERGY)
                if (withdrawed == OK || withdrawed == ERR_FULL) {
                    creep.transfer(linkNear, RESOURCE_ENERGY)
                }
            }

        }
        else {
            if (creep.room.name !== creep.memory.targetRoom) {
                // 如果不在源房间  

                creep.moveTo(new RoomPosition(20, 25, creep.memory.targetRoom));
                return;
            }

        }












        // 如果有能量，则寻找最近的controller或storage来卸载能量  



    }


};

module.exports = roleHarvester;
