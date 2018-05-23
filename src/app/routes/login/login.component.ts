import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../../core/session.service";
import {NzModalService} from "ng-zorro-antd";
import {DA_SERVICE_TOKEN, ITokenService} from "@microon/auth";
import {LoginService} from "../passport/login/login.service";

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
                this.loading = false;
                console.log("登录返回信息", data);
                if (data.retCode !== "00") {
                    this.modal.error({
                        content: `登录异常！ 返回码：${data.retCode}, 返回信息：${data.retMsg}`
                    });
                    return;
                } else {
                    this.session.parseData(data);
                    // RetInfo 怎么处理？？？
                    this.router.navigate([this.tokenService.redirect || "/"]);
                }
            }, error => {
                console.log(error);
            },
            () => {
                console.log("login complete");
            }
        )
        ;

    }


    ngOnInit() {
        // 清除所有cookie
        $.clearAllCookie();

        this.validateForm = this.fb.group({
            userNo: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

}
