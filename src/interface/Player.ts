export interface IPlayer {
    x: number;
    y: number;
    color:string                                                                                                                                                                        
    sequenceNumber:number;
    canvas?:{
      width:number;
      height:number;
    }
  }
  export interface IProjectTile {
    x: number;
    y: number;
    velocity:{
      x: number;
      y: number;
    };
    playerId:string
    // angle?:number;
    // color:string
    // sequenceNumber:number;
  }