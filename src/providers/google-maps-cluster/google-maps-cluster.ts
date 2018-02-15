import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleMapsCluster {

  markerCluster: any;

  constructor(public http: HttpClient) {
    console.log('Hello GoogleMapsCluster Provider');
  }

  addCluster(map, locations): Promise<any> {
    return new Promise((resolve, reject) => {
      if (google.maps) {

        //Convert locations into array of markers
        let markers = [];
        locations.map((location) => {
          location.distance = 0;
          location.visible = false;
          location.current = false;

          let markerData = {
            position: location.position,
            map: map,
            title: location.title,
          };

          location.marker = new google.maps.Marker(markerData);
          markers.push(location.marker);
        });

        this.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/imgs/m'});

        resolve(locations);
      } else {
        reject([]);
        console.warn('Google maps needs to be loaded before adding a cluster');
      }
    });

  }

}
