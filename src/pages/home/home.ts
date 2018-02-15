import {Component, ElementRef, ViewChild} from "@angular/core";
import {Platform} from "ionic-angular";
import {GoogleMaps, GoogleMapsCluster} from "../../providers";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  locations: any = [];
  currentLocation: any = {};
  map: any;

  constructor(public platform: Platform,
              public maps: GoogleMaps,
              public mapCluster: GoogleMapsCluster) {
    this.locations = [
      {position: {lat: -31.563910, lng: 147.154312}, title: 'XXX'},
      {position: {lat: -33.718234, lng: 150.363181}, title: 'XXX'},
      {position: {lat: -33.727111, lng: 150.371124}, title: 'XXX'},
      {position: {lat: -33.848588, lng: 151.209834}, title: 'XXX'},
      {position: {lat: -33.851702, lng: 151.216968}, title: 'XXX'},
      {position: {lat: -34.671264, lng: 150.863657}, title: 'XXX'},
      {position: {lat: -35.304724, lng: 148.662905}, title: 'XXX'},
      {position: {lat: -36.817685, lng: 175.699196}, title: 'XXX'},
      {position: {lat: -36.828611, lng: 175.790222}, title: 'XXX'},
      {position: {lat: -37.750000, lng: 145.116667}, title: 'XXX'},
      {position: {lat: -37.759859, lng: 145.128708}, title: 'XXX'},
      {position: {lat: -37.765015, lng: 145.133858}, title: 'XXX'},
      {position: {lat: -37.770104, lng: 145.143299}, title: 'XXX'},
      {position: {lat: -37.773700, lng: 145.145187}, title: 'XXX'},
      {position: {lat: -37.774785, lng: 145.137978}, title: 'XXX'},
      {position: {lat: -37.819616, lng: 144.968119}, title: 'XXX'},
      {position: {lat: -38.330766, lng: 144.695692}, title: 'XXX'},
      {position: {lat: -39.927193, lng: 175.053218}, title: 'XXX'},
      {position: {lat: -41.330162, lng: 174.865694}, title: 'XXX'},
      {position: {lat: -42.734358, lng: 147.439506}, title: 'XXX'},
      {position: {lat: -42.734358, lng: 147.501315}, title: 'XXX'},
      {position: {lat: -42.735258, lng: 147.438000}, title: 'XXX'},
      {position: {lat: -43.999792, lng: 170.463352}, title: 'XXX'},
    ];
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(
        (map) => {
          this.map = map;
          this.mapCluster.addCluster(this.map, this.locations).then((locations) => {
            this.setMarkerClick(locations);
          });
        }, (err) => {
          console.log(err);
        });
    });
  }

  viewPlace() {
    console.log('Clicked Marker', this.currentLocation);
    for (let location of this.locations) {
      location.distance = 0;
      location.visible = false;

      location.current = false;
      this.currentLocation = {};
    }
  }

  setMarkerClick(locations) {
    locations.map(location => {
      location.marker.addListener('click', () => {
        for (let c of locations) {
          c.current = false;
        }
        this.currentLocation = location;
        location.current = true;

        console.log(this.currentLocation);
        this.map.panTo(location.marker.getPosition());
      });
    });
  }

}
