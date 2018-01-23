import {Component, OnInit} from "@angular/core";
import {NzModalModule, NzModalService} from "ng-zorro-antd";
import {Page} from "../../../models/page";
import {UserService} from "./user.service";
import {List} from "lodash";

@Component({
  selector:"user",
  templateUrl: "./user.html"
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService,
              private model:NzModalService) {
  }

  formModel={};
  dataSet = [];
  loading = true;
  page = new Page();
  roles=[];

  ngOnInit(){
    console.log("当前页大小"+this.page.pageSize)
    this.userService.getRoles()
      .subscribe(data=>{
        return this.roles = (<any>data).retList;
      });
    this.formModel['userNo']=null;
    this.formModel['roleNo']=null,
    this.formModel['userName']=null,

    this,this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;

    // 合并 this.page 与 this.formModel对象
    //const params = _.extend({orgType_Query: 1}, _.omitBy(this.formModel, _.isNull), this.page);

    console.log(this.formModel);
    var params={
      curPage:this.page.curPage,
       pageSize:this.page.pageSize,
       userNo:this.formModel['userNo']||"",
       roleNo:this.formModel['roleNo']||"",
       userName:this.formModel['userName']||"",

    };

    console.log(params);

    this.userService.getUsers(params)
      .subscribe(data=>{
        console.log(data);
        this.dataSet=(<any>data).retList;
        this.page.totalRow = data["totalRow"];
        this.page.pageSize = data["pageSize"];
        this.page.curPage = data["curPage"];
        this.loading=false;
      })
  }

  search(){
    this.refreshData(true);
  }

  showDetail(content){
    this.model.open({
      title:"用户详情",
      footer:false,
      maskClosable:false,
      content:content
    })
  }

  deleteUser(no){
    var params={
      no:no
    };
    this.userService.delUser(params)
      .subscribe(data=>{
        console.log(data);
        this.refreshData(false);
      })
  }

    openModify(item:any){

    }

    openAdd(){

    }
}
