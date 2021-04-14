# vue-address

Provide Hong-Kong and Taiwan address vue selector address select is a lightweight yet flexible plugin for Vue.js 2.0 that allows you to easily get correct address input.

It supports the following features:

- 提供香港及台灣的中英文地址輸入格式。
- 自動判斷輸入內容。若全為英文及數字，判別為英文地址，輸出英語地址格式。若有中文，輸出中文地址格式。
- 支援bootstrap validator
- 不依靠其他套件

## Installation

Package is installable via npm.

```bash
~$ npm i @cuby/vue-address
```

## Configuration

Provide address inputer and district selector

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

- country_code: 'zh-hk'  // 香港
- lang: 'zh'            // 中文
- styles: 'block'       // block
- size: 'normal'        // 普通

```html
<vue-address name="addr"></vue-address>
<vue-district name="dist"></vue-district>
```

## Props

### country_code

地址格式

values: zh-hk(default) | zh-tw

```html
<vue-address name="addr" country_code="zh-hk"></vue-address>
<vue-district name="dist" country_code="zh-hk"></vue-district>
```

### json

地址格式。當設定時以json呈現

```html
<vue-address name="addr" json></vue-address>
<vue-district name="dist" json></vue-district>
```

vue-district 的回傳

```html
<input type="hidden" id="addr_dist" name="addr_dist" value="臺北市中正區">
```

vue-district 設定 json 時的回傳

```html
<input type="hidden" id="addr_dist_json" name="addr_dist_json" value='{"zh":{"city":"臺北市","dist":"中正區"},"en":{"city":"Taipei City","dist":"Zhongzheng Dist."}}'>
```

PS. vue-district 的 json 回傳包含選擇項目的中文及英文名稱

vue-address 的回傳

```html
<!-- 輸入內容含有中文時 -->
<input type="hidden" id="addr" name="addr" value='{"city":"臺北市","dist":"中正區","street":"北平西路","lane":"","ally":"","no":"3","floor":"","room":""}'>
<input type="hidden" id="addr_text" name="addr_text" value="臺北市中正區北平西路3號">
<!-- 輸入內容為英文時 -->
<input type="hidden" id="addr" name="addr" value='{"city":"Taipei City","dist":"Zhongzheng Dist.","street":"Beiping W. Rd.","lane":"","ally":"","no":"3","floor":"","room":""}'>
<input type="hidden" id="addr_text" name="addr_text" value="No 3, Beiping W Road,Zhongzheng Dist.,Taipei City">
```

vue-address 設定 json 時的回傳(Deprecated)

同時回傳字串及json格式，取消json參數

### lang

介面文字語系

values: zh(default) | en

```html
<vue-address name="addr" lang="en"></vue-address>
<vue-district name="dist" lang="en"></vue-district>
```

### size

輸入框及文字大小

values: sm | lg | (不設定時為正常尺寸)

```html
<vue-address name="addr" size="lg"></vue-address>
<vue-district name="dist" size="lg"></vue-district>
```

### styles

輸入框擺放樣式

values: heading | underline | block(default)

heading: 輸入框名稱位於輸入框的左邊

underline: 輸入框名稱位於輸入框的下方

block: 輸入框名稱位於輸入框的提示語中

```html
<vue-address name="addr" styles="block"></vue-address>
<vue-district name="dist" styles="block"></vue-district>
```

## v-on:return

在vue中取得地址

```html
<vue-address name="addr" v-on:return="getAddr"></vue-address>
<vue-district name="dist" v-on:return="getDist"></vue-district>
```

## value

```html

設定地址

<vue-address name="address" class="no-gutters" size="lg" styles="block" country_code="zh-tw" json value='{"city":"香港","dist":"香港仔","street":"港灣道12號","building":"灣仔政府大樓","floor":"","block":"","room":""}'></vue-address>
<vue-district name="dist" value="香港,香港仔"></vue-district>
```

## Keywords

HongKong Address, Taiwan Address
