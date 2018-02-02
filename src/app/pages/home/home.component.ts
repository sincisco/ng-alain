import {Component, Injector, OnInit} from "@angular/core";
import {SessionService} from "../..//core/session.service";
import {HomeService} from "./home.service";


@Component({
  selector: "home",
  templateUrl: "./home.html",
  styleUrls: ["./home.less"]
})
export class HomeComponent implements OnInit {
    no: string;
    userName: string;
    roleCatalog: number;
    dataLength: number;

  constructor( private injector: Injector,
               private session: SessionService,
               private service: HomeService) {
  }

  ngOnInit(): void {
      this.no = this.session.getUserSession().account;
      this.roleCatalog = this.session.getUserSession().roleCatalog;
      this.getUserDetail();
      this.getApplications();
  }

    getUserDetail(){
        this.service.getDetailByUserNo(this.no)
            .subscribe(data => {
                this.userName = data['name'];
                console.log("查询用户详情");
            });
    }

    getApplications(){
        const params = {
            appUser: "",
            unAudit: 1,
            curPage: 1,
            pageSize: 500,
        };

        this.service.getPage(params)
            .subscribe(data => {
                console.log(data);
                this.dataLength = data.retList.length;
            });
    }

}

