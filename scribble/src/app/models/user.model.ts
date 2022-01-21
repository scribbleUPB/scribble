import { poll } from "./poll.model";

export interface User{
  __v?:number,
  _id?:string,
  name:string,
  email:string,
  ownedPolls: poll[],
  invitedPolls: poll[]
}
