import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LogoutService } from '../../_service/logout.service';

@Component({
  selector: 'app-navbar',
 imports: [CommonModule,MatSidenavModule,MatMenuModule,MatIconModule ,MatButtonModule ,RouterOutlet,RouterLink,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
AccountId:any;
  userName:any;
  showFiller = true;
  nameOfTeam:any
  showSaleTeam = false;
  showClaimTeam = false;
  showSubmissionTeam =false;
  showTransactionTeam = false;
  isDropdownOpen: boolean = false;
   isDropdownOtherOpen: boolean = false;
  isNameDropdownOpen: boolean = false;
  isTransactionDropdownOpen: boolean = false;
  isLedgerTransaction: boolean = false;
  isATAMasterOpen = false;
isCarrierOpen = false;

  showData:boolean = true
  constructor(private router: Router,private el: ElementRef,private logoutService: LogoutService, private renderer: Renderer2,) {
    
   }
  
 
  ngOnInit(){
 this.userName = (sessionStorage.getItem('UserName') || '').trim().toLowerCase();

  this.showData = ['cj', 'sandy', 'srey','prashant','Parmjit Dhami'].includes(this.userName);
 this.getNameOfTeam()
  }
 
 toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  this.isDropdownOtherOpen = false; // close other
    this.isLedgerTransaction = false;
    
}


toggleDropdownAnothrMenu() {
  this.isDropdownOtherOpen = !this.isDropdownOtherOpen;
  this.isDropdownOpen = false; // close first
  this.isTransactionDropdownOpen = false
 
   
     this.isLedgerTransaction = false;
       
}
  toggleDropdownForName() {
    this.isNameDropdownOpen = !this.isNameDropdownOpen;
    this.isTransactionDropdownOpen = false;
    this.isLedgerTransaction = false;
    

  }


  toggleTransaction(){
    this.isTransactionDropdownOpen = !this.isTransactionDropdownOpen
     this.isDropdownOtherOpen = false; // close other
     this.isLedgerTransaction = false
      this.isDropdownOpen = false; // close first
      this.isATAMasterOpen =false;
  }
    toggleLadger(){
    this.isLedgerTransaction = !this.isLedgerTransaction
     this.isDropdownOtherOpen = false; // close other
      this.isDropdownOpen = false; // close first
       this.isTransactionDropdownOpen  = false
  }

  toggleATAMaster() {
  this.isATAMasterOpen = !this.isATAMasterOpen;

  if (this.isATAMasterOpen) {
    this.isTransactionDropdownOpen = false;
  }
}
 
 

  getNameOfTeam(){
  this.nameOfTeam =  localStorage.getItem('teamName')
  
  if(this.nameOfTeam == 'Sale Team') {
    this.showSaleTeam = true

  }else if (this.nameOfTeam == 'Submission Team') {
    this.showSubmissionTeam = true

  }else if (this.nameOfTeam == 'Claim Team') {
    this.showClaimTeam = true;


  }else if (this.nameOfTeam == 'Transaction Team') {
   
    this.showTransactionTeam = true;

  }
 
  }
 logout() {
   
    const userData = {
      userName: sessionStorage.getItem('UserName'),
      Password: sessionStorage.getItem('Password')
    };
    this.logoutService.performLogout(userData)
    
  }

  addAccountDetail(data:any) {
    
   
  }

 
}
