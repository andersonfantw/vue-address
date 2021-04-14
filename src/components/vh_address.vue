<template>
    <section class="address">
        <div class="col-12" v-if="p_msg!=''">
          <div class="alert alert-danger" role="alert">{{p_msg}}</div>
        </div>
        <!-- hk format start -->
        <div class="row s1" v-if="p_country_code=='zh-hk'">
            <label class="col-3 col-md-2 col-form-label" :class="size" v-if="p_styles=='heading'">{{p_heading.zone}}</label>
            <div :class="{'col-9 col-md-10':p_styles=='heading', 'col-12':p_styles!='heading'}">
                <District :name="name" :size="size" country_code="zh-hk" :lang="lang" :styles="styles" v-on:return="getDist" :value="p_dist_value" json></District>
            </div>
        </div>
        <div class="row s1" v-if="p_country_code=='zh-hk' && p_styles=='heading'">
            <label class="col-3 col-md-2 col-form-label" :class="size">{{p_heading.street}}</label>
            <div class="col-9 col-md-10"><input :class="getClasses" :placeholder="p_heading.street" v-model="p_address.street" required /></div>
            <label class="col-3 col-md-2 col-form-label" :class="size">{{p_heading.building}}</label>
            <div class="col-3 col-md-4"><input :class="getClasses" :placeholder="p_heading.building" v-model="p_address.building" required /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.floor" v-model="p_address.floor" /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.block" v-model="p_address.block" /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.room" v-model="p_address.room" /></div>
        </div>
        <div class="row s2 under_line" v-if="p_country_code=='zh-hk' && p_styles=='underline'">
            <div class="col-12"><input :class="getClasses" v-model="p_address.street" required /><label>{{p_heading.street}}</label></div>
            <div class="col-12 col-sm-6"><input :class="getClasses" v-model="p_address.building" required /><label>{{p_heading.building}}</label></div>
            <div class="col-4 col-sm-2"><input :class="getClasses" v-model="p_address.floor" /><label>{{p_heading.floor}}</label></div>
            <div class="col-4 col-sm-2"><input :class="getClasses" v-model="p_address.block" /><label>{{p_heading.block}}</label></div>
            <div class="col-4 col-sm-2"><input :class="getClasses" v-model="p_address.room" /><label>{{p_heading.room}}</label></div>
        </div>
        <div class="row s3" v-if="p_country_code=='zh-hk' && p_styles=='block'">
            <div class="col-12"><input :class="getClasses" :placeholder="p_heading.street" v-model="p_address.street" required /></div>
            <div class="col-12 col-sm-6"><input :class="getClasses" :placeholder="p_heading.building" v-model="p_address.building" required /></div>
            <div class="col-4 col-sm-2"><input :class="getClasses" :placeholder="p_heading.floor" v-model="p_address.floor" /></div>
            <div class="col-4 col-sm-2"><input :class="getClasses" :placeholder="p_heading.block" v-model="p_address.block" /></div>
            <div class="col-4 col-sm-2"><input :class="getClasses" :placeholder="p_heading.room" v-model="p_address.room" /></div>
        </div>
        <div class="row s1" v-if="p_country_code=='zh-hk' && p_lang=='en' && false">
          <label class="col-2 col-form-label" :class="size" v-if="p_styles=='heading'">{{p_heading.zone}}</label>
          <div class="col-10">
            <District :name="name" :size="size" country_code="zh-hk" :lang="lang" :styles="styles" v-on:return="getDist" :value="p_dist_value" json></District>
          </div>
        </div>

        <!-- tw format start -->
       <div class="row s1" v-if="p_country_code=='zh-tw'">
            <label class="col-2 col-form-label" :class="size" v-if="p_styles=='heading'">{{p_heading.zone}}</label>
            <div :class="{'col-10':p_styles=='heading', 'col-12':p_styles!='heading'}">
                <District :name="name" :size="size" country_code="zh-tw" :lang="lang" :styles="styles" v-on:return="getDist" :value="p_dist_value" json></District>
            </div>
        </div>
        <div class="row s1" v-if="p_country_code=='zh-tw' && p_styles=='heading'">
            <label class="col-2 col-form-label" :class="size">{{p_heading.address}}</label>
            <div class="col-5"><input :class="getClasses" :placeholder="p_heading.street" v-model="p_address.street" required /></div>
            <div class="col-3"><input :class="getClasses" :placeholder="p_heading.lane" v-model="p_address.lane" pattern="[0-9\-]{1,4}" /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.ally" v-model="p_address.ally" pattern="[0-9\-]{1,4}" /></div>
            <label class="col-2 col-form-label" :class="size"></label>
            <div class="col-5"><input :class="getClasses" :placeholder="p_heading.no" v-model="p_address.no" required /></div>
            <div class="col-3"><input :class="getClasses" :placeholder="p_heading.floor" v-model="p_address.floor" type="number" /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.room" v-model="p_address.room" /></div>
        </div>
        <div class="row s2 under_line" v-if="p_country_code=='zh-tw' && p_styles=='underline'">
            <div class="col-8"><input :class="getClasses" v-model="p_address.street" required /><label>{{p_heading.street}}</label></div>
            <div class="col-2"><input :class="getClasses" v-model="p_address.lane" pattern="[0-9\-]{1,4}" /><label>{{p_heading.lane}}</label></div>
            <div class="col-2"><input :class="getClasses" v-model="p_address.ally" pattern="[0-9\-]{1,4}" /><label>{{p_heading.ally}}</label></div>
            <div class="col-4"><input :class="getClasses" v-model="p_address.no" required /><label>{{p_heading.no}}</label></div>
            <div class="col-4"><input :class="getClasses" v-model="p_address.floor" type="number" /><label>{{p_heading.floor}}</label></div>
            <div class="col-4"><input :class="getClasses" v-model="p_address.room" /><label>{{p_heading.room}}</label></div>
        </div>
        <div class="row s3" v-if="p_country_code=='zh-tw' && p_styles=='block'">
            <div class="col-8"><input :class="getClasses" :placeholder="p_heading.street" v-model="p_address.street" required /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.lane" v-model="p_address.lane" pattern="[0-9\-]{1,4}" /></div>
            <div class="col-2"><input :class="getClasses" :placeholder="p_heading.ally" v-model="p_address.ally" pattern="[0-9\-]{1,4}" /></div>
            <div class="col-4"><input :class="getClasses" :placeholder="p_heading.no" v-model="p_address.no" required /></div>
            <div class="col-4"><input :class="getClasses" :placeholder="p_heading.floor" v-model="p_address.floor" type="number" /></div>
            <div class="col-4"><input :class="getClasses" :placeholder="p_heading.room" v-model="p_address.room" /></div>
        </div>
        <div class="row s1" v-if="p_country_code=='zh-tw' && p_lang=='en' && false">
          <label class="col-2 col-form-label" :class="size" v-if="p_styles=='heading'">{{p_heading.zone}}</label>
          <div class="col-10">
            <District :name="name" :size="size" country_code="zh-tw" :lang="lang" :styles="styles" v-on:return="getDist" :value="p_dist_value" json></District>
          </div>
        </div>

        <input type="hidden" :id="name" :name="name" :value="result_json" />
        <input type="hidden" :id="name_text" :name="name_text" :value="result_text" />
    </section>
</template>

<script>
import headingJson from '../assets/heading.json'
import District from './vh_dist'
export default {
  name: 'vue-address',
  components: {
    District
  },
  props: {
    name: {
      type: String,
      required: true
    },
    country_code: {
      type: String
    },
    lang: {
      type: String
    },
    styles: { // heading, underline, block
      type: String
    },
    size: {
      type: String
    },
    // json: {
    //   type: Boolean
    // },
    value: {
      type: String
    }
  },
  data () {
    return {
      p_country_code: 'zh-hk',
      p_lang: 'zh',
      p_styles: 'block',
      p_address: {},
      p_dist_json: '',
      p_heading: '',
      p_msg: '',
      p_dist_value: '',
      p_addr_format: {
        'zh-hk': ['street', 'building', 'floor', 'block', 'room'],
        'zh-tw': ['street', 'lane', 'ally', 'no', 'floor', 'room']
      }
    }
  },
  created () {
    this.p_country_code = this.country_code || this.p_country_code
    this.p_lang = this.lang || this.p_lang
    this.p_styles = this.styles || this.p_styles
    this.p_heading = this.getHeading(this.p_country_code, this.p_lang)
    this.p_address = this.getAddressStruct(this.p_country_code)

    if( this.value ){
      let o = this.tryParseJSON(this.value);
      let _this = this
      if (o === false) this.p_msg = 'invalid address format. expect json give in.'
      Object.keys(this.p_address).forEach((k)=>{
        if ( Object.prototype.hasOwnProperty.call(o, k) ) this.p_address[k] = o[k]
        else _this.p_msg = 'incorrect address format, missing '+k+'.'
      })
      if ( Object.prototype.hasOwnProperty.call(o, 'city') 
            && Object.prototype.hasOwnProperty.call(o, 'dist') ) this.p_dist_value = o.city + ',' + o.dist
      else this.p_msg = 'invalid address format. missing city or dist.'
    }
  },
  computed: {
    name_text () {
      return this.name + '_text'
    },
    result_json () {
      if(Object.prototype.hasOwnProperty.call(this.p_addr_format,this.p_country_code)){
        let arr = this.p_addr_format[this.p_country_code];
        return this.process(arr,'json')
      }else{
        return 'unexpect country code ' + this.p_country_code
      }
    },
    result_text () {
      if(Object.prototype.hasOwnProperty.call(this.p_addr_format,this.p_country_code)){
        let arr = this.p_addr_format[this.p_country_code];
        return this.process(arr,'text')
      }else{
        return 'unexpect country code ' + this.p_country_code
      }
    },
    getClasses () {
      let a = ['form-control']
      if (this.size === 'lg') a.push('form-control-lg')
      if (this.size === 'sm') a.push('form-control-sm')
      return a.join(' ')
    }
  },
  methods: {
    isEn (v) {
      let regex = /^[\w. ]*$/i
      let matches = regex.exec(v)
      if (matches === null) return false
      return (matches[0] === matches['input'])
    },
    getHeading (_country_code, _lang) {
      switch (_country_code) {
        case 'zh-hk':
          return (_lang === 'zh') ? headingJson.hk_zh_heading : headingJson.hk_en_heading
        case 'zh-tw':
          return (_lang === 'zh') ? headingJson.tw_zh_heading : headingJson.tw_en_heading
      }
    },
    getAddressStruct (_country_code) {
      switch (_country_code) {
        case 'zh-hk':
          return {city: '', dist: '', street: '', building: '', floor: '', block: '', room: ''}
        case 'zh-tw':
          return {city: '', dist: '', street: '', lane: '', ally: '', no: '', floor: '', room: ''}
      }
    },
    writing (_en, _heading, _val) {
      return (_en) ? _heading + ' ' + _val : _val + _heading
    },
    getDist ( _v ) {
      this.p_dist_json = _v
    },
    process (_arr,_type) {
      let _this = this
      let en = _arr.reduce(function (pv, v) {
        return pv && _this.isEn(_this.p_address[v])
      }, true)

      if (this.p_dist_json) {
        let o = JSON.parse(this.p_dist_json)
        if (en) {
          this.p_address.city = o.en.city
          this.p_address.dist = o.en.dist
        } else {
          this.p_address.city = o.zh.city
          this.p_address.dist = o.zh.dist
        }
      }
      let str = ''
      let a = [this.p_address.city, this.p_address.dist]
      let b = {'city': this.p_address.city, 'dist': this.p_address.dist}
      let _heading = this.getHeading(this.p_country_code, (en ? 'en' : 'zh'))
      for (let i = 0; i < _arr.length; i++) {
        b[_arr[i]] = this.p_address[_arr[i]]
        if (this.p_address[_arr[i]]) a.push(this.writing(en, (['street','building'].indexOf(_arr[i])>=0) ? '' : _heading[_arr[i]], this.p_address[_arr[i]]))
      }

      if (_type == 'json') {
        str = JSON.stringify(b)
      } else {
        let sep = ''
        if (en) {
          sep = ','
          a = a.reverse()
        }
        str = a.join(sep)
      }

      this.$emit('return', str)
      return str
    },
    tryParseJSON ( _json ) {
      try {
          var o = JSON.parse( _json );
          if (o && typeof o === "object") {
              return o;
          }
      }
      catch (e) {
        console.log(e)
      }
      return false;
    }
  }
}
</script>

<style>
.address .col-form-label.lg{
    font-size: 1.2rem;
}
.address label.sm{
    font-size: 0.8rem;
}
.address select,
.address input{
  width: 100%;
  border-radius: 0;
}
.address.no-gutters .row{
  margin-right: 0;
  margin-left: 0;
}
.address.no-gutters .col,
.address.no-gutters [class*=col-] {
  padding-right: 0;
  padding-left: 0;
}
.address.under_line .s1 label,
.address.under_line select,
.address.under_line input{
  border-top:none;
  border-left:none;
  border-right:none;
  border-bottom:solid 1px #ccc;
}
</style>
