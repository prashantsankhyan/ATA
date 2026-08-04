

export const ApiUrl ={ 
 getAllAccountDetail:'Account/GetAllAccount',
 deleteMainAccount:'Account/DeleteAccount',
 getAllInsuredAccount:'Account/GetAllAccountOnlyInsured',
 detelAccount:'Account/DeleteAccount',
 addAccountdetail:'Account/PostNewAccount',
 getAllAccountById:'Account/GetAllAccount',
 getAllClient:'Account/GetAllAccountOnlyClient',
 getMarkedPolicy:'MarkedPolicy/GetAllMarkedPolicy',
 addEditMarkedPolicy:'MarkedPolicy/PostNewMarkedPolicy',
 getAllProfileCenter:'ProfileCenter/GetAllProfileCenter',
 getAllLineName:'LineName/GetAllLineName',
 addEditLine:'LineName/AddNewLineName',
 getAllLineCode:'LineCode/GetAllLineCode',
 getAllLocation:'IssuingLocation/GetAllIssuingLocation',
 getMarkedPolicyById:'MarkedPolicy/GetAllMarkedPolicyByID',
 addEditPostNewCommodity:'Commodity/PostNewCommodity',
 deleteMarkedPolicy:'MarkedPolicy/DeleteMarkedPolicy',
 GetAllCommodityByChildandMarkedPolicyID:'Commodity/GetAllCommodityByChildandMarkedPolicyID',
 getAllVehicleRecords:'Vehicle/GetAllVehicleByChildandMarkedPolicyID',
 addEditAllVehicle:'Vehicle/PostNewVehicle',
 addVehicleByExcelFile:'Vehicle/ReadVehicleExcelFile',
 addVechileReplace:'Vehicle/ReplaceVehicleExcelFile',
 deleteVehicle:'Vehicle/DeleteVehicle',
 getDeleteVehicle:'Vehicle/GetDeletedVehicleByChildandMarkedPolicyID',

 valueToZeroInAl:'Vehicle/UpdateVehicleValueZeroByMarkedPolicyID',
 getAllDriverRecord:'Driver/GetAllDriverByChildandMarkedPolicyID',
 getAllDeleteDriver:'Driver/GetDeletedDriverByChildandMarkedPolicyID',
 addEditDriver:'Driver/PostNewDriver',
 deleteDriver:'Driver/DeleteDriver',
 getALlLogin:'Login/GetAllUsers',
 getLoginDetailById:'Login/GetAllLoginByUserName',
 addEditLogin:'Login/PostNewUser',
 LogingHere:'Login/GetAllLoginByUserName',
 getCountAccountDetai:'Account/GetAllAccountTypeByCount',
 getAllDetailForPolicyAndAnoter:'CombineMoveResSub/GetAllDetailByMarkedPolicyID',
 //logi///
 addUserInExistForm:"Login/AddUserInCurrentTray",
 deleteExistLoginByLogout:'Login/DeleteUserFromCurrentTray',
 getAllLoginList:'Login/GetAllLoginByUserName',
//Dirver//
isExistVehicle:'Driver/CheckVehicleExistInAnyAccount',
isExistDriver:'Driver/CheckDriverExistInAnyAccount',
addDriverExcel:'Driver/ReadDriverExcelFile',
addDriverReplace:'Driver/ReplaceDriverExcelFile',
 //marketed update
  updateMarketedSatus:'MarkedPolicy/UpdateMarkedAllFieldFillStatus',
  getDataForAttachSmallAccountFile:'ChildPolicy/GetAllSummaryDetail',
  restoreDeleteData:'ChildPolicy/UpdatePolicyStatusNew',
  deletedDataOfMarked:'MarkedPolicy/PermenantDeletedMarkedChildPolicies',
  getAllMarktedwitoutId:'MarkedPolicy/GetAllMarkedPolicy',
 //submisionTeam 
 getAllAccountForSubmiisonTeam:'Account/GetAllAccountOnlyClientAndInsured',
 getAllAcountForTransactionAndClaim:'Account/GetAllAccountOnlyInsured',
 uploadSubmissionFile:'FAttachmentSubmissionTeam/UploadMultiFilesSubmissionTeam',
 getAllSubmissionFile:'FAttachmentSubmissionTeam/GetAllFileDetailsSubmissionTeam',
 getAllSubmissionFileByAccountId:'FAttachmentSubmissionTeam/GetAllFileDetailsSubmissionTeam',
 getDetailsOfDataOfVehicle:'ChildPolicy/GetAllOnlyDetail',
 //policy//
 getAllPolicyRecords:"ChildPolicy/GetAllChildPolicy",

 getAllPolicyByAccountId:'ChildPolicy/GetAllChildPolicyByAccountIDOnlyNew',
 getAllExpirePolicyByAccountId:'ChildPolicy/GetAllChildPolicyByAccountIDOnlyExpire',
 getPolicyByChildPolcyId:'ChildPolicy/GetAllChildPolicy',
 addEditPolicy:'ChildPolicy/PostNewChildPolicy',
 renewPolicy:'ChildPolicy/UpdatePolicyStatus',
 getAllPremiumPayable:'PremiumPayble/GetAllPremiumPayble',
 getAllDetailByPremiumPayable:'PremiumPayble/GetAllSelectedPayableByPremiumPayableID',
 updateStage:'ChildPolicy/UpdateChildPolicyStage',
 getAllPolicyLineDetail:'MarkedPolicy/GetAllChildPolicyWithLineDetail',
 getPolicyBuChildPolcyId:'ChildPolicy/GetAllChildPolicy',
 getLineNameForSubPolicy:'LineName/GetAllLineNameByID',
 getTracnsagionByUpdate:'TransactionNew/GetAllTransaction',
 getALLClaimDriver:'Driver/GetDriverByChildandMarkedPolicyID',
 getAllClaimVehicle:'Vehicle/GetVehicleByChildandMarkedPolicyID',
 deletePolicy:'ChildPolicy/DeleteChildPolicy',
 deleteTemporaryDeletedChildPolicies:'ChildPolicy/TemporaryDeletedChildPolicies',
 getAllRenewPolicy:'ChildPolicy/GetAllChildPolicyByAccountIDOnlyReNew',
 //policy Bind Attachememt/
 uploadPolicyAndEndrosementAttachement:'/FAttachmentBindingTeam/UploadMultiFilesBindingTeam',
 getAllAttachmetOfPolicyAndEndrosement:'FAttachmentBindingTeam/GetAllFileDetailsBindingTeam',
 //Endrosement
 getAllEndrosementByPolicyId:'Endorsement/GetAllEndorsementByChildandMarkedPolicyIDWithSummary',
 addEditEndorsement:'Endorsement/PostNewEndorsement',
 updateEndroesement:'Endorsement/UpdateEndorsementStage',
 submitChangeRequestDriver:'Driver/GetAllDriverLog',
 submitChangeRequestVehicle:'Vehicle/GetAllVehicleLog',
 submitChangeRequestForDriverAndVehicle:'Driver/GetAllDriverLogPlusVehicleLog',
 allVehicleByEndrosment:'Vehicle/GetAllVehicleWithEndorsementId',
allDriverByEndrosment:'Driver/GetAllDriverWithEndorsementId',
 ViewAllEndreosementForAll:'Endorsement/GetAllEndorsementWithSummary',
 //remarks
 addEditRemakrs:'NewRemark/PostNewRemark',
 getRemarksById:'NewRemark/GetAllNewRemarkByAccountID',
 //accountSummaray//
 getAccountSummary:'AccountSummary/GetAllAccountSummary',
 addEditAccountSummary:'AccountSummary/AddNewAccountSummary',
 //client Summray //
 getClinetSummary:'ClientSummary/GetAllClientSummary',
 addEditClientSummary:'ClientSummary/AddNewClientSummary',
 //attachment//
 getAllFatchData:'FAttachment/GetAllFileDetails',
 addEditFileAttachment:'FAttachment/UploadMultiFilesofAccounts' , 
 getListOfAllFilder:'Folder/GetAllFolder',
 //note 
 addNote:'Voice/UploadNoteSaleTeam',
 getGetNoteByAccout:'Voice/GetNoteDetailsSaleTeam',
 confirmDeleteNote:'Voice/DeleteNoteSaleTeam',
 getNoteVoice:"Voice/GetNoteSaleTeam",
 // transaction
 addEditNewTransaction:'TransactionNew/PostNewTransaction',
 getAllTransationCode:'TransactionCode/GetAllTransactionCode',
 getAllTransactionsByAccountId:'TransactionNew/GetAllTransactionByAccountIDInMultiLine',
 addInvoiceId:'TransactionNew/UpdateTransactionInvoiceIDs',
 updateBalance:'TransactionNew/UpdateTransactionReceiveAmount',
 getDatForInvoice:'TransactionNew/GetAllInvoiceDetail',
// getDatForInvoice:'TransactionNew/GetAllTransactionByInvoiceIDInMultiLine',
 manageBalance:'TransactionNew/UpdateTransactionReceiveAmount',
 getDetailOfManageBalance:'TransactionNew/GetAllTransactionReceiveAmtDetail',
 uploadTransactionFile:'FAttachmentTransactionTeam/UploadMultiFilesTransactionTeam',
 getAllTransactionFileByAccountId:'FAttachmentTransactionTeam/GetAllFileDetailsTransactionTeam',
 getUploadFileByTransactionId:'FAttachmentTransactionTeam/GetAllFileDetailsTransactionTeam',
 getAllTransactionFile:'FAttachmentTransactionTeam/GetAllFileDetailsTransactionTeam',
 getALlTransactionMulti:'TransactionNew/GetAllTransactionByIDInMultiLine',
 //claim
 geAllClaimByClaimId:'Claim/GetAllClaim',
 getAllPolicyByAccounrId:'ChildPolicy/GetAllChildPolicyByAccountIDOnlyNew',
 addEditClaim:'Claim/PostNewClaim',
 getAllClaim:'Claim/GetAllClaimByAccountID',
 getMoveData:'Claim/ShowClaimMoveToConfirmByAccountID',
 confirmClaim:'Claim/QACheckClaim',
 moveToConfirem:'Claim/ClaimDoneByCarrier',
 getAllAdjuterByClaimId:'Adjust/GetAllAdjustByClaimID',
 addEditAdjuster:'Adjust/PostNewAdjust',
 claimNote:'Claim/PostNewClaimNote',
 getClaimNoteById:'Claim/GetAllClaimNotes',
 reverseClaim:'Claim/ReverseClaim',

 getAllCalimDatawithoutAccountId:'Claim/GetAllClaim',
 updateClaimStats:'Claim/UpdateClaimStatus',
 //tempalteForMTrut//
 getAllDetailToFillTemplate:'ChildPolicy/GetAllDriverVehicleCountAccAndClientSummary',
//broker//
getAllBroker:'Broker/GetAllBroker',
addEditBroker:'Broker/PostNewBroker',
deleteBroker:'Broker/DeleteBroker',
getBrokerById:'Broker/GetAllBrokerByID',
//carrier//
getAllCarrier:'Carrier/GetAllCarrier',
addEditCarrier:'Carrier/PostNewCarrier',
deleteCarrier:'Carrier/DeleteCarrier',
getCarrierById:'Carrier/GetAllCarrierByID',
//renew//
getListOfAllRenewPolicyWithoutAccountId:'ChildPolicy/GetAllChildPolicyByAccountIDExpireInNintyDays',
addRenewAble:'ChildPolicy/UpdatePolicyStatusNew',
//lossTun//
attachmentOfLossRun:'FAttachmentLR/UploadingMultiLR',
getLossrundetail:'FAttachmentLR/GetAllFileDetailLR',

//App Login //

createUser:'APPLogin/PostNewUser',
getAllLoginDetail:'APPLogin/GetAllAPPLogin',


// Carrier Software //

getDataByDot:'Department/GetByDot',
getInfo:'CarSoft/GetByDot',
getInfoSingleVehicle:'CarSoft/GetByDotSingleVin',



//certs//
 addEditHolder:'AccountHolding/PostNewHolding',
 getAllHolderByAccountId:'AccountHolding/GetAllHoldingsByAccountID',
 getHolderByHolderId:'AccountHolding/DeleteHolding',
 getAllHolder:'AccountHolding/GetAllHoldings',
 getPolicyDetailsBaseOfAccountId:'AccountHolding/AllAccountAndPolicyDetail',
 addFakeVehicle :'HoldingVehicle/AddNewHoldingVehicle',
 getFakeVehicleByHolderId:'HoldingVehicle/GetAllHoldingVehicleByHoldingID',
 deleteFakeVehicleById:'HoldingVehicle/DeleteHoldingVehicle',
 uploadFakeVehicleByExcel:'HoldingVehicle/ReadHoldingVehicleExcelFileAndAppend',
 uploadHolderCertificate:'HoldingVehicle/UploadHoldingCertificate',
 getHolderCertificateByHolderId:'HoldingVehicle/GetHoldingCertificate',
 getHolderCertificateByAccountId:'HoldingVehicle/GetHoldingCertificateByAccountId',


 //report and support team //

ReportTeamUploadMultiFiles :'FAttachmentReportTeam/UploadMultiFiles',
getReportTeamExcelFileDataGet:'FAttachmentReportTeam/GetAllFileDetails',
supportOrReportTeamVehicle:'VehicleNew/AddNewVehicleNew',
getSupportAndReportTeamVehicle:'VehicleNew/GetAllVehicleNewByAccountID',
deleteSupportAndReposrtTeamDeleteVehicle:'VehicleNew/DeleteVehicleNew',
getByIdReportAndSupport:'VehicleNew/GetAllVehicleNewByID',
dataByExcelSupport:'VehicleNew/AddUpdateVehicleNewExcelFile',
deleteSupportVehicle:'VehicleNew/DeleteVehicleNew',



//account Team //
getDataForAccountingTeam:'FAttachmentLR/GetAllAccountingTeamAttachment',
addAccountIngAttachement:'FAttachmentLR/UploadingAccountingTeamAttachment',
carrierUploadFiles:'FAttCarrier/UploadMultiFiles',
getCarrilerUploadFile:'FAttCarrier/GetAllFileDetails',

brokerUpload:'FAttBroker/UploadMultiFiles',
getBrokerUploadFile:'FAttBroker/GetAllFileDetails',


//transaction get data//
getTransactionData:'Account/GetAllAccountOnlyClientAndInsured',
loginDetails:'Login/GetLoginSummaryByPeriod',
loginDetailWeekly:'Login/GetLoginSummaryByPeriod',
 

// auto Mail


issueMail:'MarkedPolicy/MailIssuePolicyThisWeek',
nonIssueMail:'MarkedPolicy/MailNotIssuePolicyThisWeek',


loginStartDate:'Login/StartLoginSession',

 loginDaily: 'Login/GetLoginSummaryByPeriod/daily',
  loginWeekly: 'Login/GetLoginSummaryByPeriod/weekly',
  loginMonthly: 'Login/GetLoginSummaryByPeriod/monthly',







  getAllAgent:'Agents/GetAllAgents',
  getAllAgentByByAgentId:'Agents/GetAllAgentsByID',
  addEditAgent:'Agents/PostNewAgent',
  deleteAgents:'Agents/DeleteAgent',


  getPolicByAccountId:'ChildPolicy/GetAllChildPolicyByAccountIDSeeAll',
  getPolicyByChildPolicyId:'ChildPolicy/GetAllChildPolicy',




  // api/LineName/AddNewLineName



  //vehicle Attachement //

  addVehicleAttachment:'FAttachmentBindingTeam/UploadMultiFilesVehicle',
  deleteFileVehicle:'FAttachmentBindingTeam/DeleteFileVehicle',
  deleteFileVehiclePermanect:'FAttachmentBindingTeam/DeletePermantlyFileVehicle',
//  addVehicleAttachment:'FAttachmentBindingTeam/SaveOrUpdateMultiFilesVehicle', 
  getAttachVehicleById:'FAttachmentBindingTeam/GetAllFileVehicleByChildPolicyId',
  getAttachVehicleByEndrosement:'FAttachmentBindingTeam/GetAllFileVehicleByEndorsementId',
  getAttachVehicleByFIleId:'FAttachmentLR/GetFileVehicle',



  //add VDrover//

    driverGetForService:'Vehicle/GetAllDriverForService',
    addDriverAttachment:'FAttachmentBindingTeam/UploadMultiFilesDriver',
    deleteFileDriver:'FAttachmentBindingTeam/DeleteFileDriver', 
    deleteDriverFilePermanet:'FAttachmentBindingTeam/DeletePermantlyFileDriver',

  getAttachDriverById:'FAttachmentBindingTeam/GetAllFileDriverByChildPolicyId',
  getAttachDriverByEndrosement:'FAttachmentBindingTeam/GetAllFileVehicleByEndorsementId',
  getAttachDriverByFIleId:'FAttachmentLR/GetFileDriver',
  getDriverListForBillingByAccountId:'TransactionNew/GetAllTransactionByAccountIDInMultiLineDriver',



//new File//
bindingFile:'ChildPolicy/GetAllChildPolicy',
//srviceId Billing//
getAllVehcileDetailsByPolicyId:'Vehicle/GetAllVehicleForService',


//file ATA//
getATAFileDataChildPolicyId:'ChildPolicy/GetChildpolicyTermByChildPolicyId',
UpdateFileATA:'ChildPolicy/UpdateChildpolicyTerm',

//inovice extande and montly //
extandInvoice:'ChildPolicy/GetAllChildPolicyByAccountID',
montlyInvoice:'ChildPolicy/GetAllChildPolicTermByChildID',
expirePolciyBind:'ChildPolicy/GetAllChildPolicyIssuedExpiry',
expirePolicyNotBind:'ChildPolicy/GetAllChildPolicyNotIssuedExpiry',
reportBillingBaseOfAgent:'TransactionNew/GetAllTransactionByAccountIDInMultiLineByAgentID',

AccountIdBaseInvoice:'TransactionNew/GetAllInvoiceDetailBYAccountID',

getInvoiceDetailByTransactionId:'TransactionNew/GetAllInvoiceDetailByTransactionID',



subCarrier:'SubCarrier/PostNewSubCarrier',
getAllSubCarrier:'SubCarrier/GetAllSubCarrier',
getSubCarrierById:'SubCarrier/GetAllSubCarrierByID',
deleteSubCarrierById:'SubCarrier/DeleteSubCarrier',

suCarrierByCarrier:'SubCarrier/GetAllSubCarrierByCarrierID',


addAgentBORAttachement:'FAttachmentBindingTeam/UploadMultiFilesAccountAgent',
getBorAttachemnt:'FAttachmentBindingTeam/GetAllFileDetailsAccountAgent',
getConfirmBor:'Agents/ConfirmAgent',
stuffAttachement:'FAttachmentReportTeam/UploadMultiFilesStuff',
getStuff:'FAttachmentReportTeam/GetAllStuff',

 billindDelete:'TransactionNew/DeleteTransaction',

// ATA ATTACHMENET
 addLicence:"FAttachmentPM/UploadMultiFilesLicenceATA",
 getLicenceAttachement:'FAttachmentPM/GetAllFileLicenceATA',

 addSurpul:'FAttachmentPM/UploadMultiFilesSurpulLine',
 getSurpul:'FAttachmentPM/GetAllFileSurpulLine',

 addPardeep:'FAttachmentPM/UploadMultiFilesPardeep',
 getPardeep:'FAttachmentPM/GetAllFilePardeep',

 addOtherCoverage:'FAttachmentPM/UploadMultiFilesOtherConverege',
 getOtherCoverage:'FAttachmentPM/GetAllFileOtherConverege',
 addEndo:'FAttachmentPM/UploadMultiFilesEnde',
  getEndo:'FAttachmentPM/GetAllFileEnde',
 addDyl:'FAttachmentPM/UploadMultiFilesDyl',
 getDyl:'FAttachmentPM/GetAllFileDyl',
 addW9:'FAttachmentPM/UploadMultiFilesWN',
 getW9:'FAttachmentPM/GetAllFileWN',
 addAgentOpt:'FAttachmentPM/UploadMultiFilesAgentOpit',
 getAgentOpitment:'FAttachmentPM/GetAllFileAgentOpit',
 addATAOpitmenet:'FAttachmentPM/UploadMultiFilesATAOPP',
 getATAOpitment:'FAttachmentPM/GetAllFileATAOPP',
 addATATax:'FAttachmentPM/UploadMultiFilesATATax',
 getATATax:'FAttachmentPM/GetAllFileATATax'















// api/
// api/
// api/FAttachmentPM/GetAllFileATATax
 



//  ExtraTax

//  /{TransactionID}/{UserName}

//delete//
//api/ChildPolicy/DeleteChildPolicy//

//api/Carrier/DeleteCarrier/{ID}//

//api/Agents/DeleteAgent/{AgentID}//

//...api/Account/DeleteAccount

//public class IDeleteModel
//{
    // public Int32 AccountID { get; set; }
    // public string DeletedBy { get; set; }
    // public string DeletedByTeam { get; set; }
    // public string DeletedReason { get; set; }}//



//     ...api/ChildPolicy/DeleteChildPolicy
// public class IuserDelReason
// {
//     public Int32 ChildPolicyID { get; set; }
//     public string UserName { get; set; }
//     public string DeleteReason { get; set; }
//     public string DeletedBy { get; set; }
//     public DateTime ExpirationDate { get; set; }

// }




//SubCarrier/DeleteSubCarrier//









 
}