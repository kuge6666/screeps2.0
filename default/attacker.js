var roleAttack = {

    /** @param {Creep} creep **/
    run: function (creep) {
        room = 'E52N4'
        

        if (creep.room.name !== room) {
            // 如果不在源房间  
            creep.moveTo(new RoomPosition(20, 25, room), { visualizePathStyle: { stroke: '#ffffff' } });
        } else {

            const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if(creep.attack(target) == -9){
                creep.moveTo(target)
            }
            if(creep.rangedAttack(target) == -9){
                creep.moveTo(target)
            }
            if(!target){
                const target = creep.pos.findClosestByPath(FIND_MY_CREEPS,{
                    filter: (creep) =>( creep.hits < creep.hitsMax)
                });
                if(creep.heal(target) == -9){
                    creep.moveTo(target)
                }
                
            }
        }




    }
};

module.exports = roleAttack;