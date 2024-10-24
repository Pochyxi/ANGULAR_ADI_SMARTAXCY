import { ProfilePermissionInterface } from './profile-permission-interface';

// UTENTE
export class User {
  id: number;

  username: string;

  email: string;

  enabled: boolean;

  temporaryPassword: boolean;

  dateTokenCheck: string;

  profileName: string;

  profilePermissions: ProfilePermissionInterface[];

  constructor() {
    this.id = 0;

    this.username = '';

    this.email = '';

    this.enabled = false;

    this.temporaryPassword = false;

    this.dateTokenCheck = '';

    this.profileName = '';

    this.profilePermissions = [];
  }
}
