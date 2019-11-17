// components/nav-scroll/index.js
Component({
  properties: {
    propData:Object,
    propType:Number
  },
  data: {
    
  },
  methods: {
    goto(e){
      this.triggerEvent('navClick', e.target.id)
    }
  }
})
