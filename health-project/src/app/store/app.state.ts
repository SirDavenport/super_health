import { PatientState } from "../store/patients.reducers";
import { EncounterState } from "../store/encounters.reducers";
export interface AppState {
  patientStuff: PatientState;
  encounterStuff: EncounterState;
}
