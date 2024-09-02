var roleCenter = {

    /** @param {Creep} creep **/
    run: function (creep) {

        creep.say(creep.store.getUsedCapacity() +"/"+ creep.store.getCapacity())
        creep.moveTo(25,30)
        

        if (creep.memory.withdrawed == 'on') {
            var storage = creep.room.storage
            var transfer_state = creep.transfer(storage, RESOURCE_ENERGY)
            if(transfer_state == OK) creep.memory.withdrawed = 'off'
        }
        else {
            
                        
            var terminalAndLink = creep.room.find(FIND_STRUCTURES, {  
                filter: (structure) => {  
                    return (structure.structureType === STRUCTURE_TERMINAL ||  
                            structure.structureType === STRUCTURE_LINK) &&  
                           (Math.abs(creep.pos.x - structure.pos.x) + Math.abs(creep.pos.y - structure.pos.y) === 1) &&  
                           structure.store[RESOURCE_ENERGY] > 0;  
                }  
            });
            
            var withdraw_state = creep.withdraw(terminalAndLink[0], RESOURCE_ENERGY)
            if(withdraw_state == OK) creep.memory.withdrawed = 'on'
                    

            
            
            
            
            




        }
    }
};

module.exports = roleCenter;