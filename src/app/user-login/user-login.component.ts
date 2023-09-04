import { Component,ElementRef, ViewChild} from '@angular/core';
import { faEye , faEyeSlash , faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserLoginService } from './user-login.service'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  public accountNumber:string='';
  public userName:string='';
  public password:string='';
  public checkStorage:boolean=false;

  public accountEye = faEye;
  public userEye = faEye;
  public passwordEye = faEyeSlash;
  public faExclamationCircle = faExclamationCircle;

  public fitstLogin:boolean = true;
  public isAccountMwssage:boolean = false;
  public isUserNameMwssage:boolean = true;

  public checkAccountValue = false;
  public checkUserValue = false;
  public checkPasseordValue = false;

  

  //public checkEye = document.getElementById("checkEye");
  //public floatingPassword =  document.getElementById("floatingPassword") || {}};
  @ViewChild('floatingAccount') floatingAccount: ElementRef | undefined;
  @ViewChild('floatingUserName') floatingUserName: ElementRef | undefined;
  @ViewChild('floatingPassword') floatingPassword: ElementRef | undefined;
  
  @ViewChild('checkEye') checkEye: ElementRef | undefined;
  

  constructor(private userLoginService:UserLoginService) {
    
  }

  ngOninit() {

  }

  public showPsw(params:string) {

    switch(params) {
      case 'account':
        if(this.floatingAccount) {
          if(this.accountEye === faEyeSlash) {
            this.floatingAccount.nativeElement.type = 'text';
            this.accountEye = faEye;
          }else if(this.accountEye === faEye) {
            this.floatingAccount.nativeElement.type = 'password';
            this.accountEye = faEyeSlash;
          }
        }
        break;
      case 'userName':
        if(this.floatingUserName) {
          if(this.userEye === faEyeSlash) {
            this.floatingUserName.nativeElement.type = 'text';
            this.userEye = faEye;
          }else if(this.userEye === faEye) {
            this.floatingUserName.nativeElement.type = 'password';
            this.userEye = faEyeSlash;
          }
        }
        break;
      case 'password':
        if(this.floatingPassword) {
          if(this.passwordEye === faEyeSlash) {
            this.floatingPassword.nativeElement.type = 'text';
            this.passwordEye = faEye;
          }else if(this.passwordEye === faEye) {
            this.floatingPassword.nativeElement.type = 'password';
            this.passwordEye = faEyeSlash;
          }
        }
        break;
    }
  }

  public showMsg(param:string) {
    this.checkAccountValue = true
    switch(param) {
      case 'account':
        this.isAccountMwssage = true;
        break;
      case 'user':
        this.isUserNameMwssage = true;
        break;
      case 'password':  
      default :
    }
  }

  public closeUserDiag() {
    this.isUserNameMwssage = false;
    this.fitstLogin = false;
  }

  public onSetUserName() {
    this.fitstLogin = false;
  }

  public onCheckAccountValue() {
    if(this.accountNumber.length === 0) {
      this.checkAccountValue = true;
      return
    }

    this.checkAccountValue = false;
  }

  public onCheckUserValue() {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/
    if(this.userName.length === 0) {
      this.checkUserValue = true;
      return
    }

    if(!regex.test(this.userName)) {
      this.checkUserValue = true;
      return
    }

    this.checkUserValue = false;
  }

  public onCheckPasswordValue() {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/
    if(this.password.length === 0) {
      this.checkPasseordValue = true;
      return
    }

    if(!regex.test(this.password)) {
      this.checkPasseordValue = true;
      return
    }

    this.checkPasseordValue = false;
  }

  public onLogin() {
    this.onCheckAccountValue();
    this.onCheckUserValue();
    this.onCheckPasswordValue();

    let logInData = {
      "pi_CommonData": {
      "SystemID": "42",
      "LoginSystemID": "42"
      },
      "pi_Login_19_2": { 
      "Acc": this.accountNumber,
      "UserID": this.userName,
      "UserID2": "",
      "Pw": this.password,
      "DeviceID": "",
      "PushID": ""
      }
     }
    let loginResult = this.userLoginService.login_19_2(logInData);

    if(loginResult?.po_Login_19_2?.ReturnCode) {
      let resultCode = loginResult.po_Login_19_2.ReturnCode
      if(resultCode === 0) {

      }else if(resultCode === -11) {
  
      }else if(resultCode === -14) {
  
      }
    }

  }
}
