# vue-address

Provide Hong-Kong and Taiwan address vue selector address select is a lightweight yet flexible plugin for Vue.js 2.0 that allows you to easily get correct address input.

It supports the following features:

- 提供香港及台灣的中英文地址輸入格式。
- 自動判斷書入內容。若全為英文及數字，判別為英文地址，輸出英語地址格式。若有中文，輸出中文地址格式。
- 支援bootstrap validator

## Installation

Package is installable via npm.

```bash
~$ npm i @cuby/vue-address
```

## Configuration

```scripts
// resources\js\app.js

import { VueDistrict, VueAddress } from '@cuby/vue-address';
Vue.component("vue-district", VueDistrict);
Vue.component("vue-address", VueAddress);
```

```html
// resources\views\XXXX.blade.php

<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div id="app">
            <vue-address name="addr" class="no-gutters"></vue-address>
        </div>
    </body>
</html>
```

## Basic Usage

name屬性為必設屬性。POST可用name設定的值取得結果。前端可透過id來取得地址字串。

預設

- countryCode: 'zh-hk'  // 香港
- lang: 'zh'            // 中文
- styles: 'block'       // block
- size: 'normal'        // 普通

```html
<address name="addr"></address>
```

## Props

### lang

介面文字語系

values: zh(default) | en

```html
<address name="addr" lang="en"></address>
```

### size

輸入框及文字大小

values: sm | lg | (不設定時為正常尺寸)

```html
<address name="addr" size="lg"></address>
```

### styles

輸入框擺放樣式

values: heading | underline | block(default)

heading: 輸入框名稱位於輸入框的左邊

underline: 輸入框名稱位於輸入框的下方

block: 輸入框名稱位於輸入框的提示語中

```html
<address name="addr" styles="block"></address>
```

## Keywords

HongKong Address, Taiwan Address
