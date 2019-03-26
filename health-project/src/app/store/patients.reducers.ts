import { Patient } from "../patients/patient.model";
import * as PatientAction from "./patients.actions";

export interface FeatureState {
  patientStuff: PatientState;
}

export interface PatientState {
  patients: Patient[];
  patient: Patient;
}

const initialState = {
  patients: [],
  patient: null
};

export function patientReducer(
  state = initialState,
  action: PatientAction.PatientAction
) {
  switch (action.type) {
    case PatientAction.GET_PATIENTS: {
      return {
        ...state,
        patients: action.payload
      };
    }
    case PatientAction.GET_PATIENT: {
      return {
        ...state,
        patient: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
}
