import { Pipe, PipeTransform } from "@angular/core";
import { Patient } from "./patient.model";

@Pipe({
  name: "patientSearch"
})
/**
 * A pipe that takes in an array, a filter value, and a property name.
 * If there is nothing in the filter, return the array.
 * Turn the filter value and element[propName] into a string, because sometimes they
 * will be a number. Then call lowercase on them, and see if the filter is included
 * in the element[propName] value. If it is, add the element to the temporary array.
 */
export class PatientSearchPipe implements PipeTransform {
  transform(value: Patient[], filterString: any, propName: string): any {
    if (filterString.length === 0 || value.length === 0) {
      return value;
    }
    let tempArray = [];
    for (let element of value) {
      let tempFilter = filterString + "";
      let tempProp = element[propName] + "";
      if (tempProp.toLowerCase().includes(tempFilter.toLowerCase())) {
        tempArray.push(element);
      }
    }
    return tempArray;
  }
}
