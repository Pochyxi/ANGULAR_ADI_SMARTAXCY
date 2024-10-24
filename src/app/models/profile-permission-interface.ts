// I PERMESSI CHE UN UTENTE PUO' AVERE
export interface ProfilePermissionInterface {
  id: string;

  permissionName: string;

  valueRead: number;

  valueCreate: number;

  valueDelete: number;

  valueUpdate: number;
}
