import faker from 'faker'

export class Location {
  lat: number
  lng: number

  constructor() {
    this.lat = parseFloat(faker.address.latitude())
    this.lng = parseFloat(faker.address.longitude())
  }
}
