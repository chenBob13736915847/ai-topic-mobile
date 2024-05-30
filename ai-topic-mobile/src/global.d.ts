/*
 * @Author: shantenghui
 * @Date: 2023-08-02 19:45:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-27 15:43:28
 */
/// <reference types="@king-fisher/vue-webpack" />

/**
 * 用于描述拓展组件定义
 * 下面是一个定义示例
 *   declare class Demo {
 *     name: string;
 *     sayName(): void;
 *   }
 *
 * 使用如下:
 * 使用global.d.ts 声明的类
 *   let demo = new Demo()
 *   demo.sayName()
 */
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';

interface Window {
  weblog: any;
  backWash: any;
}