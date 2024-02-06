import faker from 'faker'
import { Location } from './Location'

export class User {
  name: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.name = faker.name.firstName()
    this.location = new Location()
  }
}
