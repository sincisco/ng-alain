import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../../core/session.service";
import {NzModalService} from "ng-zorro-antd";
import {DA_SERVICE_TOKEN, ITokenService} from "@microon/auth";
import {LoginService} from "./login.service";

@Component({
    selector: "login",
    templateUrl: "./login.html",
    styleUrls: ["./login.less"]
})
export class LoginComponent implements OnInit {

    loading = false;
    validateForm: FormGroup;

    constructor(private router: Router,
                private session: SessionService,
                private loginService: LoginService,
                private fb: FormBuilder,
                private modal: NzModalService,
                @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    submit() {
        // mock http
        this.loading = true;

        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }

        this.loginService.login(this.validateForm.value).subscribe(
            data => {
                console.log("login next");
                this.loading = false;
                console.log("登录返回信息", data);

                switch (data.retCode) {
                    case "FF":
                    case "TT":
                    case "EE":
                        this.modal.error({
                            content: `登录异常！ 返回码：${data.retCode}, 返回信息：${data.retMsg}`
                        });
                        break;
                    case "LF":
                        this.session.parseData(data);
                        this.router.navigate(["password"]);
                        break;
                    case "LU":
                    case "00":
                        this.session.parseData(data);
                        // RetInfo 怎么处理？？？
                        this.router.navigate([this.tokenService.redirect || "/"]);
                        break;
                    default :
                        console.log("未知错误！");
                        break;
                }
            }, error => {
                console.log("login error");
                console.log(error);
            },
            () => {
                console.log("login complete");
            }
        )
        ;

    }


    ngOnInit() {

        this.session.logout();

        this.validateForm = this.fb.group({
            userID: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

}
