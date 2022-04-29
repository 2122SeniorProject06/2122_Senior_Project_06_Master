//classes to create user login and registration models

export class UserModel {
  public userId?: string;

  UserModel() { }
}
export class UserRegistration {
  public username!: string;
  public email!: string;
  public password!: string;
  public confirmedPassword!: string;
  public verificationResults!: boolean[];
  public verificationErrors!: string[];
  //public id!: number;
  UserRegistration() {

  }
}

export class UserLogin {
  public Email!: string;
  public Password!: string;
  UserLogin() {

  }
}

export class AccountEdit {
  public userID!: string | null | undefined;
  public new_Username!: string;
  public new_Password!: string;
  public old_Password!: string;
  public new_Email!: string;
  public confirmedPassword!: string;
  public verificationResults!: boolean[];
  public verificationErrors!: string[];
  public darkMode!: boolean;
  public background!: string;

  AccountEdit() {

  }
}

export class UserAccount{
  public userID!: string | null | undefined;;
  public username!: string;
  public email!: string;
  public isSetting!: boolean;
  public darkMode!: boolean;
  public background!: string;

  UserAccount() {}
}
