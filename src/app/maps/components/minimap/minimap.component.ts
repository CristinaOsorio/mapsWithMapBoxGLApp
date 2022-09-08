import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styles: [` 
    div {
      width: 100%;
      height: 150px;
      margin: 0;
    }
  `]
})
export class MinimapComponent implements AfterViewInit {
  @Input() lngLat!: [number, number];
  @ViewChild('map') mapRef!: ElementRef;
  map!: mapboxgl.Map;

  constructor() { }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: this.mapRef.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    const marker = new mapboxgl.Marker().setLngLat(this.lngLat).addTo(this.map)
  }

}
