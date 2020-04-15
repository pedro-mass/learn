import faker from 'faker'
import { Location } from './Location'

export class Company {
  name: string
  catchPhrase: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.name = faker.company.companyName()
    this.catchPhrase = faker.company.catchPhrase()
    this.location = new Location()
  }
}
