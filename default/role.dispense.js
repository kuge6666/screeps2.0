var roleDispense = {

    /** @param {Creep} creep **/
    run: function (creep) {
        room = 'E55N2'

        if (creep.room.name !== room) {
            // 如果不在源房间  
            creep.moveTo(new RoomPosition(20, 25, room), { visualizePathStyle: { stroke: '#ffffff' } });
        } else {

            if (creep.room.controller) {
                if (creep.ticksToLive <= 1) {
                    Memory.E53N4resreve = 957
                }
                else{
                    if(Memory.E53N4resreve){
                        delete Memory.E53N4resreve
                    }
                }
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller,{ignoreCreeps : false});
                }
            }
        }




    }
};

module.exports = roleDispense;