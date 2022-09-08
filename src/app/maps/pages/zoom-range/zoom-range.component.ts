import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
  ]
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.200588, 25.668650],
      zoom: 17
    });
  }

}
