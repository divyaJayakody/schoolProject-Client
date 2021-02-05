export class School {

  constructor(
    public schoolName: string,
    public address: Address,
    public noOfStudents: number,
  ) {
  }

}
export class Address {
  constructor(
    public street: string,
    public suburb: string,
    public postcode: number,
    public state: string) {
  }
}
