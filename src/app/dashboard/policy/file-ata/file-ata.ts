import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { AllApiService } from '../../../_service/all-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../../_core/apiUrl';
import { FormsModule } from '@angular/forms';
type FeeField =
  | 'premium'
  | 'CarrierFee'
  | 'GuardianExpertsFee'
  | 'InsuranceCarrierPolicyFee';
@Component({
  selector: 'app-file-ata',
    imports: [CommonModule,NgxPrintModule, FormsModule],
  templateUrl: './file-ata.html',
  styleUrl: './file-ata.scss',
})
export class FileATA {

  LineShortName:any;
  // ================= BASIC =================
  date: Date = new Date(
  new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles'
  })
);
  ChildPolicys: any;
  listOfFile: any[] = [];

  city: string = '';
  ChildPolicyName: any;
  ChildPolicyID:any;
  CarrierName: any;
  CarrierAddress: any;
  PolicyType: any;
  Address:any;

  From1 = 'Sarbjit Reynolds';
  From2 = 'sreynolds@atamga.com';
  RE = 'D J Cargo Xpress Inc';

  Plolcitterm = '';

  // ================= FINANCIAL =================
  premium: number = 11100;
  CarrierFee: number = 250;
  GuardianExpertsFee: number = 250;
  InsuranceCarrierPolicyFee: number = 350;

  // 👉 Input strings (important)
  premiumInput: string = '';
  CarrierFeeInput: string = '';
  GuardianExpertsFeeInput: string = '';
  InsuranceCarrierPolicyFeeInput: string = '';

  // ================= CALCULATED =================
  CaliforniaStampingFee: number = 0;
  Tria: number =0;
  Flat_Tira:number=0;
  CaliforniaStateTax: number = 0;
  Total: number = 0;
MinimumPercednt ='25%';
Commission ='10%';
NameOfATA ='Sarbjit Reynolds'
City:any;
DateFrom: any = null;
DateTo: any = null;
Count: number = 0;
StageType:any;
TriaAmount: number = 0;
  constructor(
    private http: AllApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  // ================= INIT =================
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ChildPolicys = params['id'];
    });
    this.LineShortName = localStorage.getItem('LineShortName')
   

  
    this.initInputs();
    this.getListForFile();
    this.getListOfPolicy();
  }

  initInputs() {
    this.premiumInput = this.formatNumber(this.premium);
    this.CarrierFeeInput = this.formatNumber(this.CarrierFee);
    this.GuardianExpertsFeeInput = this.formatNumber(this.GuardianExpertsFee);
    this.InsuranceCarrierPolicyFeeInput = this.formatNumber(this.InsuranceCarrierPolicyFee);
  }

  // ================= FORMAT =================
  formatNumber(value: number): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  parseNumber(value: string): number {
    return parseFloat(value.replace(/,/g, '')) || 0;
  }
  

onFocus(field: FeeField) {
  if (field === 'premium') this.premiumInput = this.premium.toString();
  if (field === 'CarrierFee') this.CarrierFeeInput = this.CarrierFee.toString();
  if (field === 'GuardianExpertsFee') this.GuardianExpertsFeeInput = this.GuardianExpertsFee.toString();
  if (field === 'InsuranceCarrierPolicyFee') this.InsuranceCarrierPolicyFeeInput = this.InsuranceCarrierPolicyFee.toString();
}

onBlur(field: FeeField) {
  if (field === 'premium') {
    this.premium = this.parseNumber(this.premiumInput);
    this.premiumInput = this.formatNumber(this.premium);
  }

  if (field === 'CarrierFee') {
    this.CarrierFee = this.parseNumber(this.CarrierFeeInput);
    this.CarrierFeeInput = this.formatNumber(this.CarrierFee);
  }

  if (field === 'GuardianExpertsFee') {
    this.GuardianExpertsFee = this.parseNumber(this.GuardianExpertsFeeInput);
    this.GuardianExpertsFeeInput = this.formatNumber(this.GuardianExpertsFee);
  }

  if (field === 'InsuranceCarrierPolicyFee') {
    this.InsuranceCarrierPolicyFee = this.parseNumber(this.InsuranceCarrierPolicyFeeInput);
    this.InsuranceCarrierPolicyFeeInput = this.formatNumber(this.InsuranceCarrierPolicyFee);
  }

  this.calculateCharges();
}

  // ================= API =================
  getListForFile() {
    this.http.getAllDataId(ApiUrl.bindingFile,this.ChildPolicys)
      .subscribe({
        next: (res: any) => {
          if (res?.Response === 1) {
            this.listOfFile = res.ChildPolicys || [];

            if (this.listOfFile.length > 0) {
              const item = this.listOfFile[0];

              this.From1 = item.AgentName || '';
              this.RE = item.AccountName || '';
              this.city = item.City || '';
              this.StageType = item.StageType || '';

              this.ChildPolicyName = item.ChildPolicyName || '';
              this.PolicyType = item?.LineName || '';
              this.CarrierName = item?.CarrierName || '';
             
              this.CarrierAddress = item?.carrier_Address || '';
              this.Address = item?.Address || '';
              

              this.Plolcitterm =
                this.formatDate(item.Effective) + ' - ' +
                this.formatDate(item.Expiration);

              this.calculateCharges();
            }
          }

          this.cdr.detectChanges();
        }
      });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}`;
  }

  stateData: any = {
  AK: { taxRate: 2.700, stampingFee: 1.000 },
  AL: { taxRate: 6.000, stampingFee: 0.175 },
  AR: { taxRate: 4.000, stampingFee: 0.000 },
  AZ: { taxRate: 3.000, stampingFee: 0.200 },
  CA: { taxRate: 3.000, stampingFee: 0.180 },
  CO: { taxRate: 3.000, stampingFee: 0.175 },
  CT: { taxRate: 4.000, stampingFee: 0.000 },
  DC: { taxRate: 2.000, stampingFee: 0.000 },
  DE: { taxRate: 3.000, stampingFee: 0.000 },
  FL: { taxRate: 4.940, stampingFee: 0.060 },
  GA: { taxRate: 4.000, stampingFee: 0.000 },
  HI: { taxRate: 4.680, stampingFee: 0.000 },
  IA: { taxRate: 0.925, stampingFee: 0.000 },
  ID: { taxRate: 1.500, stampingFee: 0.500 },
  IL: { taxRate: 3.500, stampingFee: 0.040 },
  IN: { taxRate: 2.500, stampingFee: 0.000 },
  KS: { taxRate: 3.000, stampingFee: 0.000 },
  KY: { taxRate: 3.000, stampingFee: 0.000 },
  LA: { taxRate: 4.850, stampingFee: 0.000 },
  MA: { taxRate: 4.000, stampingFee: 0.000 },
  MD: { taxRate: 3.000, stampingFee: 0.000 },
  ME: { taxRate: 3.000, stampingFee: 0.000 },
  MI: { taxRate: 2.500, stampingFee: 0.000 },
  MN: { taxRate: 3.000, stampingFee: 0.040 },
  MO: { taxRate: 5.000, stampingFee: 0.000 },
  MS: { taxRate: 4.000, stampingFee: 0.250 },
  MT: { taxRate: 2.750, stampingFee: 0.175 },
  NC: { taxRate: 5.000, stampingFee: 0.300 },
  ND: { taxRate: 1.750, stampingFee: 0.000 },
  NE: { taxRate: 3.000, stampingFee: 0.000 },
  NH: { taxRate: 3.000, stampingFee: 0.000 },
  NJ: { taxRate: 5.000, stampingFee: 0.000 },
  NM: { taxRate: 3.003, stampingFee: 0.000 },
  NV: { taxRate: 3.500, stampingFee: 0.400 },
  NY: { taxRate: 3.600, stampingFee: 0.150 },
  OH: { taxRate: 5.000, stampingFee: 0.000 },
  OK: { taxRate: 6.000, stampingFee: 0.175 },
  OR: { taxRate: 2.000, stampingFee: 10 },   // Flat fee
  PA: { taxRate: 3.000, stampingFee: 20 },   // Flat fee
  PR: { taxRate: 9.000, stampingFee: 0.000 },
  RI: { taxRate: 4.000, stampingFee: 0.000 },
  SC: { taxRate: 6.000, stampingFee: 0.000 },
  SD: { taxRate: 2.500, stampingFee: 0.175 },
  TN: { taxRate: 5.000, stampingFee: 0.175 },
  TX: { taxRate: 4.850, stampingFee: 0.040 },
  UT: { taxRate: 4.250, stampingFee: 0.180 },
  VA: { taxRate: 2.250, stampingFee: 0.035 },
  VI: { taxRate: 5.000, stampingFee: 0.000 },
  VT: { taxRate: 3.000, stampingFee: 0.000 },
  WA: { taxRate: 2.000, stampingFee: 0.300 },
  WI: { taxRate: 3.000, stampingFee: 0.000 },
  WV: { taxRate: 4.550, stampingFee: 0.000 },
  WY: { taxRate: 3.000, stampingFee: 0.175 }
};
//  calculateCharges() {
//     const state = this.city?.toUpperCase();

//     if (!state || !this.stateData[state]) return;

//     const { taxRate, stampingFee } = this.stateData[state];

//     const premium = this.premium || 0;
//     const carrierFee = this.CarrierFee || 0;

//     const baseAmount = premium + carrierFee;

//     this.CaliforniaStateTax = Number(((baseAmount * taxRate) / 100).toFixed(2));

//     this.CaliforniaStampingFee = Number(
//       (stampingFee < 1
//         ? (baseAmount * stampingFee) / 100
//         : stampingFee).toFixed(2)
//     );

//     this.Total =
//       premium +
//       carrierFee +
//       this.CaliforniaStateTax +
//       this.CaliforniaStampingFee +
//       this.GuardianExpertsFee +
//       this.InsuranceCarrierPolicyFee;
//   }

//without tira
// calculateCharges() {
//   const state = this.city?.toUpperCase();

//   if (!state || !this.stateData[state]) return;

//   const { taxRate, stampingFee } = this.stateData[state];

//   const premium = this.premium || 0;

  
//   this.CaliforniaStateTax = Number(
//     ((premium * taxRate) / 100).toFixed(2)
//   );

//   this.CaliforniaStampingFee = Number(
//     ((premium * stampingFee) / 100).toFixed(2)
//   );

//   this.Total =
//     premium +
//     this.CaliforniaStateTax +
//     this.CaliforniaStampingFee +
//     (this.CarrierFee || 0) +
//     (this.GuardianExpertsFee || 0) +
//     (this.InsuranceCarrierPolicyFee || 0);
// }


//with tira




calculateCharges() {
  const state = this.city?.toUpperCase();

  if (!state || !this.stateData[state]) {
    return;
  }

  const { taxRate, stampingFee } = this.stateData[state];

  const premium = Number(this.premium) || 0;

  // State Tax
  this.CaliforniaStateTax = Number(
    ((premium * taxRate) / 100).toFixed(2)
  );

  // Stamping Fee
  this.CaliforniaStampingFee = Number(
    ((premium * stampingFee) / 100).toFixed(2)
  );
 const triaAmount = Number(
    ((premium * (Number(this.Tria) || 0)) / 100).toFixed(2)
  );

  const flatTriaAmount = Number(this.Flat_Tira) || 0;

  // TOTAL
 this.Total = Number(
    (
      premium +
      triaAmount +
      flatTriaAmount +
      this.CaliforniaStateTax +
      this.CaliforniaStampingFee +
      (Number(this.CarrierFee) || 0) +
      (Number(this.GuardianExpertsFee) || 0) +
      (Number(this.InsuranceCarrierPolicyFee) || 0)
    ).toFixed(2)
  );
  console.log('State:', state);
console.log('Premium:', premium);
console.log('Tax Rate:', taxRate);
console.log('Tax:', this.CaliforniaStateTax);
}



getListOfPolicy() {

  this.http.getAllDataId(
    ApiUrl.getATAFileDataChildPolicyId,
    this.ChildPolicys
  ).subscribe({

    next: (res: any) => {

      console.log('API Response', res);

      const responseData = res?.Data;

      if (responseData?.Response === 1) {

        const data =
          responseData?.ChildPolicyTerms;

        if (data) {

           this.Count =
    Number(data.Count) || 0;

          this.DateFrom = data.DateFrom;
          this.DateTo = data.DateTo;

          this.premium =
            Number(data.Premium) || 0;

          this.CarrierFee =
            Number(data.CarrierFee) || 0;

          this.GuardianExpertsFee =
            Number(data.ATAFee) || 0;

          this.InsuranceCarrierPolicyFee =
            Number(data.InsuranceCarrierPolicyFee) || 0;

          this.CaliforniaStampingFee =
            Number(data.StampingFees) || 0;
            
            this.Tria =
            Number(data.Tria) || 0;

             this.Flat_Tira =
            Number(data.Flat_Tira) || 0;

          this.CaliforniaStateTax =
            Number(data.IAStateTax) || 0;

          this.Total =
            Number(data.Total) || 0;

          this.Commission =
            `${data.Commission || 10}%`;

          this.MinimumPercednt =
            `${data.MinimumEarnedPercent || 25}%`;

          if (this.DateFrom && this.DateTo) {

            this.Plolcitterm =
              `${this.formatDate(this.DateFrom)}
               - ${this.formatDate(this.DateTo)}`;
          }

          this.initInputs();
        }

      } else {

        console.log(
          responseData?.ErrorMessage
        );

        if (this.listOfFile?.length > 0) {

          const item =
            this.listOfFile[0];

          this.DateFrom =
            item.Effective;

          this.DateTo =
            item.Expiration;

          this.Plolcitterm =
            `${this.formatDate(item.Effective)}
             - ${this.formatDate(item.Expiration)}`;
        }
      }

      this.cdr.detectChanges();
    },

    error: (err: any) => {
      console.log(err);
      this.cdr.detectChanges();
    }
  });
}


saveAndPrint() {

  // fallback dates
  if (!this.DateFrom && this.listOfFile?.length > 0) {
    this.DateFrom = this.listOfFile[0]?.Effective;
  }

  if (!this.DateTo && this.listOfFile?.length > 0) {
    this.DateTo = this.listOfFile[0]?.Expiration;
  }

  const payload = {
    ChildPolicyID: Number(this.ChildPolicys),

    DateFrom: this.DateFrom,
    DateTo: this.DateTo,

    Premium: Number(this.premium) || 0,
    StampingFees:
      Number(this.CaliforniaStampingFee) || 0,

      Tria:
      Number(this.Tria) || 0,

      Flat_Tira:
      Number(this.Flat_Tira) || 0,

      
    IAStateTax:
      Number(this.CaliforniaStateTax) || 0,
    CarrierFee:
      Number(this.CarrierFee) || 0,
    ATAFee:
      Number(this.GuardianExpertsFee) || 0,
    InsuranceCarrierPolicyFee:
      Number(this.InsuranceCarrierPolicyFee) || 0,
    Total:
      Number(this.Total) || 0,

    Commission:
      Number(
        this.Commission.replace('%', '')
      ) || 0,

    MinimumEarnedPercent:
      Number(
        this.MinimumPercednt.replace('%', '')
      ) || 0
  };

  console.log('Save Payload', payload);

  this.http.addEditDataATA(
    ApiUrl.UpdateFileATA,
    payload
  ).subscribe({

    next: (res: any) => {

      console.log(res);

      if (res?.Response === 1) {

        // reload saved data
        this.getListOfPolicy();

        // wait for DOM update
        setTimeout(() => {

          const printContents =
            document.getElementById(
              'print-section'
            )?.innerHTML;

          const popupWin =
            window.open(
              '',
              '_blank',
              'width=1200,height=800'
            );

          popupWin?.document.open();

          popupWin?.document.write(`
            <html>
              <head>
                <title>GUARDIAN</title>
              </head>
              <body onload="window.print();window.close()">
                ${printContents}
              </body>
            </html>
          `);

          popupWin?.document.close();

        }, 1000);
      }
    },

    error: (err: any) => {
      console.log(err);
    }
  });
}

// ================= GET SAVED DATA =================

// ================= SAVE =================
saveChildPolicyTerm() {

  if (!this.DateFrom && this.listOfFile?.length > 0) {
    this.DateFrom = this.listOfFile[0]?.Effective;
  }

  if (!this.DateTo && this.listOfFile?.length > 0) {
    this.DateTo = this.listOfFile[0]?.Expiration;
  }

  const payload = {
    ChildPolicyID: Number(this.ChildPolicys),

    DateFrom: this.DateFrom,
    DateTo: this.DateTo,

    Premium: Number(this.premium) || 0,
    StampingFees: Number(this.CaliforniaStampingFee) || 0,
     Tria: Number(this.Tria) || 0,
     Flat_Tira: Number(this.Flat_Tira) || 0,
    IAStateTax: Number(this.CaliforniaStateTax) || 0,
    CarrierFee: Number(this.CarrierFee) || 0,
    ATAFee: Number(this.GuardianExpertsFee) || 0,
    InsuranceCarrierPolicyFee:
      Number(this.InsuranceCarrierPolicyFee) || 0,
    Total: Number(this.Total) || 0,

    Commission:
      Number(this.Commission.replace('%', '')) || 0,

    MinimumEarnedPercent:
      Number(this.MinimumPercednt.replace('%', '')) || 0
  };

  console.log('Save Payload', payload);

  this.http
    .addEditDataATA(
      ApiUrl.UpdateFileATA,
      payload
    )
    .subscribe({
      next: (res: any) => {

        console.log('Save Response', res);

        if (res?.Data?.Response === 1) {

          console.log(
            res?.Data?.ErrorMessage
          );

          // reload saved data
          this.getListOfPolicy();
        }
      },

      error: (err: any) => {
        console.log(err);
      }
    });
}

 
}
