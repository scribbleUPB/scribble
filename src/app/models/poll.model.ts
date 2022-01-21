import { dateTime } from "./dateTime.model";
import { option } from "./option.model";

export interface poll{
  _id?:string,
  creator:string,
  title:string,
  description?:string,
  calendarOptions?:dateTime[],
  textOptions?:option[],
  needBe:boolean,
  numberVote:boolean,
  singleVote:boolean,
  hidden:boolean,
  deadline:boolean,
  invitees:string[]
}
