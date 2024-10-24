export const environment = {
  production: false,

  // ROOT API URL
  ROOTAPIURL: 'http://localhost:8080/api',

  //// LOGIN API URL
  LOGINAPIURL: '/auth/login',

  /////////////////////// AUTH API URL ///////////////////////
  // RECUPERO PASSWORD API URL
  RECOVERYPASSWORDAPIURL: '/auth/recovery_password?email=',

  // CAMBIO PASSWORD API URL
  CHANGEPASSWORDSAPIURL: '/auth/change_password',

  // CAMBIO PASSWORD CON TOKEN API URL
  CHANGEPASSWORDWITHTOKENAPIURL: '/auth/change_password?token=',

  // VERIFICA TOKEN API URL
  VERIFYTOKENAPIURL: '/auth/verify?token=',

  // INVIO EMAIL DI VERIFICA API URL (aggiungere /1 per lo user ID)
  SENDVERIFICATIONEMAILAPIURL: '/auth/resend_verification?userId=',
  /////////////////////// FINE ///////////////////////

  /////////////////////// USER API URL ///////////////////////
  //// UTENTE API URL
  USERAPIURL: '/user',

  // UTENTI API URL
  USERSAPIURL: '/user/all',

  // UTENTI PER PROGETTO API URL (aggiungere all dopo il nome progetto)
  USERSPROJECTAPIURL: '/employee/project/',

  // CREAZIONE UTENTI API URL
  USERCREATEAPIURL: '/auth/create',

  // ELIMINAZIONE UTENTI API URL
  USERDELETEAPIURL: '/user/delete',

  // MODIFICA UTENTI API URL
  USERMODIFYAPIURL: '/user/update/',

  // UTENTI PER EMAIL CONTAINS API URL
  USERSBYEMAILCONTAINSAPIURL: '/user/email_contains/',

  // USER BY PROJECT NAME API URL
  USERBYPROJECTNAMEAPIURL: '/employee/project-name/',
  /////////////////////// FINE ///////////////////////

  /////////////////////// EMPLOYEE API URL ///////////////////////
  // EMPLOYEE API URL
  EMPLOYEEAPIURL: '/employee',

  // EMPLOYEES API URL
  EMPLOYEESAPIURL: '/employee/all',

  // CREAZIONE EMPLOYEE API URL
  EMPLOYEECREATEAPIURL: '/employee/create',

  // MODIFICA EMPLOYEE API URL
  EMPLOYEEMODIFYAPIURL: '/employee/update',

  // ELIMINAZIONE EMPLOYEE API URL
  EMPLOYEEDELETEAPIURL: '/employee/delete',

  // UNBLOCK EMPLOYEE API URL
  EMPLOYEEUNBLOCKAPIURL: '/employee/remove-block',
  /////////////////////// FINE ///////////////////////

  /////////////////////// PROJECT API URL ///////////////////////
  // RECUPERO LISTA PROGETTI
  PROJECTSAPIURL: '/project/all',

  // MODIFICARE PROGETTO
  MODIFYPROJECTAPIURL: '/project/update',

  // CREAZIONE PROGETTO
  CREATEPROJECTAPIURL: '/project/create',

  // ELIMINAZIONE PROGETTO
  DELETEPROJECTAPIURL: '/project/delete',
  /////////////////////// FINE ///////////////////////

  /////////////////////// OFFICE API URL ///////////////////////
  // RECUPERO SINGOLO OFFICE
  OFFICEAPIURL: '/office',

  // RECUPERO LISTA OFFICE
  OFFICESAPIURL: '/office/all',

  // CREAZIONE OFFICE
  OFFICECREATEAPIURL: '/office/create',

  // MODIFICA OFFICE
  OFFICEMODIFYAPIURL: '/office/update',

  // ELIMINAZIONE OFFICE
  OFFICEDELETEAPIURL: '/office/delete',
  /////////////////////// FINE ///////////////////////

  /////////////////////// CLIENT API URL ///////////////////////
  // RECUPERO SINGOLO CLIENT
  CLIENTAPIURL: '/client',

  // RECUPERO LISTA CLIENT
  CLIENTSAPIURL: '/client/all',

  // CREAZIONE CLIENT
  CLIENTCREATEAPIURL: '/client/create',

  // MODIFICA CLIENT
  CLIENTMODIFYAPIURL: '/client/update',

  // ELIMINAZIONE CLIENT
  CLIENTDELETEAPIURL: '/client/delete',
  /////////////////////// FINE ///////////////////////

  /////////////////////// SMATPLAN API URL ///////////////////////

  // RECUPERO DTO SMATPLAN (aggiungere il numero del mese dopo month)
  // Poi aggiungere /year/nnnn per l'anno
  SMATPLANAPIURL: '/smartPlan/month/',
  /////////////////////// FINE ///////////////////////

  /////////////////////// RESERVATION API URL ///////////////////////
  // CREAZIONE RESERVATION
  RESERVATIONCREATEAPIURL: '/reservation/create',

  // MODIFICA RESERVATION
  RESERVATIONMODIFYAPIURL: '/reservation/update/',

  // ELIMINAZIONE RESERVATION
  RESERVATIONDELETEAPIURL: '/reservation/delete/',

  // RECUPERO RESERVATION PER EMPLOYEEID e DATE(aggiungere /{empooyeeId}/calendar/{date})
  RESERVAIONBYEMPLOYEEANDDATEAPIURL: '/reservation/employee/',

  // CREAZIONE MASSIVA RESERVATION
  RESERVATIONMASSIVECREATEAPIURL: '/massive',

  /////////////////////// FINE ///////////////////////

  /////////////////////// MASSIVE API URL ///////////////////////
  // CREAZIONE MASSIVA
  MASSIVECREATEAPIURL: '/massive_generation',
};

console.log('Ambiente di Sviluppo');
