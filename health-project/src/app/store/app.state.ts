import * as PatientState from "../store/patients.reducers";
import * as EncounterState from "../store/encounters.reducers";
import * as AuthState from "./auth.reducers";
import { ActionReducerMap } from "@ngrx/store";
export interface AppState {
  patientStuff: PatientState.PatientState;
  encounterStuff: EncounterState.EncounterState;
  authStuff: AuthState.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  encounterStuff: EncounterState.encounterReducer,
  patientStuff: PatientState.patientReducer,
  authStuff: AuthState.authReducer
};
