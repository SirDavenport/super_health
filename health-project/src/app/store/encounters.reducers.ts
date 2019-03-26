import * as EncounterActions from "./encounters.actions";
import { Encounter } from "../encounters/encounter.model";
export const GET_ENCOUNTERS = "GET_ENCOUNTERS";

export interface AppState {
  encounterStuff: State;
}
export interface State {
  encounters: Encounter[];
  encounter: Encounter;
}

const initialState = {
  encounters: [],
  encounter: null
};
export function encounterReducer(
  state = initialState,
  action: EncounterActions.EncountersAction
) {
  switch (action.type) {
    case EncounterActions.GET_ENCOUNTERS: {
      return {
        ...state,
        encounters: action.payload
      };
    }
    case EncounterActions.GET_ENCOUNTER: {
      return {
        ...state,
        encounter: action.payload
      };
    }
    default:
      return state;
  }
}
