import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .row {
      background-color: white;
      position: fixed;
      border-radius: 5px;
      left: 50px;
      bottom: 50px;
      padding: 10px;
      z-index: 999;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel = 10;

  constructor() { }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.200588, 25.668650],
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom()
    });

    this.map.on('zoomend', (event) => {
      if (this.map.getZoom() > 18) this.map.zoomTo(18);
    });
  }

  zoomOut() {
    this.map.zoomOut()
  }

  zoomIn() {
    this.map.zoomIn()
  }

  zoomChange(value: string) {
    this.map.zoomTo(Number(value));
  }

}
