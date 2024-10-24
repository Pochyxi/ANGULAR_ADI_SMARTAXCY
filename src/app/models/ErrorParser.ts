import { HttpErrorResponse } from '@angular/common/http';

export class ErrorParser {
  // FUNZIONE CHE RITORNA UN MESSAGGIO D'ERRORE IN BASE ALL'ERRORE RICEVUTO, LAVORA CON LA SNACKBAR
  public static parse(error: HttpErrorResponse) {
    switch (error.error.message) {
      case 'Credenziali non valide':
        return 'Username/email o password errati ';

      case 'BADCREDENTIALS':
        return 'Username/email o password errati ';

      case 'NF404':
        return 'Risorsa non trovata';

      case 'EXISTINGUSERNAME':
        return 'Utente esistente';

      case 'EXISTINGEMAIL':
        return 'Esiste un account collegato a questa email';

      case 'NOTSAMEPASSWORDS':
        return 'La vecchia password non può corrispondere a quella nuova';

      case 'NOTUSERENABLED':
        return 'Utente non abilitato o in attesa di conferma email';

      case 'TEMPORARYPASSWORD':
        return 'Password Temporanea';

      case 'TOKENOBSOLETE':
        return 'Il token utilizzato è obsoleto, probabilmente dovuto ad un cambio password';

      case 'EXISTINGCONFIRMATION':
        return 'Esiste una richiesta effettuata precedentemente';

      case 'Validation Errors':
        return 'Sono stati riscontrati degli errori di validazione';

      case 'NOT_EMPTY_PROJECT':
        return 'Non è possibile eliminare il progetto, sono presenti dipendenti assegnati';

      // ERRORE GENERICO
      default:
        console.log(error);

        return 'Ops! Qualcosa è andato storto';
    }
  }
}
