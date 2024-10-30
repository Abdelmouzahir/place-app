export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location, lng: location.lng }; // { lat: 0.1444, lng: 966765.88 }
    this.id = id;
  }
}
