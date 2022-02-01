import { individualResp } from "./individualResp.model";

export interface answer {
  _id?: string,
  pollId: string,
  responses: individualResp[]

}
