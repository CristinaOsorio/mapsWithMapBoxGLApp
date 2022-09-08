import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel = 10;
  center: [number, number] = [-100.200588, 25.668650];

  constructor() { }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom()
    });

    this.map.on('zoomend', (event) => {
      if (this.map.getZoom() > 18) this.map.zoomTo(18);
    });

    this.map.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.map.off('zoom', () => { });
    this.map.off('zoomend', () => { });
    this.map.off('move', () => { });
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
