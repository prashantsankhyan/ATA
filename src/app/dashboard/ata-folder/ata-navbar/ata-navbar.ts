import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ata-navbar',
   imports: [CommonModule,MatSidenavModule,RouterOutlet,RouterLink,RouterModule],
  templateUrl: './ata-navbar.html',
  styleUrl: './ata-navbar.scss',
})
export class AtaNavbar {

}
