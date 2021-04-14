<template>
    <div class="row dist">
        <div class="col-12" v-if="p_msg!=''">
          <div class="alert alert-danger" role="alert">{{p_msg}}</div>
        </div>
        <div class="col-6" v-if="lang!='en'">
            <select class="city" :class="getClasses" @change="change(selected_city_id)" v-model="selected_city_id">
                <option v-for="(item,selected_city_id) in options" :key="selected_city_id" :value="selected_city_id">{{show(p_lang, item)}}</option>
            </select>
            <label v-if="styles=='underline'">縣市</label>
        </div>
        <div class="col-6">
            <select class="dist" :class="getClasses" v-model="selected_dist_id">
                <option v-for="(sub_item,selected_dist_id) in districts" :key="selected_dist_id" :value="selected_dist_id">{{show(p_lang, sub_item)}}</option>
            </select>
            <label v-if="styles=='underline'">區</label>
            <input type="hidden" :id="returnId" :name="returnId" :value="result" />
        </div>
        <div class="col-6" v-if="lang=='en'">
            <select class="city" :class="getClasses" @change="change(selected_city_id)" v-model="selected_city_id">
                <option v-for="(item,selected_city_id) in options" :key="selected_city_id" :value="selected_city_id">{{show(p_lang, item)}}</option>
            </select>
          <label v-if="styles=='underline'">縣市</label>
        </div>
    </div>
</template>

<script>
import hkJson from '../assets/hk.json'
import twJson from '../assets/tw.json'
export default {
  name: 'vue-district',
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
    styles: {
      type: String
    },
    size: {
      type: String
    },
    json: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      p_country_code: 'zh-hk',
      p_lang: 'zh',
      p_msg: '',
      selected_city_id: 0,
      selected_dist_id: 0,
      options: [],
      districts: []
    }
  },
  created () {
    this.p_country_code = this.country_code || this.p_country_code
    this.p_lang = this.lang || this.p_lang
    switch (this.p_country_code) {
      case 'zh-tw':
        this.options = twJson
        break
      case 'zh-hk':
        this.options = hkJson
        break
    }
    this.districts = this.options[0].districts

    if (this.value) {
      // check input value
      let _arr = this.value.split(',')
      if (_arr.length!=2) this.p_msg = 'incorrect format! make sure input format is "city,district"'
      // check is string a city name
      let _k = this.isEn(_arr[0]) ? 'en' : 'zh'
      this.selected_city_id = this.options.map(function(o){ return o[_k] }).indexOf(_arr[0]);
      if(this.selected_city_id === -1){
        this.selected_city_id = this.selected_dist_id = 0
        this.p_msg = 'invalid city name ['+_arr[0]+'],'+_arr[1]
      } else {
        this.districts = this.options[this.selected_city_id].districts
        this.selected_dist_id = this.districts.map(function(o){ return o[_k] }).indexOf(_arr[1]);
        if(this.selected_dist_id === -1){
          this.selected_dist_id = 0
          this.p_msg = 'invalid district name '+_arr[0]+',['+_arr[1]+']'
        }
      }
    }
  },
  methods: {
    isEn (v) {
      let regex = /^[\w. ]*$/i
      let matches = regex.exec(v)
      if (matches === null) return false
      return (matches[0] === matches['input'])
    },
    show (_lang, item) {
      if(Object.prototype.hasOwnProperty.call(item,_lang)) return item[_lang]
      else return item['zh']
    },
    change () {
      this.selected_dist_id = 0
      this.districts = this.options[this.selected_city_id].districts
    }
  },
  computed: {
    result () {
      let str = ''
      if (this.json) {
        str = JSON.stringify({
          zh: {
            'city': this.show('zh', this.options[this.selected_city_id]),
            'dist': this.show('zh', this.districts[this.selected_dist_id])
          },
          en: {
            'city': this.show('en', this.options[this.selected_city_id]),
            'dist': this.show('en', this.districts[this.selected_dist_id])
          }
        })
      } else {
        let a = [this.show('zh', this.options[this.selected_city_id]), this.show('zh', this.districts[this.selected_dist_id])]
        let sep = ''
        if (this.p_lang === 'en') {
          sep = ','
          a = a.reverse()
        }
        str = a.join(sep)
      }

      this.$emit('return', str)

      return str
    },
    getClasses () {
      let a = ['form-control']
      if (this.size === 'lg') a.push('form-control-lg')
      if (this.size === 'sm') a.push('form-control-sm')
      return a.join(' ')
    },
    returnId () {
      return this.name + '_dist'
    },

  }
}
</script>

<style>
.dist select.form-control{
  color:#424a51c2;
}
</style>
