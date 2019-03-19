export class Encounter {
  constructor(
    public encounterId: string,
    public patientId: string,
    public notes: string,
    public visitCode: string,
    public provider: string,
    public billingCode: string,
    public icd: string,
    public totalCost: number,
    public copay: number,
    public chiefComplaint: string,
    public pulse: number,
    public systolic: number,
    public diastolic: number,
    public date: Date
  ) {}
}
