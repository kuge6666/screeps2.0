Creep.prototype.reachTo = function (fromPos, toPos) {

    Memory.reachTo = Memory.reachTo || []
    if (!Memory.reachTo.some(reachTo => reachTo.fromPos === fromPos.id && reachTo.toPos === toPos.id)) {
        var path = this.room.findPath(fromPos.pos, toPos.pos, { ignoreCreeps: true })
        Memory.reachTo.push({
            'fromPos': fromPos.id,
            'toPos': toPos.id,
            'path': path
        })
    }
    else {

        if (this.pos.x == toPos.pos.x && this.pos.y == toPos.pos.y) {
            return OK;
        }
        else {
            var reachTo = Memory.reachTo.find(reachTo => reachTo.fromPos === fromPos.id &&
                reachTo.toPos === toPos.id)
            var path = reachTo.path
            this.moveByPath(path)
        }

    }







};


require('./structure')
require('极致建筑缓存');
require('超级移动优化');

var roleUp = require('up');
var roleCg = require('cg');
var Tower = require('tower');
var Link = require('link')
var roleClearer = require('role.clearer');
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleCharger = require('role.charger')
var roleHarvester = require('role.harvester')
var roleTransfer = require('role.transfer')
var roleDispense = require('role.dispense');
const roleAttack = require('./attacker');
var roleCenter = require('./role.center')
var roleCharger = require('role.charger')
var roleGogo = require('./gogo')
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

module.exports.loop = function () {


    //require('functions');
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('删除' + name)
            continue;
        }

    }
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
    spawn("Spawn1", 'up', [WORK,CARRY,CARRY,MOVE,MOVE]
    , { role: 'up' }, 3)
    spawn("Spawn3", 'cg', [WORK,CARRY,CARRY,MOVE,MOVE]
        , { role: 'cg' }, 3)


    // // 注意：这里假设你已经包含了lodash库，因为_.isEqual和_.filter是lodash的方法  
    // // 如果你不想使用lodash，你可以自己实现一个深度比较函数或使用其他库

    //spawn("Spawn1", '宇宙最帅', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
    //     , { role: 'center' }, 1)
    // // spawn("Spawn3", 'transfer', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE]
    // //     , { role: 'transfer' ,targetRoom: 'E52N4' }, 1)
    // //spawn("Spawn2", 'transfer', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE]
    // //   , { role: 'transfer' ,targetRoom: 'E52N4' }, 1)
    // spawn("Spawn2", 'gogo', [ CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY,MOVE,MOVE]
    //     , { role: 'gogo'}, 10)
    // spawn("Spawn2", 'transfer666', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
    //     , { role: 'transfer', targetRoom: 'E53N4' }, 1)

    // spawn("Spawn3", 'harvester', [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
    //     , { role: 'harvester', targetRoom: 'E52N4' }, 2)
    // spawn("Spawn2", 'harvester', [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
    //     , { role: 'harvester', targetRoom: 'E52N4' }, 2)
    // spawn("Spawn1", 'harvester', [WORK, WORK,WORK,WORK, CARRY, MOVE, MOVE, MOVE]
    //     , { role: 'harvester', targetRoom: 'E55N2' }, 2)


    // spawn("Spawn2", 'harvester', [WORK, WORK, WORK,WORK, WORK, WORK,WORK, WORK, WORK,WORK, WORK, WORK,WORK,MOVE,MOVE,MOVE]
    //     , { role: 'harvester', targetRoom: 'E53N4' }, 2)
    // spawn("Spawn1", 'upgrader', [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    //     , { role: 'upgrader' }, 1)
    // spawn("Spawn2", 'upgrader2', [WORK, WORK,WORK, WORK,WORK, WORK,WORK, WORK,WORK, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,MOVE,MOVE,MOVE]
    //     , { role: 'upgrader', targetRoom: 'E53N4' }, 5)
    // spawn("Spawn2", 'builder2', [WORK, WORK, WORK,WORK, WORK, WORK,WORK, WORK, WORK,WORK, WORK, WORK,WORK, WORK,WORK,MOVE,MOVE,MOVE]
    //     , { role: 'builder', targetRoom: 'E53N4' }, 1)

    // // spawn("Spawn2", 'transfer2', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY, MOVE, CARRY, CARRY, MOVE,CARRY, CARRY]
    // //     , { role: 'transfer',targetRoom: 'E52N4'}, 2)
    // spawn("Spawn2", 'charger', [CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE,CARRY, CARRY, MOVE]
    //     , { role: 'charger', targetRoom: 'E52N4' }, 3)
    // spawn("Spawn2", 'changer222', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
    //     , { role: 'charger', targetRoom: 'E53N4' }, 1)
    // spawn("Spawn1", 'charger', [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
    //     , { role: 'charger', targetRoom: 'E52N4' }, 2)

    // //spawn("Spawn1", 'clearer', [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE]
    // //    , { role: 'clearer' }, 1)

    // //Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,MOVE,ATTACK,ATTACK], 'killer666',
    // //   { memory: { role: 'attacker' } });
    // //Memory.E53N4resreve = Memory.E53N4resreve - 1

    // //  Game.spawns["Spawn1"].spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'up',
    // //     { memory: { role: 'dispense' } });

    // // const attack_E53N4 = Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS);
    // // if (attack_E53N4.length > 0) {
    // //     Game.spawns["Spawn2"].spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, ATTACK, ATTACK, MOVE, MOVE], 'killer1',
    // //         { memory: { role: 'attacker' } });
    // // }






    const target = Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES);

    if (target.length > 0) {

        spawn("Spawn1", 'builder1', [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            , { role: 'builder' }, 1)
        spawn("Spawn3", 'builder1', [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            , { role: 'builder' }, 1)
    }

    towerList = ['66b8c15b9d1073ae812ed539', '66b235c92f8bbd3dcbcef53b', '66b8c6a543f2b148786ce1f4', '66b8c615e9672aa8b7aef37e', '66b8c6a543f2b148786ce1f4','66c62a3f08e85cdddec483d3']
    for (towerid of towerList) {
        tower = Game.getObjectById(towerid)

        Tower.run(tower)

    }
    // linkList = ['66b4b02d22e467e74650cbd5','66b4a95c08e85c5564bfbf62','66b4ba7d43f2b1d42f6bc112','66b4c7633533cc3528f440aa']
    // for (linkid of linkList) {
    //     link = Game.getObjectById(linkid)

    //     Link.run(link)
    // }

    var source_linkList = ['66b4b02d22e467e74650cbd5', '66b4a95c08e85c5564bfbf62']
    var center_link = Game.getObjectById('66b4ba7d43f2b1d42f6bc112')
    var up_link = Game.getObjectById('66b4c7633533cc3528f440aa')
    for (var i = 0; i < source_linkList.length; i++) {

        var source_linkId = source_linkList[i]
        var source_link = Game.getObjectById(source_linkId)

        if (center_link.store[RESOURCE_ENERGY] == 800) {
            if (up_link.store.getUsedCapacity() == 0) {
                center_link.transferEnergy(source_link)
            }

        }
        else {
            console.log(source_link.store[RESOURCE_ENERGY] == 800)
            if (source_link.store[RESOURCE_ENERGY] == 800) {
                console.log(2)
                var source_link_state = source_link.transferEnergy(center_link)
                console.log(source_link_state)//-7 why?
            }
        }


    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'up'){
            roleUp.run(creep);
        }
        if (creep.memory.role == 'cg'){
            roleCg.run(creep);

        }
        if (creep.memory.role == 'clearer') {
            roleClearer.run(creep);
        }
        if (creep.memory.role == 'center') {
            roleCenter.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'charger') {
            roleCharger.run(creep);
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'transfer') {
            roleTransfer.run(creep);
        }
        if (creep.memory.role == 'dispense') {
            roleDispense.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttack.run(creep);
        }
        if (creep.memory.role == 'charger') {
            roleCharger.run(creep);
        }
        if (creep.memory.role == 'gogo') {
            roleGogo.run(creep);
        }
    }
    if (Game.spawns["Spawn1"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
        Game.spawns["Spawn1"].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns["Spawn1"].pos.x + 1,
            Game.spawns["Spawn1"].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    if (Game.spawns["Spawn2"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns["Spawn2"].spawning.name];
        Game.spawns["Spawn2"].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns["Spawn2"].pos.x + 1,
            Game.spawns["Spawn2"].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    if (Game.spawns["Spawn3"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns["Spawn3"].spawning.name];
        Game.spawns["Spawn3"].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns["Spawn3"].pos.x + 1,
            Game.spawns["Spawn3"].pos.y,
            { align: 'left', opacity: 0.8 });
    }

}