<template>
    <div class="row dist">
        <div class="col-12" v-if="p_msg!=''">
          <div class="alert alert-danger" role="alert">{{p_msg}}</div>
        </div>
        <div class="col-6" v-if="lang!='en'">
            <select class="city" :class="getClasses" @change="change(index)" v-model="selected_city_id">
                <option v-for="(item,index) in options" :key="index" :value="index">{{show(p_lang, item)}}</option>
            </select>
            <label v-if="styles=='underline'">縣市</label>
        </div>
        <div class="col-6">
            <select class="dist" :class="getClasses" v-model="selected_dist_id">
                <option v-for="(sub_item,sub_index) in districts" :key="sub_index" :value="sub_index">{{show(p_lang, sub_item)}}</option>
            </select>
            <label v-if="styles=='underline'">區</label>
            <input type="hidden" :id="returnId" :name="returnId" :value="result" />
        </div>
        <div class="col-6" v-if="lang=='en'">
            <select class="city" :class="getClasses" @change="change(index)" v-model="index">
                <option v-for="(item,index) in options" :key="index" :value="index">{{show(p_lang, item)}}</option>
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
    countryCode: {
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
      p_countryCode: 'zh-hk',
      p_lang: 'zh',
      p_msg: '',
      selected_city_id: 0,
      selected_dist_id: 0,
      index: 0,
      sub_index: 0,
      options: [],
      districts: []
    }
  },
  created () {
    this.p_countryCode = this.countryCode || this.p_countryCode
    this.p_lang = this.lang || this.p_lang
    switch (this.p_countryCode) {
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
      if(this.selected_city_id === -1) this.p_msg = 'invalid city name'
      else {
        this.districts = this.options[this.selected_city_id].districts
        this.selected_dist_id = this.districts.map(function(o){ return o[_k] }).indexOf(_arr[1]);
        if(this.selected_dist_id === -1) this.p_msg = 'invalid district name'
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
      switch (_lang) {
        case 'zh':
          return item.zh
        case 'en':
          return item.en
      }
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
            'city': this.show('zh', this.options[this.index]),
            'dist': this.show('zh', this.districts[this.sub_index])
          },
          en: {
            'city': this.show('en', this.options[this.index]),
            'dist': this.show('en', this.districts[this.sub_index])
          }
        })
      } else {
        let a = [this.show('zh', this.options[this.index]), this.show('zh', this.districts[this.sub_index])]
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
