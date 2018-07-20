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



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      newGame:true,
      battleState:{inCombat:false,treasureRoom:false,stairs:true,timesExplored:0,dlvl:1},
      menuPage:0,
      lootMenu:0,
      playerClass:"",
      playerStats: {lvl: 1, hp: 0, maxHp: 0, mp: 0, maxMp: 0, baseDmg: 0,tDmg: 0},
      enemyStats: {hp:0, maxHp: 0, mp: 0, maxMp: 0, baseDmg:0,def:0,difficulty:0, dex:0},
      enemyType: {},
      enemyMoves: {},
      exp: 0,
      //Equipment
      equipmentStats: {dmg:0,def:0,str:0,dex:0,int:0},
      mainHand: {dmg: 0, def: 0, str: 0, dex: 0, int: 0},
      offHand: {dmg: 0, def: 0, str: 0, dex: 0, int: 0},
      head: {def: 0, str: 0, dex: 0, int: 0},
      body: {def: 0, str: 0, dex: 0, int: 0},
      ring: {str: 0, dex: 0, int: 0},
      inventory: {
        inv1: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv2: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        inv3: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
        autoInjectors:0,
        shards:0
    },
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

//Calculates player stats from their equipment. If heal is true, fully heals player
  createEnemy = function(){
    let enemyStats = this.state.enemyStats;
    let battleState = this.state.battleState;
    let dlvl = battleState.dlvl;
    let rType = this.getRandomInt(1,4);
    let rDifficulty = this.getRandomInt(1,7);
    enemyStats.difficulty = rDifficulty;
    let maxHp = (dlvl * 2) + 3
    let maxMp = (dlvl * 1) + 3
    switch(true){
      case rType === 1:
      this.setState({enemyType:"Warrior"})
      maxHp += rDifficulty
      enemyStats.dex = 0
      break
      case rType === 2:
      this.setState({enemyType:"Rogue"})
      enemyStats.dex = dlvl + rDifficulty
      break
      case rType === 3:
      this.setState({enemyType:"Mage"})
      maxMp += rDifficulty
      enemyStats.dex = 0
      break
      default://nothing
    }
    //set up the stats to go out
    enemyStats.def = dlvl + 1;
    enemyStats.baseDmg = dlvl + 1 + rDifficulty;
    enemyStats.maxMp = maxMp
    enemyStats.mp = maxMp
    enemyStats.maxHp = maxHp
    enemyStats.hp = maxHp
    this.setState({enemyStats})
  }
  calculateStats = function(heal){
    let playerClass = this.state.playerClass;
    let lvl = this.state.playerStats.lvl;
    let hp = this.state.playerStats.hp;
    let mp = this.state.playerStats.mp;
    let equipmentStats = this.state.equipmentStats;
    let mainHand = this.state.mainHand;
    let offHand = this.state.offHand;
    let head = this.state.head;
    let body = this.state.body;
    let ring = this.state.ring;
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
    let def = mainHand.def + offHand.def + head.def + body.def;
    let baseDmg = this.state.playerStats.lvl + 1
    let tDmg = wDmg + baseDmg + sDmg()
    //add for int dex etc
    let maxHp = str +(lvl * 2 + 5);
    let maxMp = int +(lvl * 2 + 2);
    equipmentStats = {dmg:wDmg,def:def,str:str,dex:dex,int:int}
    if(heal){
      hp = maxHp
    }
    let playerStats = {lvl: lvl, hp: hp, maxHp: maxHp, mp: mp, maxMp: maxMp, baseDmg: baseDmg, tDmg: tDmg}
    this.setState((prevState)=>{return{equipmentStats}})
    this.setState((prevState)=>{return{playerStats}})
    console.log("stats set to "+JSON.stringify(playerStats));
  }
//Give player full hp
  fullHealth = function(){
    let playerStats = this.state.playerStats
    let maxHp = this.state.playerStats.maxHp //this is getting 0 somehow
    console.log(maxHp)
    playerStats.hp=maxHp
    //playerStats.maxHp=maxHp
    //console.log(playerStats)
    this.setState((prevState)=>{return{playerStats}})
  }
//Give player some equipment at the start of the game
  setStartingGear = function(playerClass){
    let mainHand = this.state.mainHand
    let head = this.state.head
    let ring = this.state.ring
    switch(true){
      case playerClass==="Warrior":
      mainHand = {dmg: 1, def: 0, str: 1, dex: 0, int: 0}
      head = {def:1,str:1,dex:0,int:0}
      break
      case playerClass==="Rogue":
      mainHand = {dmg: 1, def: 0, str: 0, dex: 1, int: 0}
      head = {def:1,str:0,dex:1,int:0}
      break
      case playerClass==="Mage":
      mainHand = {dmg: 1, def: 0, str: 0, dex: 0, int: 1}
      head = {def:1,str:0,dex:0,int:1}
      break
      default:
      //nothing
    }
    this.setState((prevState)=>{return{mainHand: mainHand}})
    this.setState((prevState)=>{return{head}})
    this.setState((prevState)=>{return{ring: ring}})
  }
//Calculate Damage of moves
  resolveCombat = function(){
    if(this.state.playerStats.hp<=0){
      console.log("Player died");
      let tempLog = "Player died\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    if(this.state.enemyStats.hp<=0){
      console.log("Monster died")
      let enemyStats = this.state.enemyStats
      enemyStats.mp = 0
      this.setState({enemyStats})
      let tempLog = "Enemy defeated\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
      //generate loot
      this.createLoot()
    }
  }
  createLoot = function(){
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
    let statQuality = this.getRandomInt(1,(dlvl+1))
    let baseQuality = this.getRandomInt(1,(dlvl+1))
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
  combat = function(playerMove,enemyMove){
    //set up player stats
    let playerStats = this.state.playerStats
    let equipmentStats = this.state.equipmentStats
    let playerHp = playerStats.hp
    let playerMp = playerStats.mp
    let playerDmg = playerStats.tDmg
    let playerDef = equipmentStats.def
    let playerDex = equipmentStats.dex
    //Set up enemy stats
    let enemyStats = this.state.enemyStats
    let enemyDex = enemyStats.dex
    let enemyHp = enemyStats.hp
    let enemyMp = enemyStats.mp
    let enemyDmg = enemyStats.baseDmg
    let enemyDef = enemyStats.def

    //compare dex and def
    let enemyNetDef = (enemyDef-playerDex) < 0 ? 0 : (enemyDef-playerDex);
    let playerNetDef = (playerDef-enemyDex) < 0 ? 0 : (playerDef-enemyDex);

    //perform operations based on move selection
    if(playerMove==="Attack"){
      enemyHp = enemyHp + enemyNetDef - playerDmg;
      enemyStats.hp = enemyHp;
      let tempLog = "Player hits Enemy for "+(playerDmg-enemyNetDef)+" ("+enemyNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    this.setState({enemyStats})
    //Enemy's move
    if(enemyHp>0){
    if(enemyMove==="Attack"){
      playerHp = playerHp + playerNetDef - enemyDmg;
      playerStats.hp = playerHp
      //Combat Log Message
      let tempLog = "Enemy hits Player for "+(enemyDmg-playerNetDef)+" ("+playerNetDef+" defended)"+"\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
    this.setState({playerStats})
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
  //make random int
  getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
  //Handle the Buttons
  handleClick = function(buttonName){
    switch(true){
      case buttonName==="Equipment Menu":
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
        this.setState((prevState)=>{return{newGame:false}});
        console.log("startbutton "+JSON.stringify(this.state.playerStats))
        this.calculateStats(true)
        //this.fullHealth()
        break
      case buttonName==="Explore":
        //destroy item on ground
        this.setState({itemOnGround:{type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0}})
        let battleState = this.state.battleState;
        let r = 0;
        battleState.timesExplored ++
        //get random room
        if(battleState.timesExplored<3){
        r = this.getRandomInt(1,6);
        console.log(r)
        }
        if(battleState.timesExplored>=3){
          r = this.getRandomInt(1,7);
          console.log(r)
        }
        if(r===1||r===2||r===3){ //battle
          let enemyStats=this.state.enemyStats;
          this.createEnemy()
          this.setState({enemyStats})
          battleState.inCombat=true;
          battleState.stairs=false;
          battleState.treasureRoom=false;
        }
        if(r===4||r===5){ //treasure
          battleState.inCombat=false;
          battleState.stairs=false;
          battleState.treasureRoom=true;
        }
        if(r===6){ //stairs
          battleState.inCombat=false;
          battleState.stairs=true;
          battleState.treasureRoom=false;
        }
        this.setState({battleState})
        break
      case buttonName==="Test":
      console.log(this.state.playerStats)
      this.fullHealth();
      break
      case buttonName==="Take":
        //function to move item
      break
      default:
        //do nothing
    }
  }

  componentDidMount(){
    console.log("DidMount: "+JSON.stringify(this.state.mainHand));
  }

  render() {
    //New Game Screen
    if(this.state.newGame)
    return(
      <div className="App">
        <NewGame handleClick={this.handleClick} getClass={this.getClass} setStartingGear={this.setStartingGear} calculateStats={this.calculateStats}/>
      </div>
    )
    //Menu Page 1
    if(this.state.menuPage===0) //Menu Page 1
    return (
      <div className="App">
        <div className="grid-container">
        <CharPic hp={this.state.playerStats.hp} handleClick={this.handleClick}/>
        <MoveAnimation log={this.state.combatLog} handleClick={this.handleClick} />
        <EnemyPic handleClick={this.handleClick} enemyStats={this.state.enemyStats} battleState={this.state.battleState} enemyType={this.state.enemyType}/>
        <Items handleClick={this.handleClick} inventory={this.state.inventory} itemOnGround={this.state.itemOnGround}/>
        <MoveList handleClick={this.handleClick} battleState={this.state.battleState} enemyStats={this.state.enemyStats}/>
        <Loot itemOnGround={this.state.itemOnGround} handleClick={this.handleClick}/>
        </div>
      </div>)
    //Menu Page 2
    if(this.state.menuPage===1) //Menu Page 2
      return(
        <div className="App">
        <div className="grid-container">
        <Equipment  handleClick={this.handleClick} mainHand={this.state.mainHand} offHand={this.state.offHand} head={this.state.head} body={this.state.body} ring={this.state.ring}/>
        <PlayerStats stats={this.state.playerStats} eq={this.state.equipmentStats} playerClass={this.state.playerClass}/>
        <EnemyStats enemyStats={this.state.enemyStats} enemyType={this.state.enemyType} battleState={this.state.battleState}/>
        <Items handleClick={this.handleClick} inventory={this.state.inventory} itemOnGround={this.state.itemOnGround}/>
        <MoveList handleClick={this.handleClick} battleState={this.state.battleState} enemyStats={this.state.enemyStats}/>
        <Loot itemOnGround={this.state.itemOnGround} handleClick={this.handleClick}/>
        </div>
        </div>
    )

    ;
  }
}

export default App;
