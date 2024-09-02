// 假设你已经有了creep和targetStorage（即你要转移的storage对象）的引用
var creep = ...; // 你的creep对象
var targetStorage = ...; // 目标storage对象

// 检查creep是否携带有任何资源
if (Object.keys(creep.store).length > 0) {
    // 移动到storage旁边（如果还没在那里的话）
    if (!creep.pos.inRangeTo(targetStorage, 1)) {
        creep.moveTo(targetStorage);
    } else {
        // 在storage旁边时，转移所有资源
        
        for (let resourceType in creep.store) {
            if (creep.store[resourceType] > 0) {
                var transferResult = creep.transfer(targetStorage, resourceType);
                if (transferResult === ERR_NOT_IN_RANGE) {
                    // 处理距离问题（通常不会发生，因为我们之前已经检查了范围）
                } else if (transferResult === ERR_FULL) {
                    // storage已满，可能需要寻找其他storage或等待一段时间再试
                } else if (transferResult !== OK) {
                    // 其他错误情况的处理
                }
            }
        }
    }
}
