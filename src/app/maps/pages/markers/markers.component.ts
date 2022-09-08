import { ViewChild, Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { environment } from '../../../../environments/environment';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [`
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor:pointer
    }
  `]
})
export class MarkersComponent implements OnInit, AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel = 14;
  center: [number, number] = [-100.200588, 25.668650];
  markers: MarkerColor[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.readStorage();
  }
  newMarker() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const newMarker = this.addMarketInMap({
      color,
      center: this.center
    });

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveStorage();

    newMarker.on('dragend', (event) => {
      this.saveStorage();
    })
  }

  goMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({
      center: marker.getLngLat()
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker?.remove();
    this.markers.splice(index, 1);
    this.saveStorage();
  }

  private saveStorage() {
    let lngLatArr: MarkerColor[] = [];


    this.markers.forEach((marker) => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      lngLatArr.push({ color, center: [lng, lat] });
    });

    localStorage.setItem('markers', JSON.stringify(lngLatArr));

  }

  private readStorage() {
    if (!localStorage.getItem('markers')) return;

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('markers')!);

    lngLatArr.forEach(marker => {
      const newMarker = this.addMarketInMap({
        color: marker.color,
        center: marker.center
      });

      this.markers.push({
        marker: newMarker,
        color: marker.color
      })

      newMarker.on('dragend', (event) => {
        this.saveStorage();
      });
    });
  }

  private addMarketInMap(marker: MarkerColor) {
    return new mapboxgl.Marker({
      color: marker.color,
      draggable: true,
    })
      .setLngLat(marker.center!)
      .addTo(this.map);
  }
}
