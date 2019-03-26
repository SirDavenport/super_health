import { Action } from "@ngrx/store";

export const GET_PATIENTS = "GET_PATIENTS";
export const GET_PATIENT = "GET_PATIENT";

export class GetPatients implements Action {
  readonly type = GET_PATIENTS;
  constructor(public payload) {}
}
export class GetPatient implements Action {
  readonly type = GET_PATIENT;
  constructor(public payload) {}
}

export type PatientAction = GetPatients | GetPatient;
