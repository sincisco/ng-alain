/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface WebpackRequire {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}
interface NodeRequire extends WebpackRequire {}
declare var require: NodeRequire;

// G2
declare var G2: any;
declare var Slider: any;
declare var Cloud: any;

interface JQueryStatic {
    cookie(key, value?, options?):any;
    removeCookie(key, options?);
    clearAllCookie();
}

interface JQuery {
    mousewheel(callback:Function): any;
    animateCss(name:string,callback?:Function):any;
    transitionEnd(callback?:Function):any;
    transitionOnce(cssMap?:any):any;
}
