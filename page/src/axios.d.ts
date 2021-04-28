import * as axios from 'axios';
interface Modules {
  [propName: string]: any;
}
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
    interface: Modules;
    section: Modules;
  }
}
