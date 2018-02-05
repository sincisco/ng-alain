import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {NzModalService} from "ng-zorro-antd";
import {DA_SERVICE_TOKEN, ITokenService} from "@microon/auth";
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import {LoginAService} from '../login.service';


@Component({
    selector: "login",
    templateUrl: "./login.html",
    styleUrls: ["./login.less"]
})
export class LoginAComponent implements OnInit {

    loading = false;
    validateForm: FormGroup;

    constructor(private router: Router,
                private fb: FormBuilder,
                private modal: NzModalService,
                private session: SessionService,
                private loginService: LoginAService,
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
                this.session.parseData(data);

                switch (data.retCode) {
                    case "LF":
                        this.router.navigate(["/password"]);
                        break;
                    case "LU":
                    case "00":
                        // RetInfo 怎么处理？？？
                        this.router.navigate([this.tokenService.redirect || "/"]);
                        break;
                }
            }, error => {
                if(error instanceof HttpResponse){
                    const data= error.body;
                    this.modal.error({
                        content: `业务异常！ 返回码：${data.retCode}, 返回信息：${data.retMsg}`
                    });
                }else if(error instanceof HttpErrorResponse){
                    this.modal.error({
                        content: `服务端异常！ 返回码：${error.status}, 返回信息：${error.message}`
                    });
                }else if(error instanceof Error){
                    this.modal.error({
                        content: `异常！ ${error.message}`
                    });
                }else{
                    this.modal.error({
                        content: `登录过程中遇到未知异常！`
                    });
                }
                this.loading = false;
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
