export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    somethingCustom?: string;
    verified?: string;
    isDoctor?: boolean;
    isPharma?: boolean;
    isMedOrder?: boolean;
}