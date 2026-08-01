import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LogoutService } from '../../_service/logout.service';

@Component({
  selector: 'app-navbar-detail',
  imports: [CommonModule,MatSidenavModule,MatMenuModule,MatIconModule ,MatButtonModule ,RouterOutlet,RouterLink,RouterModule],
  templateUrl: './navbar-detail.html',
  styleUrl: './navbar-detail.scss',
})
export class NavbarDetail {
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
  accountName:any;
  lookupCode:any;
  StageType:any;
  constructor(private router: Router,private el: ElementRef,private logoutService: LogoutService ,private renderer: Renderer2,) {
    
   }

 
  ngOnInit(){
    this.userName = sessionStorage.getItem('UserName')
    this.accountName = localStorage.getItem('AccountName');
    this.lookupCode = localStorage.getItem('LookUpCode')
    this.StageType = localStorage.getItem('StageType')
    this.getNameOfTeam();
  }

   backto(){
    if (this.StageType === 'Issue') {
    this.router.navigate(['/dashboard/policy']);
  }else{
    this.router.navigate(['/dashboard/submission'])
  }
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
  }
    toggleLadger(){
    this.isLedgerTransaction = !this.isLedgerTransaction
     this.isDropdownOtherOpen = false; // close other
      this.isDropdownOpen = false; // close first
       this.isTransactionDropdownOpen  = false
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

  // logout(){
  //   this.router.navigate(['/login'])

  // }


  addAccountDetail(data:any) {
    
   
  }

}
