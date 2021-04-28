import Vue from 'vue'
import VueRouter, { Route } from 'vue-router';
import { AxiosInstance } from "axios";

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance,
    $router: VueRouter;
    $route: Route;
  }
}
