import { Component, OnInit } from '@angular/core';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
   li {
       cursor: pointer
    }
    `
  ]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Fullscreen' },
    { route: '/maps/zoomRange', name: 'Zoom Range' },
    { route: '/maps/markers', name: 'Marcadores' },
    { route: '/maps/properties', name: 'Propiedades' },
  ]



  constructor() { }

  ngOnInit(): void {
  }

}
