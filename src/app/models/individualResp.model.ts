import { User } from "./user.model";

export interface individualResp {
  id?: string,
  user?: User,
  name?: string,
  responses: string[]
}
