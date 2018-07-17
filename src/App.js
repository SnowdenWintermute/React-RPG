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
      menuPage:0,
      lootMenu:0,
      playerClass:"",
      playerStats: {lvl: 1, hp: 0, maxHp: 0, mp: 0, maxMp: 0, baseDmg: 0,tDmg: 0},
      enemyStats: {hp:10, maxHp: 10, mp: 2, maxMp: 6, baseDmg:2},
      exp: 0,
      explorations: 0,
      dlvl: 0,
      //Equipment
      equipmentStats: {dmg:0,def:0,str:0,dex:0,int:0},
      mainHand: {dmg: 0, def: 0, str: 0, dex: 0, int: 0},
      offHand: {dmg: 0, def: 0, str: 0, dex: 0, int: 0},
      head: {def: 0, str: 0, dex: 0, int: 0},
      body: {def: 0, str: 0, dex: 0, int: 0},
      ring: {str: 0, dex: 0, int: 0},
      inventory: {
        inv1: {},
        inv2: {},
        inv3: {}
    },
      itemOnGround: {type:"",dmg: 0, def: 0, str: 0, dex: 0, int: 0},
      autoInjectors:0,
      shards:0,
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

//Calculates player stats from their equipment
  calculateStats = function(){
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
      ring = {str:2,dex:0,int:0}
      break
      case playerClass==="Rogue":
      mainHand = {dmg: 1, def: 0, str: 0, dex: 1, int: 0}
      head = {def:1,str:0,dex:1,int:0}
      ring = {str:0,dex:2,int:0}
      break
      case playerClass==="Mage":
      mainHand = {dmg: 1, def: 0, str: 0, dex: 0, int: 1}
      head = {def:1,str:0,dex:0,int:1}
      ring = {str:0,dex:0,int:2}
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
      let tempLog = "Enemy defeated\n";
      this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
    }
  }
  enemyMove = function(){
    //Calculate damage
    const a = this.state.playerStats.hp;
    const b = this.state.enemyStats.baseDmg;
    const d = a-b;
    const playerStats = this.state.playerStats;
    playerStats.hp=d;
    //Combat Log Message
    let tempLog = "Enemy hits Player for "+this.state.enemyStats.baseDmg+"\n";
    //Set message and resolve damage
    this.setState({playerStats})
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
  }
  playerAttack = function(){
    //Calculate damage
    const a = this.state.enemyStats.hp;
    const b = this.state.playerStats.tDmg;
    const d = a-b;
    const enemyStats = this.state.enemyStats;
    enemyStats.hp=d;
    //Combat Log Message
    let tempLog = "Player hits Enemy for "+this.state.playerStats.tDmg+"\n";
    //Set message and resolve damage
    this.setState({enemyStats});
    this.setState((prevState)=>{return{combatLog: tempLog+prevState.combatLog}})
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
        this.playerAttack();
        this.enemyMove();
        this.resolveCombat();
        break
      case buttonName==="Clear Log":
        this.setState({combatLog: ""})
        break
      case buttonName==="Start":
        this.setState((prevState)=>{return{newGame:false}});
        console.log("startbutton "+JSON.stringify(this.state.playerStats))
        this.calculateStats()
        //this.fullHealth()
        break
      case buttonName==="Test":
      console.log(this.state.playerStats)
      this.fullHealth();
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
    if(this.state.menuPage===0)
    return (
      <div className="App">
        <div className="grid-container">
        <CharPic hp={this.state.playerStats.hp} handleClick={this.handleClick}/>
        <MoveAnimation log={this.state.combatLog} handleClick={this.handleClick} />
        <EnemyPic hp={this.state.enemyStats.hp} />
        <Items />
        <MoveList handleClick={this.handleClick}/>
        <Loot />
        </div>
      </div>)

      //Menu Page 2
    if(this.state.menuPage===1)
      return(
        <div className="App">
        <div className="grid-container">
        <Equipment  handleClick={this.handleClick} mainHand={this.state.mainHand} offHand={this.state.offHand} head={this.state.head} body={this.state.body} ring={this.state.ring}/>
        <PlayerStats stats={this.state.playerStats} eq={this.state.equipmentStats} playerClass={this.state.playerClass}/>
        <EnemyStats stats={this.state.enemyStats}/>
        <Items />
        <MoveList handleClick={this.handleClick}/>
        <Loot />
        </div>
        </div>
    )

    ;
  }
}

export default App;
