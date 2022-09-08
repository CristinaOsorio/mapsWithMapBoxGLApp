import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { MarkersComponent } from './pages/markers/markers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fullscreen', component: FullscreenComponent },
      { path: 'zoomRange', component: ZoomRangeComponent },
      { path: 'markers', component: MarkersComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: '**', redirectTo: 'fullscreen' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
