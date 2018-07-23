export default function(origin){
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
