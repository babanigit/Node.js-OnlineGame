export interface IPlayer {
    x: number;
    y: number;
    color:string                                                                                                                                                                        
    sequenceNumber:number;
    canvas?:{
      width:number;
      height:number;
    }
    radius?:number;
    score:number;
  }
  export interface IProjectTile {
    x: number;
    y: number;
    velocity:{
      x: number;
      y: number;
    };
    playerId:string
    radius?:number;
    // angle?:number;
    // color:string
    // sequenceNumber:number;
  }