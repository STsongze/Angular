**Angular基础认识**
### 搭建环境
> 如果要是安装比较慢的话，那就用淘宝镜像，也就是cnpm；
- 全局安装Angular

```
cnpm install -g @angular/cli 
```
- 创建项目目录

```
ng new angular2-demo-master --skip-install
```
- 进入项目目录

```
cd angular2-demo-master
```
- 起服务

```
ng serve
```
- 安装webpack

```
cnpm install webpack --save
```
- 运行程序

```
npm start
```
### 编写程序
> 在项目目录下新建一个名为app的文件夹，所有的程序都在这个文件里编写；
- 新建app.component.html文件

```
<div class="cmp-1">
  <h1>根组件</h1>
  <p>
    嘿嘿，{{ greeting }}！
    <label>
      <input type="checkbox" [(ngModel)]="isShowMore">
      是否显示详细信息
    </label>
  </p>
  <p highlight *ngIf="isShowMore">Angular 2 是 Google 推出的新一代的Web开发框架</p>
  <my-child [message]="msgToChild" (outer)="receive($event)"></my-child>
  <p>从子组件获得的消息：{{ msgFromChild || '暂无' }}</p>
</div>
```
- 新建app.component.ts文件

```
import { Component } from '@angular/core';

import { LoggerService } from './logger.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html'
})
export class AppComponent {
  private greeting: string;
  private isShowMore: boolean;
  private msgToChild: string;
  private msgFromChild: string;

	constructor(private logger: LoggerService) {	}

  ngOnInit() {
    this.greeting = 'Angular 2';
    this.msgToChild = 'message from parent';
    this.logger.debug('应用已初始化');
  }

  receive(msg: string) {
    this.msgFromChild = msg;
  }
}

```
- 新建app.module.ts文件

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ChildComponent } from './child.component';
import { HighlightDirective } from './highlight.directive';
import { LoggerService } from './logger.service';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ChildComponent, HighlightDirective ],
  providers: [ LoggerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

```
- 新建child.component.html文件

```
<div class="cmp-2">
  <h1>子组件</h1>
  <p>嘿嘿，我从父组件获取的值是：{{ message }}</p>
  <button (click)="sendToParent()">发送到父组件</button>
</div>

```
- 新建child.component.ts文件

```
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-child',
  templateUrl: './app/child.component.html'
})
export class ChildComponent {
  @Input() private message: string;
  @Output() private outer = new EventEmitter<string>();
	constructor() {	}
  
  sendToParent() {
    this.outer.emit('message from child');
  }
}

```
- 新建highlight.directive.ts文件

```
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: "[highlight]"
})
export class HighlightDirective {
  constructor(
    private el: ElementRef, 
    private renderer: Renderer
  ) { 
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }
}

```
- 新建logger.service.ts文件

```
import { Injectable } from '@angular/core';

@Injectable() 
export class LoggerService {
  constructor() { }

  debug(msg: string) {
    console.log(msg);
  }
}
```
> 注意：以上文件都是在app文件夹下创建的；
### 修改文件
- index.html文件

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Angular 2 快速上手</title>
    <base href="/">
    <style>
      html {font-family:'Microsoft Yahei';background-color:#F7F48B;}
      p {margin:8px 0;padding:0;}
      h1 {font-size:20px;}
      button,input {font-size:16px;}
      .cmp-1 {background:#A1DE93;border-radius:5px;width:500px;height:300px;margin:100px auto;padding:20px;}
      .cmp-2 {border:1px solid #ccc;border-radius:5px;background-color:#70A1D7;padding: 10px;margin:20px 0;}
    </style>
  </head>
  <body>
    <my-app>加载中...</my-app>
    <script src="bundle.js"></script>
  </body>
</html>

```
- main.ts文件

```
import 'zone.js';

import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

// JiT启动模式
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

```
- webpack.config.js文件

```
module.exports = {
  entry: './main.ts',

  output: {
    filename: './bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};

```
### 知识点总结
> 模块的两层含义
- 框架代码以模块形式组织（文件模块）
- 功能单元以模块形式组织（应用模块）
> 文件模块
- @angular/core  核心模块
- @angular/common  通用模块
- @angular/forms  表单模块
- @angular/http  网络模块
> 应用模块
![看这里](https://github.com/STsongze/Angular/blob/master/jia.png)
---
> 知识点也总结完了，接下来就看看效果吧：
![看这里](https://github.com/STsongze/Angular/blob/master/xiaoguo.gif)
