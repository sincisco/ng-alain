import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {ThemesService, SettingsService, TitleService, MenuService} from '@delon/theme';
import { filter } from 'rxjs/operators';
import {SessionService} from '@core/session.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed; }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed; }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed; }

  constructor(
    private theme: ThemesService,
    private settings: SettingsService,
    private session:SessionService,
    private menuService:MenuService,
    private router: Router,
    private titleSrv: TitleService) {
  }

  ngOnInit() {
    this.router.events
        .pipe(filter(evt => evt instanceof NavigationEnd))
        .subscribe((evt:NavigationEnd) => {
            this.titleSrv.setTitle();
            var url=evt.urlAfterRedirects;
            if(url.startsWith("/metro"))
                url=url.substring(6);
            this.session.currentPath=this.menuService.getPathByUrl(url).map((value)=>{
                return {
                    text:value.text,
                    link:value.link
                }
            });
        });
  }
}
