import { PatientState } from "../store/patients.reducers";
import { EncounterState } from "../store/encounters.reducers";
import { AuthState } from "./auth.reducers";
export interface AppState {
  patientStuff: PatientState;
  encounterStuff: EncounterState;
  authStuff: AuthState;
}
