import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {SessionService} from "@core/session.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";

@Component({
    templateUrl: "./password.html",
    styleUrls: ["./password.less"]
})
export class PasswordComponent implements OnInit {
    validateForm: FormGroup;
    name;

    constructor(private session: SessionService,
                private fb: FormBuilder,
                private nzMessage: NzMessageService,
                private router: Router,
                private http: HttpClient) {

    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [this.session.name, [Validators.required]],
            oldPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required, Validators.minLength(5)]],
            repeatNewPassword: [null, [Validators.required, this.confirmationValidator]],
        });

    }

    updateConfirmValidator() {
        /** wait for refresh value */
        setTimeout(_ => {
            this.validateForm.controls["newPassword"].updateValueAndValidity();
        });
    }

    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
        if (this.validateForm.invalid) {
            return;
        }
        const params = {
            no: this.session.account,
            passwd: this.validateForm.controls.oldPassword.value,
            newPasswd: this.validateForm.controls.newPassword.value,
        };
        console.log(params);
        this.http.put(environment.SERVICE_URL + "base/v1/user/password?type=set", params)
            .subscribe(data => {
                console.log(data);
                console.log("update success");
                this.nzMessage.success("  修改密码成功！");
                console.log("loading guard: navigates to login...");
                this.router.navigate(["/login"]);
            }, data => {
                // TODO:修改密码失败
            });

    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {       // TODO: 注意这个函数的声明方式！
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.validateForm.controls["newPassword"].value) {
            return {confirm: true, error: true};
        }
    };

    resetForm(evt: MouseEvent) {
        evt.preventDefault();       // TODO: 为什么第二个按钮还会触发提交事件？？
        this.validateForm.reset({
            name: this.session.name
        });
        console.log(this.validateForm);
    }

}
