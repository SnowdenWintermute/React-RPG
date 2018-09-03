import React, { Component } from 'react';
import './styles/App.css';
import CharPic from './components/CharPic';
import MoveAnimation from './components/MoveAnimation';
import EnemyPic from './components/EnemyPic';
import Items from './components/Items';
import MoveList from './components/MoveList'
import Equipment from './components/Equipment'
import PlayerStats from './components/PlayerStats'
import EnemyStats from './components/EnemyStats'
import NewGame from './components/NewGame'
import Loot from './components/Loot'
import DeathScreen from './components/DeathScreen'
import VictoryScreen from './components/VictoryScreen'
import createLoot from './functions/itemFunctions/createLoot'
import DeathCombatLog from './components/DeathCombatLog'
import PatchNotes from './components/PatchNotes'

import ClickSound from './sounds/mouseClick.wav'
import ErrorSound from './sounds/errorSound.mp3'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      testingMode:false,
      newGame:true,
      dead:false,
      actionCounter:0,
      battleState:{inCombat:false,treasureRoom:false,stairs:true,timesExplored:0,timesExploredOnCurrentFloor:0,dlvl:1},
      menuPage:0,
      lootMenu:0,
      playerClass:"",
      playerStats: {lvl: 1, hp: 0, maxHp: 0, mp: 0, maxMp: 0, baseDmg: 0,tDmg: 0},
      armorSpikes:0,
      playerSkills: {freePoints:1,armorBreak:0,stun:0,spikedArmor:0,arrow:0,manaLeak:0,flee:0,heatLance:0,eatShard:0,weaken:0},
      enemyStats: {hp:0, maxHp: 0, mp: 0, maxMp: 0, baseDmg:0,def:0,difficulty:0, dex:0},
      enemyType: {},
      enemyMove: "Defense Matrix",
      enemyStunned: false,
      poisonCounter:0,
      arrowsFired:0,
      enemiesDefeated: 0,
      //Equipment
      equipmentStats: {dmg:0,def:0,str:0,dex:0,int:0},
      inventory: {
        mainHand: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        offHand: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        head: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        body: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        ring: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv1: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv2: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv3: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        autoInjectors:1,
        shards:0
    },
      chestOpen:false,
      itemOnGround: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
      combatLog: "",
      //GameState
      statsSet: "no"
    }
    this.handleClick = this.handleClick.bind(this);
    this.getClass = this.getClass.bind(this);
    this.setStartingGear = this.setStartingGear.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
    this.fullHealth = this.fullHealth.bind(this)
  }
//Trade shards
tradeShards = function() {
  let inventory = this.state.inventory
  let tempLog = ""
  if(inventory.shards>=3){
    inventory.shards -= 3
    inventory.autoInjectors += 1
    tempLog = "You trade 3 shards for an autoinjector.\n";
  }else{
    tempLog = "You must have at least 3 shards to trade.\n";
    const errorSound = new Audio();
    errorSound.src = ErrorSound
    errorSound.play();
  }
  this.setState({inventory})
  this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
}
//Use the Stairs
  useStairs=function(direction){
    let battleState = this.state.battleState
    let playerStats = this.state.playerStats
    let playerSkills = this.state.playerSkills
    if(direction==="down"){
      battleState.dlvl ++
      battleState.timesExploredOnCurrentFloor = 0
      this.setState({battleState})
      this.explore();
      if(battleState.dlvl>playerStats.lvl){
        playerStats.lvl++
        playerSkills.freePoints++
      }
    }else if(direction=="up"&&battleState.dlvl!==1){
      battleState.dlvl --
      this.explore();
      battleState.timesExploredOnCurrentFloor = 0
      this.setState({battleState})
    }else{
      let tempLog = "The floor above you is sealed.\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    this.setState({playerStats})
    this.setState({playerSkills})
    this.calculateStats()
  }

  emy = function(){
    let enemyStats = this.state.enemyStats;
    let battleState = this.state.battleState;
    let dlvl = battleState.dlvl;
    let rType = this.getRandomInt(1,4);
    let rDifficulty = this.getRandomInt(2,5);
    let rMove = this.getRandomInt(1,4);
    enemyStats.difficulty = rDifficulty;
    let maxHp = (dlvl * 2) + 3
    let maxMp = (dlvl * 1) + 3
    let enemyMove = this.state.enemyMove
    switch(true){
      case rType === 1:
      this.setState({enemyType:"Warrior"})
      maxHp += rDifficulty*dlvl
      enemyStats.dex = 0
        switch(true){
          case rMove===1:
          enemyMove="Attack"
          break;
          case rMove===2:
          enemyMove="Lifesteal"
          break;
          case rMove===3:
          enemyMove="Poison"
          break;
          default:
        }
      break
      case rType === 2:
      this.setState({enemyType:"Rogue"})
      enemyStats.dex = dlvl + rDifficulty
        switch(true){
          case rMove===1:
          enemyMove="Attack"
          break;
          case rMove===2:
          enemyMove="Ambush"
          break;
          case rMove===3:
          enemyMove="Defense Matrix"
          break;
          default:
        }
      break
      case rType === 3:
      this.setState({enemyType:"Mage"})
      maxMp += rDifficulty * dlvl
      enemyStats.dex = 0
        switch(true){
          case rMove===1:
          enemyMove="Attack"
          break;
          case rMove===2:
          enemyMove="Acid Spines"
          break;
          case rMove===3:
          enemyMove="Poison"
          break;
          default:
        }
      break
      default://nothing
    }
    //set up the stats to go out
    if(this.state.battleState.dlvl===1){
      rDifficulty=2;
    }
    enemyStats.def = dlvl * rDifficulty;
    enemyStats.baseDmg = dlvl * rDifficulty+1;
    enemyStats.maxMp = maxMp
    enemyStats.mp = maxMp
    enemyStats.maxHp = maxHp
    enemyStats.hp = maxHp
    this.setState({enemyMove})
    this.setState({enemyStats})
  }
  calculateStats = function(heal){
    let playerClass = this.state.playerClass;
    let lvl = this.state.playerStats.lvl;
    let hp = this.state.playerStats.hp;
    let mp = this.state.playerStats.mp;
    let equipmentStats = this.state.equipmentStats;
    let mainHand = this.state.inventory.mainHand;
    let offHand = this.state.inventory.offHand;
    let head = this.state.inventory.head;
    let body = this.state.inventory.body;
    let ring = this.state.inventory.ring;
    let str = mainHand.str+offHand.str+head.str+body.str+ring.str;
    let dex = mainHand.dex+offHand.dex+head.dex+body.dex+ring.dex;
    let int = mainHand.int+offHand.int+head.int+body.int+ring.int;
    let wDmg = mainHand.dmg + offHand.dmg
    let sDmg = function(){
      switch(true){
      case playerClass==="Warrior": return str; break
      case playerClass==="Rogue": return dex; break
      case playerClass==="Mage": return int; break
      default: //nothing
    }
    }
    let def = mainHand.def + offHand.def + head.def + body.def + lvl;
    let baseDmg = this.state.playerStats.lvl + 1
    let tDmg = wDmg + baseDmg + sDmg()
    //add for int dex etc
    let maxHp = str +(lvl * 2 + 5);
    let maxMp = int +(lvl * 2 + 2);
    equipmentStats = {dmg:wDmg,def:def,str:str,dex:dex,int:int}
    if(heal){
      hp = maxHp
      mp = maxMp
    }
    let playerStats = {lvl: lvl, hp: hp, maxHp: maxHp, mp: mp, maxMp: maxMp, baseDmg: baseDmg, tDmg: tDmg}
    this.setState((prevState)=>{return{equipmentStats}})
    this.setState((prevState)=>{return{playerStats}})
  }
//Give player full hp
  fullHealth = function(){
    let playerStats = this.state.playerStats
    let maxHp = this.state.playerStats.maxHp
    playerStats.hp=maxHp
    this.setState((prevState)=>{return{playerStats}})
  }
//Give player full mp
  fullMana = function(){
    let playerStats = this.state.playerStats
    let maxMp = this.state.playerStats.maxMp
    playerStats.mp=maxMp
    this.setState((prevState)=>{return{playerStats}})
  }
//Use Autoinjector
  useAutoinjector = function(stat){
    const clickSound = new Audio();
    clickSound.src = ClickSound
    const errorSound = new Audio();
    errorSound.src = ErrorSound
    let inventory = this.state.inventory
    let itemOnGround=this.state.itemOnGround
    if(itemOnGround.type==="Autoinjector"){
      if(stat==="hp"){
        this.fullHealth()
      }
      if(stat==="mp"){
        this.fullMana()
      }
      itemOnGround = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      this.setState({itemOnGround})
    }else if(inventory.autoInjectors!==0){
      if(stat==="hp"){
        this.fullHealth()
      }
      if(stat==="mp"){
        this.fullMana()
      }
      inventory.autoInjectors--
      this.setState({inventory})
    }else{
      let tempLog = "Out of autoinjectors.\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      errorSound.play();
    }
  }
//Open Treasure chest
openTreasureChest = function(){
  let inventory = this.state.inventory
  let itemOnGround = this.state.itemOnGround
  let playerClass = this.state.playerClass
  let chestOpen = this.state.chestOpen
  if(playerClass==="Rogue"){
    if(inventory.shards>0){
    this.createLoot("chest")
    inventory.shards--
    chestOpen = true
    }
    else{
      let tempLog = "You need a shard to pick the lock.\n";
      const errorSound = new Audio();
      errorSound.src = ErrorSound
      errorSound.play();
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
  }else if (inventory.autoInjectors>0){
    this.createLoot("chest")
    inventory.autoInjectors--
    chestOpen = true
  }else{
    let tempLog = "You need an autoinjector to break the lock.\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  this.setState({inventory})
  this.setState({chestOpen})
}
//Give player some equipment at the start of the game
  setStartingGear = function(playerClass){
    let inventory = this.state.inventory
    let mainHand = inventory.mainHand
    let head = inventory.head
    let ring = inventory.ring
    switch(true){
      case playerClass==="Warrior":
      inventory.mainHand = {type:"1H Weapon",dmg: 1, def: 0, str: 1, dex: 0, int: 0}
      inventory.head = {type:"Helm",dmg: 0, def: 1, str: 1, dex: 0, int: 0}
      break
      case playerClass==="Rogue":
      inventory.mainHand = {type:"1H Weapon",dmg: 1, def: 0, str: 0, dex: 1, int: 0}
      inventory.head = {type:"Helm",dmg: 0, def: 1, str: 0, dex: 1, int: 0}
      break
      case playerClass==="Mage":
      inventory.mainHand = {type:"1H Weapon",dmg: 1, def: 0, str: 0, dex: 0, int: 1}
      inventory.head = {type:"Helm",dmg: 0, def: 1, str: 0, dex: 0, int: 1}
      break
      default:
      //nothing
    }
    this.setState((prevState)=>{return{inventory}})
  }
  //Tick the regens of warrior and mages
  tickRegens=function(){
    let playerClass= this.state.playerClass
    let playerStats = this.state.playerStats
    let tempLog = ""
    if(playerClass==="Warrior"&&playerStats.hp<playerStats.maxHp){
      switch(true){
        case playerStats.lvl <= 3||(playerStats.hp+2)>playerStats.maxHp:
        playerStats.hp ++
        tempLog = "You regenerate 1 HP.\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break
        case (playerStats.lvl <= 7&&playerStats.lvl>=4)||(playerStats.hp+3)>playerStats.maxHp:
        playerStats.hp +=2
        tempLog = "You regenerate 2 HP.\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break
        case playerStats.lvl>=8:
        playerStats.hp += 3
        tempLog = "You regenerate 3 HP.\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break
      }
      this.setState({playerStats})
    }
    if(playerClass==="Mage"&&playerStats.mp<playerStats.maxMp){
      switch(true){
        case playerStats.lvl <= 3||(playerStats.mp+2)>playerStats.maxMp:
        playerStats.mp ++
        tempLog = "You refresh 1 MP.\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break
        case (playerStats.lvl <= 7&&playerStats.lvl>=4)||(playerStats.mp+3)>playerStats.maxMp:
        playerStats.mp +=2
        tempLog = "You fresh 2 MP.\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break
        case playerStats.lvl>=8:
        playerStats.mp += 3
        tempLog = "You refresh 3 HP.\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break
      }
      this.setState({playerStats})
    }
  }
//tick poison
tickPoison = function(){
  if(this.state.poisonCounter>0){
    let battleState=this.state.battleState
    let poisonDmg=Math.floor(this.state.battleState.dlvl/2)+1
    let playerStats = this.state.playerStats
    playerStats.hp-=poisonDmg
    this.setState({playerStats})
    let poisonCounter=this.state.poisonCounter
    poisonCounter--
    this.setState({poisonCounter})
    let tempLog = "You lose "+poisonDmg+" HP from poison. ("+(this.state.poisonCounter-1)+" ticks remain)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
}
//Calculate Damage of moves, tick regens, cleanup
  resolveCombat = function(){
    //handle death
    if(this.state.playerStats.hp<=0){
      this.setState({dead:true});
      let tempLog = "Player died.\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    //tick regens
    this.tickRegens()
    this.tickPoison()
    //handle death from poison dmg
    if(this.state.playerStats.hp<=0){
      this.setState({dead:true});
      let tempLog = "Player died.\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    //Handle monster Death, increment counter and print log
    if(this.state.enemyStats.hp<=0){
      let enemyStats = this.state.enemyStats
      let enemiesDefeated = this.state.enemiesDefeated
      enemiesDefeated ++
      this.setState({enemiesDefeated})
      enemyStats.mp = 0
      this.setState({enemyStats})
      let tempLog = "Enemy defeated.\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      //generate loot
      this.createLoot()
      //reset arrow counter
      let arrowsFired = this.state.arrowsFired
      arrowsFired = 0
      this.setState({arrowsFired})
    }
  }
  createLoot = function(origin){
    //dlvl used to determine weapon quality
    let dlvl = this.state.battleState.dlvl
    //possible stats and type
    let itemOnGround = this.state.itemOnGround
    let type = itemOnGround.type
    let dmg = itemOnGround.dmg
    let def = itemOnGround.def
    let str = itemOnGround.str
    let dex = itemOnGround.dex
    let int = itemOnGround.int
    //determine stats
    let statQuality = 0;
    let baseQuality = 0;
    if(origin==="chest"){
      statQuality = this.getRandomInt(1,(dlvl+2))
      baseQuality = this.getRandomInt(1,(dlvl+2))
    }else{
    statQuality = this.getRandomInt(1,(dlvl+1))
    baseQuality = this.getRandomInt(1,(dlvl+1))
    }
    let rStat = this.getRandomInt(1,4)
    //Decide item Type
    let r = this.getRandomInt(1,7)
    switch (true) {
      case r===1:
        type = "1H Weapon"
        dmg = baseQuality
        break;
      case r===2:
        type ="Shield"
        def = baseQuality
        break;
      case r===3:
        type ="Helm"
        def = baseQuality
        break;
      case r===4:
        type ="Armor"
        def = baseQuality*2
        break;
      case r===5:
        type ="Ring"
        statQuality = statQuality*2
        break;
      case r===6:
        type ="Autoinjector"
        break;
      default:
    }
    //apply base stat if item is not an autoInjectors
    if(type!=="Autoinjector"){
    switch (true) {
      case rStat===1:
        str = statQuality
        break;
      case rStat===2:
        dex = statQuality
        break;
      case rStat===3:
        int = statQuality
        break;
      default:
    }
  }
    //set state
    itemOnGround = {type: type,dmg: dmg, def: def, str: str, dex: dex, int: int}
    this.setState({itemOnGround})
  }

  //Move loot from ground to Inventory (if there is room)
  pickUpItem = function(){
    const clickSound = new Audio();
    clickSound.src = ClickSound
    const errorSound = new Audio();
    errorSound.src = ErrorSound
    let itemOnGround = this.state.itemOnGround
    let inventory = this.state.inventory
    if(itemOnGround.type==="Autoinjector"){
      inventory.autoInjectors +=1
      itemOnGround = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
    }else if(inventory.inv1.type===""){
      inventory.inv1 = itemOnGround
      itemOnGround = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
    }else if(inventory.inv2.type===""){
      inventory.inv2 = itemOnGround
      itemOnGround = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
    }else if(inventory.inv3.type===""){
      inventory.inv3 = itemOnGround
      itemOnGround = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
    }else{
      let tempLog = "Your inventory is full! Try breaking down an item into shards."+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      errorSound.play();
    }
    this.setState({inventory})
    this.setState({itemOnGround})
  }
  //equip an item
  equipItem = function(key){
    let inventory = this.state.inventory
    let placeholder = {}
    switch(true){
      //Equip from slot 1
      case key===0:
        switch(true){
          case inventory.inv1.type === "Helm":
          placeholder = inventory.inv1
          inventory.inv1 = inventory.head
          inventory.head = placeholder
          break
          case inventory.inv1.type === "Armor":
          placeholder = inventory.inv1
          inventory.inv1 = inventory.body
          inventory.body = placeholder
          break
          case inventory.inv1.type === "Ring":
          placeholder = inventory.inv1
          inventory.inv1 = inventory.ring
          inventory.ring = placeholder
          break
        }
      break
      case key===1:
        switch(true){
          case inventory.inv2.type === "Helm":
          placeholder = inventory.inv2
          inventory.inv2 = inventory.head
          inventory.head = placeholder
          break
          case inventory.inv2.type === "Armor":
          placeholder = inventory.inv2
          inventory.inv2 = inventory.body
          inventory.body = placeholder
          break
          case inventory.inv2.type === "Ring":
          placeholder = inventory.inv2
          inventory.inv2 = inventory.ring
          inventory.ring = placeholder
          break
        }
      break;
      case key===2:
        switch(true){
          case inventory.inv3.type === "Helm":
          placeholder = inventory.inv3
          inventory.inv3 = inventory.head
          inventory.head = placeholder
          break
          case inventory.inv3.type === "Armor":
          placeholder = inventory.inv3
          inventory.inv3 = inventory.body
          inventory.body = placeholder
          break
          case inventory.inv3.type === "Ring":
          placeholder = inventory.inv3
          inventory.inv3 = inventory.ring
          inventory.ring = placeholder
          break
        }
    }
    this.calculateStats();
    this.setState({inventory})
  }
  //unequip item
  unEquip=function(key,slot){
    let inventory = this.state.inventory
    switch(true){
      //Equip from slot 1
      case key===0:
      this.putInInv(inventory.mainHand)
      inventory.mainHand = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      break
      case key===1:
      this.putInInv(inventory.offHand)
      inventory.offHand = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      break
      case key===2:
      this.putInInv(inventory.head)
      inventory.head = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      break
      case key===3:
      this.putInInv(inventory.body)
      inventory.body = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      break
      case key===4:
      this.putInInv(inventory.ring)
      inventory.ring = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      break
      default:
  }
  this.setState({inventory})
  this.calculateStats()
}
//
putInInv = function(item){
  let inventory = this.state.inventory
  if(inventory.inv1.type===""){
    inventory.inv1 = item
  }else if(inventory.inv2.type===""){
    inventory.inv2 = item
  }else if(inventory.inv3.type===""){
    inventory.inv3 = item
  }else{
    let tempLog = "Your inventory is full! Try breaking down an item into shards."+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  this.setState({inventory})
}
  //equip to right hand
  equipRight=function(key){
    let inventory = this.state.inventory
    let placeholder = {}
    switch(true){
      //Equip from slot 1
      case key===0:
          placeholder = inventory.inv1
          inventory.inv1 = inventory.mainHand
          inventory.mainHand = placeholder
          break
      case key===1:
          placeholder = inventory.inv2
          inventory.inv2 = inventory.mainHand
          inventory.mainHand = placeholder
          break
      case key===2:
          placeholder = inventory.inv3
          inventory.inv13 = inventory.mainHand
          inventory.mainHand = placeholder
          break
        }
      this.setState({inventory})
      this.calculateStats()
  }
  //equip to left hand
  equipLeft=function(key){
    let inventory = this.state.inventory
    let placeholder = {}
    switch(true){
      //Equip from slot 1
      case key===0:
          placeholder = inventory.inv1
          inventory.inv1 = inventory.offHand
          inventory.offHand = placeholder
          break
      case key===1:
          placeholder = inventory.inv2
          inventory.inv2 = inventory.offHand
          inventory.offHand = placeholder
          break
      case key===2:
          placeholder = inventory.inv3
          inventory.inv13 = inventory.offHand
          inventory.offHand = placeholder
          break
        }
      this.setState({inventory})
      this.calculateStats()
  }
  //turn item into shards
  dismantleItem = function(key){
    let inventory = this.state.inventory
    let itemOnGround = this.state.itemOnGround
    switch(true){
      case key===0:
      inventory.inv1 = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      inventory.shards ++
      break;
      case key===1:
      inventory.inv2 = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      inventory.shards ++
      break;
      case key===2:
      inventory.inv3 = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      inventory.shards ++
      break;
      case key===3:
      itemOnGround = {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}
      inventory.shards ++
      break;
      default:
    }
    this.setState({inventory})
    this.setState({itemOnGround})
  }
  combat = function(playerMove){
    //set up player stats
    let playerClass = this.state.playerClass
    let playerStats = this.state.playerStats
    let equipmentStats = this.state.equipmentStats
    let playerHp = playerStats.hp
    let playerMp = playerStats.mp
    let playerDmg = playerStats.tDmg
    let playerDef = equipmentStats.def
    let playerDex = equipmentStats.dex
    //Set up enemy stats
    let enemyType = this.state.enemyType
    let enemyStats = this.state.enemyStats
    let enemyDex = enemyStats.dex
    let enemyHp = enemyStats.hp
    let enemyMp = enemyStats.mp
    let enemyDmg = enemyStats.baseDmg
    let enemyDef = enemyStats.def
    let dlvl = this.state.battleState.dlvl
    let enemyStunned = false
    let enemyMove = this.state.enemyMove

    //compare dex and def
    let enemyNetDef = (enemyDef-Math.floor(playerDex/2)) < 0 ? 0 : (enemyDef-Math.floor(playerDex/2));
    let playerNetDef = (playerDef-Math.floor(enemyDex/2)) < 0 ? 0 : (playerDef-Math.floor(enemyDex/2));
    let playerNetDmg = 0
    if (playerDmg-enemyNetDef>=0){
      playerNetDmg = playerDmg-enemyNetDef
    }
    let enemyNetDmg = 0
    if (enemyDmg - playerNetDef>=0){
      enemyNetDmg = enemyDmg - playerNetDef
    }
    //decide enemy move:

    //enemy Ambush
    if(enemyMove==="Ambush"){
      let tempLog = "Ambushed!"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      if(playerClass==="Mage"){
        let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
        if(spillOver<=0){ //if yes,
          playerMp = 0 //player mp 0
          if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
            playerHp = playerHp + spillOver //calculate the dmg
          }else{
            playerHp = 0
          }
        }else{
          playerMp = playerMp - enemyNetDmg
        }
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
      if(enemyDmg-playerNetDef>=0){
        playerHp = playerHp - (enemyDmg-playerNetDef)
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
        let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
    }
    playerStats.mp = playerMp
    playerStats.hp = playerHp
    enemyMove="Attack";
    this.setState({enemyMove})
    }

    //perform operations based on move selection
    if(enemyMove==="Defense Matrix"&&this.state.enemyStats.mp>=(this.state.battleState.dlvl+1)){
      let enemyStats = this.state.enemyStats
      enemyStats.mp-=(this.state.battleState.dlvl+1)
      enemyMp-=(this.state.battleState.dlvl+1)
      this.setState({enemyStats})
      let tempLog = "Enemy defense matrix absorbs your attack!"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})

      if(playerClass==="Mage"){
        let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
        if(spillOver<=0){ //if yes,
          playerMp = 0 //player mp 0
          if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
            playerHp = playerHp + spillOver //calculate the dmg
          }else{
            playerHp = 0
          }
        }else{
          playerMp = playerMp - enemyNetDmg
        }
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
      if(enemyDmg-playerNetDef>=0){
        playerHp = playerHp - (enemyDmg-playerNetDef)
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
        let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
    }
    playerStats.mp = playerMp
    playerStats.hp = playerHp
    }else{
    if(playerMove==="Attack"){
      if(enemyType==="Mage"){
        let spillOver = enemyMp - playerNetDmg
        if(spillOver<=0){
          enemyMp = 0
          if(spillOver+enemyHp>=0){
            enemyHp = enemyHp + spillOver
          }else{
            enemyHp = 0
          }
        }else{
          enemyMp = enemyMp - playerNetDmg
        }
        let tempLog = "Player hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
      else{
      if(playerDmg-enemyNetDef>=0){
        enemyHp= enemyHp - (playerDmg-enemyNetDef)
      }
      let tempLog = "Player hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    enemyStats.hp = enemyHp;
    enemyStats.mp = enemyMp
    this.setState({enemyStats})
  }

  //Warrior Moves
  if(playerMove==="Armor Break"){
    //check skill level and take mp appropriately
    let skillLevel = this.state.playerSkills.armorBreak
    playerStats.mp -= (2)
    playerMp -= (2)
    this.setState((prevState)=>{return{playerStats}})
    //reduce enemy defense
    if(enemyStats.def-Math.floor(equipmentStats.str*(skillLevel/3))>0){
    enemyStats.def -= Math.floor(equipmentStats.str*(skillLevel/3))
    enemyDef -= Math.floor(equipmentStats.str*(skillLevel/3))
  }else{
    enemyStats.def=0
    enemyDef=0
  }
    let tempLog = "Player destroys "+Math.floor(equipmentStats.str*(skillLevel/3))+" of Enemy's armor. "+"("+enemyDef+" remaining)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    //check player dmg against new enemy defense, if below 0 its 0
    enemyNetDef = (enemyDef-Math.floor(playerDex/2)) < 0 ? 0 : (enemyDef-Math.floor(playerDex/2));
    playerNetDmg = 0
    if (playerDmg-enemyNetDef>=0){
      playerNetDmg = playerDmg-enemyNetDef
    }
    //take from mana first if enemy is mage
    if(enemyType==="Mage"){
      let spillOver = enemyMp - playerNetDmg
      if(spillOver<=0){
        enemyMp = 0
        if(spillOver+enemyHp>=0){
          enemyHp = enemyHp + spillOver
        }else{
          enemyHp = 0
        }
      }else{
        enemyMp = enemyMp - playerNetDmg
      }
      let tempLog = "Player hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    else{
    if(playerDmg-enemyNetDef>=0){
      enemyHp= enemyHp - (playerDmg-enemyNetDef)
    }
    let tempLog = "Player hits Enemy for "+(playerDmg-enemyNetDef)+" ("+enemyNetDef+" defended)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  enemyStats.hp = enemyHp
  enemyStats.mp = enemyMp
  if (enemyStats.hp<1){
    enemyStats.mp =0;
  }
  this.setState({enemyStats})
  }
//Stun
if(playerMove==="Stun"){
  playerStats.mp -= (2)
  playerMp -= (2)
  this.setState((prevState)=>{return{playerStats}})
  let skillLevel=this.state.playerSkills.stun
  let rStun = this.getRandomInt(1,7) * skillLevel
  if(rStun>=dlvl){
    enemyStunned=true
    let tempLog = "Stun successful!"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }else{
    let tempLog = "Stun failed."+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  if(enemyType==="Mage"){
    let spillOver = enemyMp - playerNetDmg
    if(spillOver<=0){
      enemyMp = 0
      if(spillOver+enemyHp>=0){
        enemyHp = enemyHp + spillOver
      }else{
        enemyHp = 0
      }
    }else{
      enemyMp = enemyMp - playerNetDmg
    }
    let tempLog = "Player hits Enemy for "+(playerDmg-enemyNetDef)+" ("+enemyNetDef+" defended)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  else{
  if(playerDmg-enemyNetDef>=0){
    enemyHp= enemyHp - (playerDmg-enemyNetDef)
  }
  let tempLog = "Player hits Enemy for "+(playerDmg-enemyNetDef)+" ("+enemyNetDef+" defended)"+"\n";
  this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
}
enemyStats.hp = enemyHp;
enemyStats.mp = enemyMp
this.setState({enemyStunned})
this.setState({enemyStats})
}
//Rogue Moves
if(playerMove==="Arrow"){
  let inventory = this.state.inventory
  let arrowsFired = this.state.arrowsFired
  inventory.shards --
  arrowsFired ++
  this.setState({arrowsFired})
  this.setState({inventory})
    if(enemyType==="Mage"){
      let spillOver = enemyMp - playerNetDmg
      if(spillOver<=0){
        enemyMp = 0
        if(spillOver+enemyHp>=0){
          enemyHp = enemyHp + spillOver
        }else{
          enemyHp = 0
        }
      }else{
        enemyMp = enemyMp - playerNetDmg
      }
      let tempLog = "Arrow hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    else{
    if(playerDmg-enemyNetDef>=0){
      enemyHp= enemyHp - (playerDmg-enemyNetDef)
    }
    let tempLog = "Arrow hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  enemyStats.hp = enemyHp;
  enemyStats.mp = enemyMp
  this.setState({enemyStats})
}
if(playerMove==="Mana Leak"){
  let manaDmg = Math.floor((this.state.equipmentStats.dex/3)*(this.state.playerSkills.manaLeak))+this.state.playerSkills.manaLeak
  let manaCost=4
  switch(true){
    case this.state.playerSkills.manaLeak===1:
    manaCost = 4;
    break;
    case this.state.playerSkills.manaLeak===2:
    manaCost = 3;
    break;
    case this.state.playerSkills.manaLeak===3:
    manaCost = 2;
    break;
    default:
  }
  playerStats.mp-=manaCost
  playerMp-=manaCost
  this.setState({playerStats})
  enemyStats.mp-=manaDmg
  enemyMp-=manaDmg
  this.setState({enemyStats})

  if(enemyType==="Mage"){
    let spillOver = enemyMp - playerNetDmg
    if(spillOver<=0){
      enemyMp = 0
      if(spillOver+enemyHp>=0){
        enemyHp = enemyHp + spillOver
      }else{
        enemyHp = 0
      }
    }else{
      enemyMp = enemyMp - playerNetDmg
    }
    let tempLog = "Player hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"("+manaDmg+" MP destroyed)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  else{
  if(playerDmg-enemyNetDef>=0){
    enemyHp= enemyHp - (playerDmg-enemyNetDef)
  }
  let tempLog = "Player hits Enemy for "+(playerNetDmg)+" ("+enemyNetDef+" defended)"+"("+manaDmg+" MP destroyed)"+"\n";
  this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
}
enemyStats.hp = enemyHp;
enemyStats.mp = enemyMp
this.setState({enemyStats})

  }
//Mage moves
  if(playerMove==="Heat Lance"){
    if(enemyType==="Mage"){
      let spillOver = enemyMp - (playerNetDmg + Math.floor(equipmentStats.int*(this.state.playerSkills.heatLance/3)))
      if(spillOver<=0){
        enemyMp = 0
        if(spillOver+enemyHp>=0){
          enemyHp = enemyHp + spillOver
        }else{
          enemyHp = 0
        }
      }else{
        enemyMp = enemyMp - (playerNetDmg + Math.floor(equipmentStats.int*(this.state.playerSkills.heatLance/3)))
      }
      let tempLog = "Heat Lance hits Enemy for "+(playerNetDmg+(Math.floor(equipmentStats.int*(this.state.playerSkills.heatLance/3))))+" ("+enemyNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    else{
    if(playerDmg-enemyNetDef>=0){
      enemyHp= enemyHp - (playerNetDmg + (Math.floor(equipmentStats.int*(this.state.playerSkills.heatLance/3))))
    }
    let tempLog = "Heat Lance hits Enemy for "+(playerNetDmg+(Math.floor(equipmentStats.int*(this.state.playerSkills.heatLance/3))))+" ("+enemyNetDef+" defended)"+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  playerStats.mp -= this.state.playerSkills.heatLance*3
  playerMp -= this.state.playerSkills.heatLance*3
  enemyStats.hp = enemyHp;
  enemyStats.mp = enemyMp
  this.setState({playerStats})
  this.setState({enemyStats})
  }
}
    //Enemy's move
    if(enemyHp>0){
    //Not stunned or arrowed
      if(!enemyStunned&&playerMove!=="Arrow"){
    //Lifesteal
    if(enemyMove==="Lifesteal"){
      let mpCost = this.state.battleState.dlvl + 1
      if (enemyMp >= mpCost){
        enemyMp -= mpCost;
        enemyStats.mp -= mpCost;

        if(playerClass==="Mage"){
          let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
          if(spillOver<=0){ //if yes,
            playerMp = 0 //player mp 0
            if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
              playerHp = playerHp + spillOver //calculate the dmg
            }else{
              playerHp = 0
            }
          }else{
            playerMp = playerMp - enemyNetDmg
          }
          let tempLog = "Enemy steals "+(enemyNetDmg)+" of Player's life ("+playerNetDef+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
        if(enemyDmg-playerNetDef>=0){
          playerHp = playerHp - (enemyDmg-playerNetDef)
          let tempLog = "Enemy steals "+(enemyNetDmg)+" of Player's life ("+playerNetDef+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
          let tempLog = "Enemy steals "+0+" life (perfect defense)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }
      }
      playerStats.mp = playerMp
      playerStats.hp = playerHp
      enemyStats.hp += enemyNetDmg
      enemyHp += enemyNetDmg
        this.setState({enemyStats})

      }else{
        this.setState({enemyMove})
        if(playerClass==="Mage"){
          let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
          if(spillOver<=0){ //if yes,
            playerMp = 0 //player mp 0
            if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
              playerHp = playerHp + spillOver //calculate the dmg
            }else{
              playerHp = 0
            }
          }else{
            playerMp = playerMp - enemyNetDmg
          }
          let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
        if(enemyDmg-playerNetDef>=0){
          playerHp = playerHp - (enemyDmg-playerNetDef)
          let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
          let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }
      }
      playerStats.mp = playerMp
      playerStats.hp = playerHp
      }
    }
    //burst
    if(enemyMove==="Acid Spines"){
      let mpCost=this.state.battleState.dlvl + 1
      if (this.state.enemyStats.mp >= mpCost){
        enemyMp -= mpCost;
        enemyStats.mp -= mpCost;
        this.setState({enemyStats})
        if(playerClass==="Mage"){
          let spillOver = playerMp - (enemyNetDmg+mpCost) // check if more dmg than player mp
          if(spillOver<=0){ //if yes,
            playerMp = 0 //player mp 0
            if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
              playerHp = playerHp + spillOver //calculate the dmg
            }else{
              playerHp = 0
            }
          }else{
            playerMp = playerMp - (enemyNetDmg+mpCost)
          }
          let tempLog = "Enemy acid spines hit Player for "+(enemyNetDmg+mpCost)+" ("+playerNetDef+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
        if(enemyDmg-playerNetDef>=0){
          playerHp = playerHp - (enemyNetDmg+mpCost)
          let tempLog = "Enemy acid spines hit Player for "+(enemyNetDmg+mpCost)+" ("+playerNetDef+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
          playerHp -= mpCost
          let tempLog = "Enemy acid spines hit Player for "+mpCost+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }
      }
    }else{
      this.setState({enemyMove})
      if(playerClass==="Mage"){
        let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
        if(spillOver<=0){ //if yes,
          playerMp = 0 //player mp 0
          if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
            playerHp = playerHp + spillOver //calculate the dmg
          }else{
            playerHp = 0
          }
        }else{
          playerMp = playerMp - enemyNetDmg
        }
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
      if(enemyDmg-playerNetDef>=0){
        playerHp = playerHp - (enemyDmg-playerNetDef)
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
        let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
    }
  }
  playerStats.mp = playerMp
  playerStats.hp = playerHp
  this.setState({playerStats})
}
//mana siphon
if(enemyMove==="Mana Siphon"){
  let mpCost = this.state.battleState.dlvl + 1
  if (enemyMp >= mpCost){
    enemyMp -= mpCost;
    enemyStats.mp -= mpCost;
    if((playerMp-mpCost)>=0){
      playerMp-=mpCost
      playerStats.mp-=mpCost
      enemyMp+=mpCost
      enemyStats.mp+=mpCost
      let tempLog = "Enemy steals "+mpCost+" of Player's MP."+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }else{
      enemyMp+=playerMp
      enemyStats.mp+=playerMp
      let tempLog = "Enemy steals "+playerMp+" of Player's MP."+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      playerMp=0
      playerStats.mp=0
    }
    this.setState({playerStats})
    this.setState({enemyStats})
  }
  //after stealing MP,continue with normal dmg
    if(playerClass==="Mage"){
      let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
      if(spillOver<=0){ //if yes,
        playerMp = 0 //player mp 0
        if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
          playerHp = playerHp + spillOver //calculate the dmg
        }else{
          playerHp = 0
        }
      }else{
        playerMp = playerMp - enemyNetDmg
      }
      let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }else{
    if(enemyDmg-playerNetDef>=0){
      playerHp = playerHp - (enemyDmg-playerNetDef)
      let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }else{
      let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
  }
  playerStats.mp = playerMp
  playerStats.hp = playerHp
  }
  //poison
  if(enemyMove==="Poison"){
    let mpCost = this.state.battleState.dlvl+1
    if(enemyMp>=mpCost){
      enemyMp-=mpCost
      enemyStats.mp-=mpCost
      this.setState({enemyStats})
      let poisonDmg=Math.floor(this.state.battleState.dlvl/2)+1
      let poisonCounter=2
      this.setState({poisonCounter})
      let tempLog = "Player is poisoned for "+2+" turns. ("+poisonDmg+" per tick)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }else{
      if(playerClass==="Mage"){
        let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
        if(spillOver<=0){ //if yes,
          playerMp = 0 //player mp 0
          if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
            playerHp = playerHp + spillOver //calculate the dmg
          }else{
            playerHp = 0
          }
        }else{
          playerMp = playerMp - enemyNetDmg
        }
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
      if(enemyDmg-playerNetDef>=0){
        playerHp = playerHp - (enemyDmg-playerNetDef)
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
        let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
    }
    playerStats.mp = playerMp
    playerStats.hp = playerHp
    }

  }
    //Attack
    if(enemyMove==="Attack"){
      if(playerClass==="Mage"){
        let spillOver = playerMp - enemyNetDmg // check if more dmg than player mp
        if(spillOver<=0){ //if yes,
          playerMp = 0 //player mp 0
          if(spillOver+playerHp>=0){ //if remaining dmg - player hp above 0
            playerHp = playerHp + spillOver //calculate the dmg
          }else{
            playerHp = 0
          }
        }else{
          playerMp = playerMp - enemyNetDmg
        }
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
      if(enemyDmg-playerNetDef>=0){
        playerHp = playerHp - (enemyDmg-playerNetDef)
        let tempLog = "Enemy hits Player for "+(enemyNetDmg)+" ("+playerNetDef+" defended)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else{
        let tempLog = "Enemy hits Player for "+0+" (perfect defense)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
    }
    playerStats.mp = playerMp
    playerStats.hp = playerHp
  }
    this.setState({playerStats})
    //handle armor spikes
    if(this.state.playerSkills.spikedArmor>0){ //even have the skill
      if((this.state.armorSpikes-enemyNetDef)>0){ //spikes can penetrate enemy armor
          enemyHp-=(this.state.armorSpikes-enemyNetDef)
          enemyStats.hp = enemyHp
          this.setState({enemyHp})
          let tempLog = "Enemy takes "+(this.state.armorSpikes-enemyNetDef)+" damage from spikes. ("+(enemyNetDef)+" defended)"+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        }else{
          let tempLog = "Enemy takes "+0+" damage from spikes (perfect defense)."+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    }
  }
  }
  if(enemyMove==="Defense Matrix"&&this.state.enemyStats.mp<(this.state.battleState.dlvl+1)){
      enemyMove="Attack"
      this.setState({enemyMove})
  }
  }

  //Get class from start Screen
  getClass = function(name){
    switch(true){
      case name==="war":
      this.setState((prevState)=>{return{playerClass:"Warrior"}})
      this.setState({combatLog:"A Warrior enters the dungeon."})
      break
      case name==="rogue":
      this.setState((prevState)=>{return{playerClass:"Rogue"}})
      this.setState({combatLog:"A Rogue enters the dungeon."})
      break
      case name==="mage":
      this.setState((prevState)=>{return{playerClass:"Mage"}})
      this.setState({combatLog:"A Mage enters the dungeon."})
      break
      default:
      //nothing
    }
  }
  explore = function(){
    const clickSound = new Audio();
    clickSound.src = ClickSound
    const errorSound = new Audio();
    errorSound.src = ErrorSound
    if(!this.state.battleState.inCombat||this.state.enemyStats.hp<1){
    //tick regens
    this.tickRegens()
    this.tickPoison()
    //destroy item on ground
    this.setState({itemOnGround:{type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}})
    let battleState = this.state.battleState;
    let chestOpen = this.state.chestOpen;
    let r = 0;
    battleState.timesExplored ++
    battleState.timesExploredOnCurrentFloor ++
    //get random room
    if(battleState.timesExploredOnCurrentFloor<(2+battleState.dlvl)){
    r = this.getRandomInt(1,8);
    console.log(r)
    }
    if(battleState.timesExploredOnCurrentFloor>=(2+battleState.dlvl)){
      r = this.getRandomInt(1,10);
      console.log(r)
    }
    if(r===1||r===2||r===3||r===4||r===5){ //battle
      let enemyStats=this.state.enemyStats;
      let tempLog = "A monster appears!"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      this.emy()
      this.setState({enemyStats})
      battleState.inCombat=true;
      battleState.stairs=false;
      battleState.treasureRoom=false;
    }
    if(r===6||r===7){ //treasure
      battleState.inCombat=false;
      battleState.stairs=false;
      battleState.treasureRoom=true;
      chestOpen=false
      {this.setState({chestOpen})}
    }
    if(r===8||r===9){ //stairs
      battleState.inCombat=false;
      battleState.stairs=true;
      battleState.treasureRoom=false;
    }
    this.setState({battleState})
  }else{
    let tempLog = "You must defeat the enemy before exploring."+"\n";
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    //errorSound.play();
  }
  }
  //make random int
  getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//add skillpoint
addSkillPoint = function(slot){
  let playerSkills=this.state.playerSkills
  switch(true){
    case this.state.playerClass === "Warrior":
      switch(true){
        case slot==="0":
        playerSkills.armorBreak+=1
        playerSkills.freePoints-=1
        break;
        case slot==="1":
        playerSkills.stun+=1
        playerSkills.freePoints-=1
        break;
        case slot==="2":
        playerSkills.spikedArmor+=1
        playerSkills.freePoints-=1
        break;
        default:
      }
    break;
    case this.state.playerClass === "Rogue":
      switch(true){
        case slot==="0":
        playerSkills.arrow+=1
        playerSkills.freePoints-=1
        break;
        case slot==="1":
        playerSkills.manaLeak+=1
        playerSkills.freePoints-=1
        break;
        case slot==="2":
        playerSkills.flee+=1
        playerSkills.freePoints-=1
        break;
        default:
      }
    break;
    case this.state.playerClass === "Mage":
      switch(true){
        case slot==="0":
        playerSkills.heatLance+=1
        playerSkills.freePoints-=1
        break;
        case slot==="1":
        playerSkills.eatShard+=1
        playerSkills.freePoints-=1
        break;
        case slot==="2":
        playerSkills.weaken+=1
        playerSkills.freePoints-=1
        break;
        default:
      }
    break;
    default:
  }
  this.setState((prevState)=>{return{playerSkills}})
}
  //Handle the Buttons
  handleClick = function(buttonName,itemSlot){
    const clickSound = new Audio();
    clickSound.src = ClickSound
    clickSound.play();
    const errorSound = new Audio();
    errorSound.src = ErrorSound
    if(buttonName!=="Menu"&&buttonName!=="Equipment Menu"&&buttonName!=="Clear Log"&&buttonName!=="Battle Menu"&&buttonName!=="Start"){
      let actionCounter = this.state.actionCounter
      actionCounter++
      this.setState({actionCounter})
    }
    switch(true){
      case buttonName==="Equipment Menu"||buttonName==="Enemy Stats":
        this.setState({menuPage:1})
        break
      case buttonName==="Battle Menu":
        this.setState({menuPage:0})
        break
      case buttonName==="Attack":
        if(this.state.enemyStats.hp>0){
        this.combat("Attack","Attack")
        this.resolveCombat();
        }else{
          let tempLog = "You take a practice swing."+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }
        break
      case buttonName==="Clear Log":
        this.setState({combatLog: ""})
        break
      case buttonName==="Start":
        this.setState({dead:false})
        this.setState((prevState)=>{return{newGame:false}});
        console.log("startbutton "+JSON.stringify(this.state.playerStats))
        this.calculateStats(true)
        //this.fullHealth()
        break
      case buttonName==="Explore":
        this.explore();
        break
      //Button for testing things
      case buttonName==="Test":
      let playerStats=this.state.playerStats
      this.setState({playerStats})
      console.log(this.state.playerStats)
      this.fullHealth();
      let inventory = this.state.inventory;
      inventory.autoInjectors += 10;
      inventory.shards +=10;
      this.setState({inventory});
      break
      case buttonName==="Take":
        //function to move item
        this.pickUpItem();
      break
      case buttonName==="⌁":
        //function to dismantle item into shards
        this.dismantleItem(itemSlot);
        break
      case buttonName==="Inject HP":
        this.useAutoinjector("hp");
        break
      case buttonName==="Inject MP":
        this.useAutoinjector("mp")
        break
      case buttonName==="▽":
        this.equipItem(itemSlot)
        break
      case buttonName==="▷":
        this.equipRight(itemSlot)
        break
      case buttonName==="◁":
        this.equipLeft(itemSlot)
        break
      case buttonName==="△":
        this.unEquip(itemSlot)
        break
      case buttonName==="Go down":
      this.useStairs("down")
      this.explore();
      break
      case buttonName==="Go up":
      this.useStairs("up")
      break
      case buttonName==="Trade shards":
      this.tradeShards()
      break
      case buttonName==="Pick lock":
      this.openTreasureChest()
      break
      case buttonName==="Inject lock":
      this.openTreasureChest()
      break
      case buttonName==="˄":
      let menuPage = this.state.menuPage
      if(menuPage===2){
        menuPage =0;
      }else{
        menuPage++
      }
      this.setState({menuPage})
      break;
      case buttonName==="˅":
      menuPage = this.state.menuPage
      if(menuPage===0){
        menuPage=2;
      }else{
        menuPage--
      }
      this.setState({menuPage})
      break;
      case buttonName==="+":
      this.addSkillPoint(itemSlot)
      break;
      case buttonName==="Armor Break":
      if(this.state.battleState.inCombat&&this.state.enemyStats.hp>0){
      if(this.state.playerStats.mp >= 2&&this.state.playerSkills.armorBreak!==0){
      this.combat("Armor Break")
      this.resolveCombat();
    }else if(this.state.playerSkills.armorBreak!==0){
      let tempLog = "Not enough MP to use level "+this.state.playerSkills.armorBreak+" Armor Break (need "+(2)+")"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      errorSound.play();
    }
  }
      break;
      case buttonName==="Stun":
      if(this.state.battleState.inCombat&&this.state.enemyStats.hp>0){
      if(this.state.playerStats.mp >= 2&&this.state.playerSkills.stun!==0){
      this.combat("Stun")
      this.resolveCombat();
    }else if(this.state.playerSkills.stun!==0){
      let tempLog = "Not enough MP to use level "+this.state.playerSkills.stun+" Stun (need "+(2)+")"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      errorSound.play();
    }
  }
      break;
      case buttonName==="Spiked Armor":
      switch(true){
        case this.state.playerSkills.spikedArmor*10<=this.state.armorSpikes:
        let tempLog = "You can not add more spikes to level "+this.state.playerSkills.spikedArmor+" Armor Spikes (max of "+10+" per lvl)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        break;
        case this.state.playerSkills.spikedArmor>0&&this.state.armorSpikes<(this.state.playerSkills.spikedArmor*10):
        if(this.state.inventory.shards>0){
        tempLog = "You add a shard to your Armor Spikes ("+(this.state.playerSkills.spikedArmor*10-this.state.armorSpikes-1)+" spots remaining)"+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        let inventory = this.state.inventory
        inventory.shards --
        this.setState({inventory})
        let armorSpikes = this.state.armorSpikes + 1
        this.setState({armorSpikes})
      }else{
        tempLog = "You have no shards to add to your armor."+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        errorSound.play();
      }
        break;
        default:
      }
      case buttonName==="Arrow":
      if(this.state.battleState.inCombat){
      if(this.state.inventory.shards<1){
        errorSound.play();
        let tempLog = "You need a shard to make an arrow."+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      }else if(this.state.arrowsFired===this.state.playerSkills.arrow){
        let tempLog = "You can only fire "+(this.state.playerSkills.arrow)+" arrow(s) per battle."+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        errorSound.play();
      }else{
        this.combat("Arrow")
        this.resolveCombat();
      }
      break;
      }
      case buttonName==="Flee":
      if(this.state.battleState.inCombat&&this.state.playerSkills.flee>0){
        let battleState = this.state.battleState
        let flee = this.state.playerSkills.flee
        let playerStats = this.state.playerStats
        let mpCost = 0
        switch(true){
          case flee===1:
          mpCost = 4
          break;
          case flee===2:
          mpCost = 3
          break;
          case flee===3:
          mpCost = 2
          break;
          default:
        }
        if(playerStats.mp>=mpCost){
        battleState.inCombat=false
        playerStats.mp -= mpCost
        this.setState({playerStats})
        this.setState({battleState})
        let tempLog = "You escape to the next room."+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        this.explore()
      }else{
        let tempLog = "Not enough MP to use level "+(this.state.playerSkills.flee)+" flee ("+mpCost+" required)."+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        errorSound.play();
      }
      }
      break;
      case buttonName==="Heat Lance":
      let playerSkills=this.state.playerSkills
      if(this.state.playerSkills.heatLance>0&&this.state.battleState.inCombat&&this.state.playerStats.mp>=(playerSkills.heatLance*3)){
        this.combat("Heat Lance");
        this.resolveCombat();
      }else if(this.state.playerSkills.heatLance>0&&this.state.battleState.inCombat){
        let tempLog = "Not enough MP to use level "+(this.state.playerSkills.heatLance)+" Heat Lance ("+(playerSkills.heatLance*3)+" required)."+"\n";
        this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
        errorSound.play();
      }
      break;
      case buttonName==="Eat Shard":
        if(this.state.inventory.shards>0&&this.state.playerSkills.eatShard!==0){
          let inventory = this.state.inventory
          let playerStats = this.state.playerStats
          let mpRecovered = 0
          let hpRecovered = 0
          inventory.shards--
          this.setState({inventory})
          if((playerStats.hp+(this.state.playerSkills.eatShard*2))>playerStats.maxHp){
            hpRecovered = playerStats.maxHp - playerStats.hp
            playerStats.hp = playerStats.maxHp
          }else{
            hpRecovered = (this.state.playerSkills.eatShard*2)
            playerStats.hp=playerStats.hp+(this.state.playerSkills.eatShard*2)
          }
          if((playerStats.mp+(this.state.playerSkills.eatShard*2))>playerStats.maxMp){
            mpRecovered = playerStats.maxMp - playerStats.mp
            playerStats.mp = playerStats.maxMp
          }else{
            mpRecovered = (this.state.playerSkills.eatShard*2)
            playerStats.mp=playerStats.mp+(this.state.playerSkills.eatShard*2)
          }
          let tempLog = "You recover "+hpRecovered+" HP and "+mpRecovered+" MP."+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
          this.setState({playerStats})
        }else if(this.state.playerSkills.eatShard!==0){
          let tempLog = "You have no shards."+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
          errorSound.play();
        }
        break;
        case buttonName==="Menu":
          if(this.state.menuPage===0){
            this.setState({menuPage:1})
          }else if(this.state.menuPage===1){
            this.setState({menuPage:0})
          }
        break;
        case buttonName==="Mana Leak":
        if(this.state.battleState.inCombat&&this.state.playerSkills.manaLeak>0){
        let manaCost = 4;
        switch(true){
          case this.state.playerSkills.manaLeak===1:
          manaCost = 4;
          break;
          case this.state.playerSkills.manaLeak===2:
          manaCost = 3;
          break;
          case this.state.playerSkills.manaLeak===3:
          manaCost = 2;
          break;
          default:
        }
        if(this.state.playerStats.mp>=manaCost){
          this.combat("Mana Leak")
        }else{
          let tempLog = "Not enough MP to use level "+(this.state.playerSkills.manaLeak)+" Mana Leak ("+manaCost+" required)."+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
          errorSound.play();
        }
      }
      break;
      case buttonName==="Weaken":
      if(this.state.battleState.inCombat&&this.state.playerSkills.weaken!==0){
        let int = this.state.equipmentStats.int
        let playerStats = this.state.playerStats
        let enemyStats = this.state.enemyStats
        let dmgReduction = Math.floor(int*(this.state.playerSkills.weaken/3))+this.state.playerSkills.weaken
        let manaCost = this.state.playerSkills.weaken * 3
        if(this.state.playerStats.mp>=manaCost){
          playerStats.mp-=manaCost
          this.setState({playerStats})
          if((enemyStats.baseDmg - dmgReduction)>=0){
            enemyStats.baseDmg -= dmgReduction;
            this.setState({enemyStats})
            let tempLog = "You weaken the enemy's DMG by "+dmgReduction+"."+"\n";
            this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
          }else{
            enemyStats.baseDmg=0
            let tempLog = "You completely disarm the enemy."+"\n";
            this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
            this.setState({enemyStats})
          }
        }else{
          let tempLog = "Not enough MP to use level "+(this.state.playerSkills.weaken)+" Weaken ("+manaCost+" required)."+"\n";
          this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
          errorSound.play();
        }
      }
      break;
      case buttonName==="Start Over":
      this.setState({playerStats: {lvl: 1, hp: 0, maxHp: 0, mp: 0, maxMp: 0, baseDmg: 0,tDmg: 0}})
      this.setState({enemyStats: {hp:0, maxHp: 0, mp: 0, maxMp: 0, baseDmg:0,def:0,difficulty:0, dex:0}})
      this.setState({playerSkills: {freePoints:1,armorBreak:0,stun:0,spikedArmor:0,arrow:0,manaLeak:0,flee:0,heatLance:0,eatShard:0,weaken:0}})
      this.setState({battleState:{inCombat:false,treasureRoom:false,stairs:true,timesExplored:0,timesExploredOnCurrentFloor:0,dlvl:1}})
      this.setState({actionCounter:0})
      this.setState({armorSpikes:0})
      this.setState({enemiesDefeated: 0})
      this.setState({inventory: {
        mainHand: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        offHand: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        head: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        body: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        ring: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv1: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv2: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv3: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        autoInjectors:1,
        shards:0
    }})
      this.setState({combatLog: ""})
      this.setState({equipmentStats: {dmg:0,def:0,str:0,dex:0,int:0}})
      this.setState({newGame:true})
      break;
      default:
      //do nothing
    }
  }

  componentDidMount(){
    //console.log("DidMount: "+JSON.stringify(this.state.mainHand));
  }

  render() {
    //New Game Screen
    if(this.state.battleState.dlvl===10){
      return(
        <div className="App">
        <VictoryScreen handleClick={this.handleClick} actionCounter={this.state.actionCounter} enemiesDefeated={this.state.enemiesDefeated}/>
        </div>
      )
    }
    if(this.state.newGame)
    return(
      <div className="App">
        <NewGame handleClick={this.handleClick} getClass={this.getClass} setStartingGear={this.setStartingGear} calculateStats={this.calculateStats}/>
      </div>
    )
    if(this.state.dead)
    return(
      <div className="App">
      <div className="grid-container">
      <DeathScreen handleClick={this.handleClick} actionCounter={this.state.actionCounter} enemiesDefeated={this.state.enemiesDefeated}/>
      <DeathCombatLog log={this.state.combatLog} handleClick={this.handleClick} />
      </div>
      </div>
    )
    //Menu Page 1
    if(this.state.menuPage===0) //Menu Page 1
    return (
      <div className="App">
        <div className="grid-container">
        <CharPic playerStats={this.state.playerStats} handleClick={this.handleClick} playerClass={this.state.playerClass}/>
        <MoveAnimation log={this.state.combatLog} handleClick={this.handleClick} />
        <EnemyPic handleClick={this.handleClick} enemyMove={this.state.enemyMove} enemyStats={this.state.enemyStats} battleState={this.state.battleState} enemyType={this.state.enemyType} playerClass={this.state.playerClass} chestOpen={this.state.chestOpen}itemOnGround={this.state.itemOnGround}/>
        <Items handleClick={this.handleClick} inventory={this.state.inventory} itemOnGround={this.state.itemOnGround}/>
        <MoveList handleClick={this.handleClick} battleState={this.state.battleState} enemyStats={this.state.enemyStats} playerSkills={this.state.playerSkills} playerClass={this.state.playerClass} armorSpikes={this.state.armorSpikes} testingMode={this.state.testingMode}/>

        </div>
      </div>)
    //Menu Page 2
    if(this.state.menuPage===1) //Menu Page 2
      return(
        <div className="App">
        <div className="grid-container">
        <Equipment  handleClick={this.handleClick} inventory={this.state.inventory}/>
        <PlayerStats stats={this.state.playerStats} eq={this.state.equipmentStats} playerClass={this.state.playerClass} actionCounter={this.state.actionCounter} enemiesDefeated={this.state.enemiesDefeated} battleState={this.state.battleState}/>
        <EnemyStats enemyStats={this.state.enemyStats} enemyType={this.state.enemyType} battleState={this.state.battleState} handleClick={this.handleClick}/>
        <Items handleClick={this.handleClick} inventory={this.state.inventory} itemOnGround={this.state.itemOnGround}/>


        </div>
        </div>
    )

    ;
  }
}

export default App;
