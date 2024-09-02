function spawn(spawnName, creepBaseName, body, memory, numMax) {
    // 确保creep名称的唯一性  
    let creepName = creepBaseName;
    if (numMax > 1) {
        creepName += '_' + Game.time.toString().padStart(6, '0'); // 使用时间戳并填充以确保长度  
    }

    // 检查孵化场是否存在  
    if (!Game.spawns[spawnName]) {
        console.error('Spawn ' + spawnName + ' does not exist!');
        return;
    }

    // 查找具有相同内存对象的creep数量  
    let existingCreeps = _.filter(Game.creeps, (creep) => _.isEqual(creep.memory.role, memory.role) && _.isEqual(creep.memory.targetRoom, memory.targetRoom));
    // 注意：这里使用了lodash的_.isEqual来深度比较内存对象  

    // 如果未达到最大数量，则生成新的creep  
    if (existingCreeps.length < numMax) {

        Game.spawns[spawnName].spawnCreep(body, creepName, { memory: memory });




    }
}
