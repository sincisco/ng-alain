import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DA_SERVICE_TOKEN, ITokenService} from "@microon/auth";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {SessionService} from "@core/session.service";
import {LoginAService} from "../login.service";
import {Md5} from "ts-md5";


@Component({
    selector: "login",
    templateUrl: "./login.html",
    styleUrls: ["./login.less"]
})
export class LoginAComponent implements OnInit {

    loading = false;
    validateForm: FormGroup;
    passwordMD5;

    constructor(private router: Router,
                private fb: FormBuilder,
                private modal: NzModalService,
                private session: SessionService,
                private loginService: LoginAService,
                private message: NzMessageService,
                @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    submit() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }
        this.passwordMD5 = Md5.hashStr(this.validateForm.controls["password"].value).toString();

        this.loading = true;
        const params = {
            userNo: this.validateForm.controls["userNo"].value,
            password: this.passwordMD5,
            loginIp: this.validateForm.controls["loginIp"].value,
        };
        console.log(params);

        this.loginService.login(params).subscribe(
            data => {
                this.loading = false;
                console.log("登录信息：", data);
                switch (data.retCode) {
                    // case RET_CODE.PSW_FIRST:
                    case "000FL":
                        this.session.parseData(data);
                        this.router.navigate(["password"]);
                        break;
                    // case RET_CODE.SUCCESS:
                    case "00000":
                        this.session.parseData(data);
                        this.router.navigate([this.tokenService.redirect || ""]);
                        break;
                    default :
                        console.log("未知错误！");
                        break;
                }

            },
            error => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }

            }
        );

    }


    ngOnInit() {

        this.session.logout();

        this.validateForm = this.fb.group({
            userNo: ["admin", [Validators.required]],
            password: ["abcd1234", [Validators.required]],
            loginIp: [null]
        });
    }

}
