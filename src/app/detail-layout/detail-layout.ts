import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarDetail } from './navbar-detail/navbar-detail';

@Component({
  selector: 'app-detail-layout',
  imports: [CommonModule,NavbarDetail],
  templateUrl: './detail-layout.html',
  styleUrl: './detail-layout.scss',
})
export class DetailLayout {

}
