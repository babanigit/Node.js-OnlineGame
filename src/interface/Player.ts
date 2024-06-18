
export interface IPlayer {
    x: number;
    y: number;
    color:string
    sequenceNumber:number;
  }
  
  export interface IProjectTile {
    x: number;
    y: number;
    angle?:number;
    velocity:{
      x: number;
      y: number;
    };
    playerId:string
    // color:string
    // sequenceNumber:number;
  }