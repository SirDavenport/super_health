import { Action } from "@ngrx/store";

export const GET_ENCOUNTERS = "GET_ENCOUNTERS";
export const GET_ENCOUNTER = "GET_ENCOUNTER";

export class GetEncounters implements Action {
  readonly type = GET_ENCOUNTERS;
  constructor(public payload) {}
}
export class GetEncounter implements Action {
  readonly type = GET_ENCOUNTER;
  constructor(public payload) {}
}
export type EncountersAction = GetEncounters | GetEncounter;
