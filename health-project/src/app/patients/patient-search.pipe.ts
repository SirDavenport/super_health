import { Pipe, PipeTransform } from "@angular/core";
import { Patient } from "./patient.model";

@Pipe({
  name: "patientSearch"
})
export class PatientSearchPipe implements PipeTransform {
  transform(value: Patient[], filterString: any, propName: string): any {
    if (filterString.length === 0 || value.length === 0) {
      return value;
    }
    let tempArray = [];
    for (let patient of value) {
      let tempFilter = filterString + "";
      let tempProp = patient[propName] + "";
      if (tempProp.toLowerCase().includes(tempFilter.toLowerCase())) {
        tempArray.push(patient);
      }
    }
    return tempArray;
  }
}
