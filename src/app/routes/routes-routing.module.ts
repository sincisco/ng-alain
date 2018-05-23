import {LayoutMetroV2Component} from "./../layout/metro-v2/layout.metro.component";
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {environment} from "@env/environment";
// layout
import {LayoutDefaultComponent} from "../layout/default/default.component";
import {LayoutFullScreenComponent} from "../layout/fullscreen/fullscreen.component";
import {LayoutPassportComponent} from "../layout/passport/passport.component";
// dashboard pages
import {DashboardV1Component} from "./dashboard/v1/v1.component";
import {DashboardAnalysisComponent} from "./dashboard/analysis/analysis.component";
import {DashboardMonitorComponent} from "./dashboard/monitor/monitor.component";
import {DashboardWorkplaceComponent} from "./dashboard/workplace/workplace.component";
// passport pages
import {UserLoginComponent} from "./passport/login/login.component";
import {UserRegisterComponent} from "./passport/register/register.component";
import {UserRegisterResultComponent} from "./passport/register-result/register-result.component";
// single pages
import {CallbackComponent} from "./callback/callback.component";
import {Exception403Component} from "./exception/403.component";
import {Exception404Component} from "./exception/404.component";
import {Exception500Component} from "./exception/500.component";
import {AuthGuard} from "@core/guard/auth-guard.service";
import {LoginGuard} from "@core/guard/login-guard.service";
import {LoginAComponent} from "./login/login-a/login.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutMetroV2Component,
        canActivate: [LoginGuard],
        canActivateChild: [AuthGuard],
        children: [
            {path: "", redirectTo: "dashboard/v1", pathMatch: "full"},
            {path: "dashboard", redirectTo: "dashboard/v1", pathMatch: "full"},
            {path: "dashboard/v1", component: DashboardV1Component, data: {translate: "dashboard_v1"}},
            {
                path: "dashboard/analysis",
                component: DashboardAnalysisComponent,
                data: {translate: "dashboard_analysis"}
            },
            {path: "dashboard/monitor", component: DashboardMonitorComponent, data: {translate: "dashboard_monitor"}},
            {
                path: "dashboard/workplace",
                component: DashboardWorkplaceComponent,
                data: {translate: "dashboard_workplace"}
            },
            {path: "system", loadChildren: "./system/system.module#SystemModule"},

            /* 开发案例 */
            {path: "widgets", loadChildren: "./reference/widgets/widgets.module#WidgetsModule"},
            {path: "elements", loadChildren: "./reference/elements/elements.module#ElementsModule"},
            {path: "other", loadChildren: "./reference/other/other.module#OtherModule"},
            {path: "forms", loadChildren: "./reference/forms/forms.module#FormsModule"},
            {path: "editor", loadChildren: "./reference/editor/editor.module#EditorModule"},
            {path: "charts", loadChildren: "./reference/charts/charts.module#ChartsModule"},
            {path: "tables", loadChildren: "./reference/tables/tables.module#TablesModule"},
            {path: "maps", loadChildren: "./reference/maps/maps.module#MapsModule"},
            {path: "pages", loadChildren: "./reference/pages/pages.module#PagesModule"},
            {path: "logics", loadChildren: "./reference/logics/logics.module#LogicsModule"},
            {path: "extras", loadChildren: "./reference/extras/extras.module#ExtrasModule"},
            {path: "pro", loadChildren: "./reference/pro/pro.module#ProModule"}
        ]
    },
    // 全屏布局
    {
        path: "data-v",
        component: LayoutFullScreenComponent,
        children: [
            {path: "", loadChildren: "./reference/data-v/data-v.module#DataVModule"}
        ]
    },
    // passport
    {
        path: "passport",
        component: LayoutPassportComponent,
        children: [
            {path: "login", component: UserLoginComponent},
            {path: "register", component: UserRegisterComponent},
            {path: "register-result", component: UserRegisterResultComponent}
        ]
    },
    {
        path: "login",
        component: LoginAComponent
    },
    // 单页不包裹Layout
    {path: "callback/:type", component: CallbackComponent},
    {path: "403", component: Exception403Component},
    {path: "404", component: Exception404Component},
    {path: "500", component: Exception500Component},
    {path: "**", redirectTo: "dashboard"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: environment.useHash})],
    exports: [RouterModule]
})
export class RouteRoutingModule {
}
