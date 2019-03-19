import { Address } from "./address.model";

export class Patient {
  constructor(
    public patientId: string,
    public firstName: string,
    public lastName: string,
    public ssn: string,
    public age: number,
    public gender: string,
    public height: number,
    public weight: number,
    public insurance: string,
    public address: Address
  ) {}
}
