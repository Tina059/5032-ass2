import{o as f,c,r as d,a as u,T as B,w as k,b as a,d as m,e as b,f as y,v as S,F as E,g as D,t as v,h as O,_ as H,i as w,j as G,k as F,l as K,m as C,n as p,u as N,p as T,q as j,s as q}from"./index-CBcOCb_J.js";function L(e){return e===0?!1:Array.isArray(e)&&e.length===0?!0:!e}function R(e){return(...t)=>!e(...t)}function U(e,t){return e===void 0&&(e="undefined"),e===null&&(e="null"),e===!1&&(e="false"),e.toString().toLowerCase().indexOf(t.trim())!==-1}function P(e,t,i,l){return t?e.filter(o=>U(l(o,i),t)).sort((o,r)=>l(o,i).length-l(r,i).length):e}function z(e){return e.filter(t=>!t.$isLabel)}function $(e,t){return i=>i.reduce((l,o)=>o[e]&&o[e].length?(l.push({$groupLabel:o[t],$isLabel:!0}),l.concat(o[e])):l,[])}function I(e,t,i,l,o){return r=>r.map(s=>{if(!s[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];const h=P(s[i],e,t,o);return h.length?{[l]:s[l],[i]:h}:[]})}const A=(...e)=>t=>e.reduce((i,l)=>l(i),t);var J={data(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default(e,t){return L(e)?"":t?e[t]:e}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1},preventAutofocus:{type:Boolean,default:!1}},mounted(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue(){return this.modelValue||this.modelValue===0?Array.isArray(this.modelValue)?this.modelValue:[this.modelValue]:[]},filteredOptions(){const e=this.search||"",t=e.toLowerCase().trim();let i=this.options.concat();return this.internalSearch?i=this.groupValues?this.filterAndFlat(i,t,this.label):P(i,t,this.label,this.customLabel):i=this.groupValues?$(this.groupValues,this.groupLabel)(i):i,i=this.hideSelected?i.filter(R(this.isSelected)):i,this.taggable&&t.length&&!this.isExistingOption(t)&&(this.tagPosition==="bottom"?i.push({isTag:!0,label:e}):i.unshift({isTag:!0,label:e})),i.slice(0,this.optionsLimit)},valueKeys(){return this.trackBy?this.internalValue.map(e=>e[this.trackBy]):this.internalValue},optionKeys(){return(this.groupValues?this.flatAndStrip(this.options):this.options).map(t=>this.customLabel(t,this.label).toString().toLowerCase())},currentOptionLabel(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:{handler(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("update:modelValue",this.multiple?[]:null))},deep:!0},search(){this.$emit("search-change",this.search)}},emits:["open","search-change","close","select","update:modelValue","remove","tag"],methods:{getValue(){return this.multiple?this.internalValue:this.internalValue.length===0?null:this.internalValue[0]},filterAndFlat(e,t,i){return A(I(t,i,this.groupValues,this.groupLabel,this.customLabel),$(this.groupValues,this.groupLabel))(e)},flatAndStrip(e){return A($(this.groupValues,this.groupLabel),z)(e)},updateSearch(e){this.search=e},isExistingOption(e){return this.options?this.optionKeys.indexOf(e)>-1:!1},isSelected(e){const t=this.trackBy?e[this.trackBy]:e;return this.valueKeys.indexOf(t)>-1},isOptionDisabled(e){return!!e.$isDisabled},getOptionLabel(e){if(L(e))return"";if(e.isTag)return e.label;if(e.$isLabel)return e.$groupLabel;const t=this.customLabel(e,this.label);return L(t)?"":t},select(e,t){if(e.$isLabel&&this.groupSelect){this.selectGroup(e);return}if(!(this.blockKeys.indexOf(t)!==-1||this.disabled||e.$isDisabled||e.$isLabel)&&!(this.max&&this.multiple&&this.internalValue.length===this.max)&&!(t==="Tab"&&!this.pointerDirty)){if(e.isTag)this.$emit("tag",e.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(e)){t!=="Tab"&&this.removeElement(e);return}this.multiple?this.$emit("update:modelValue",this.internalValue.concat([e])):this.$emit("update:modelValue",e),this.$emit("select",e,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup(e){const t=this.options.find(i=>i[this.groupLabel]===e.$groupLabel);if(t){if(this.wholeGroupSelected(t)){this.$emit("remove",t[this.groupValues],this.id);const i=this.trackBy?t[this.groupValues].map(o=>o[this.trackBy]):t[this.groupValues],l=this.internalValue.filter(o=>i.indexOf(this.trackBy?o[this.trackBy]:o)===-1);this.$emit("update:modelValue",l)}else{let i=t[this.groupValues].filter(l=>!(this.isOptionDisabled(l)||this.isSelected(l)));this.max&&i.splice(this.max-this.internalValue.length),this.$emit("select",i,this.id),this.$emit("update:modelValue",this.internalValue.concat(i))}this.closeOnSelect&&this.deactivate()}},wholeGroupSelected(e){return e[this.groupValues].every(t=>this.isSelected(t)||this.isOptionDisabled(t))},wholeGroupDisabled(e){return e[this.groupValues].every(this.isOptionDisabled)},removeElement(e,t=!0){if(this.disabled||e.$isDisabled)return;if(!this.allowEmpty&&this.internalValue.length<=1){this.deactivate();return}const i=typeof e=="object"?this.valueKeys.indexOf(e[this.trackBy]):this.valueKeys.indexOf(e);if(this.multiple){const l=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("update:modelValue",l)}else this.$emit("update:modelValue",null);this.$emit("remove",e,this.id),this.closeOnSelect&&t&&this.deactivate()},removeLastElement(){this.blockKeys.indexOf("Delete")===-1&&this.search.length===0&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate(){this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&this.pointer===0&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.preventAutofocus||this.$nextTick(()=>this.$refs.search&&this.$refs.search.focus())):this.preventAutofocus||typeof this.$el<"u"&&this.$el.focus(),this.$emit("open",this.id))},deactivate(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search!==null&&typeof this.$refs.search<"u"&&this.$refs.search.blur():typeof this.$el<"u"&&this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle(){this.isOpen?this.deactivate():this.activate()},adjustPosition(){if(typeof window>"u")return;const e=this.$el.getBoundingClientRect().top,t=window.innerHeight-this.$el.getBoundingClientRect().bottom;t>this.maxHeight||t>e||this.openDirection==="below"||this.openDirection==="bottom"?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(t-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(e-40,this.maxHeight))}}},Q={data(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition(){return this.pointer*this.optionHeight},visibleElements(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions(){this.pointerAdjust()},isOpen(){this.pointerDirty=!1},pointer(){this.$refs.search&&this.$refs.search.setAttribute("aria-activedescendant",this.id+"-"+this.pointer.toString())}},methods:{optionHighlight(e,t){return{"multiselect__option--highlight":e===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(t)}},groupHighlight(e,t){if(!this.groupSelect)return["multiselect__option--disabled",{"multiselect__option--group":t.$isLabel}];const i=this.options.find(l=>l[this.groupLabel]===t.$groupLabel);return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":e===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement({key:e}="Enter"){this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet(e){this.pointer=e,this.pointerDirty=!0}}},M={name:"vue-multiselect",mixins:[J,Q],compatConfig:{MODE:3,ATTR_ENUMERATED_COERCION:!1},props:{name:{type:String,default:""},modelValue:{type:null,default(){return[]}},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:e=>`and ${e} more`},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},spellcheck:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0},required:{type:Boolean,default:!1}},computed:{hasOptionGroup(){return this.groupValues&&this.groupLabel&&this.groupSelect},isSingleLabelVisible(){return(this.singleValue||this.singleValue===0)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible(){return!this.internalValue.length&&(!this.searchable||!this.isOpen)},visibleValues(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue(){return this.internalValue[0]},deselectLabelText(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText(){return this.showLabels?this.selectLabel:""},selectGroupLabelText(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText(){return this.showLabels?this.selectedLabel:""},inputStyle(){return this.searchable||this.multiple&&this.modelValue&&this.modelValue.length?this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}:""},contentStyle(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove(){return this.openDirection==="above"||this.openDirection==="top"?!0:this.openDirection==="below"||this.openDirection==="bottom"?!1:this.preferredOpenDirection==="above"},showSearchInput(){return this.searchable&&(this.hasSingleSelectedSlot&&(this.visibleSingleValue||this.visibleSingleValue===0)?this.isOpen:!0)}}};const W={ref:"tags",class:"multiselect__tags"},X={class:"multiselect__tags-wrap"},Y={class:"multiselect__spinner"},Z={key:0},x={class:"multiselect__option"},_={class:"multiselect__option"},ee=O("No elements found. Consider changing the search query."),te={class:"multiselect__option"},ie=O("List is empty.");function se(e,t,i,l,o,r){return f(),c("div",{tabindex:e.searchable?-1:i.tabindex,class:[{"multiselect--active":e.isOpen,"multiselect--disabled":i.disabled,"multiselect--above":r.isAbove,"multiselect--has-options-group":r.hasOptionGroup},"multiselect"],onFocus:t[14]||(t[14]=s=>e.activate()),onBlur:t[15]||(t[15]=s=>e.searchable?!1:e.deactivate()),onKeydown:[t[16]||(t[16]=m(a(s=>e.pointerForward(),["self","prevent"]),["down"])),t[17]||(t[17]=m(a(s=>e.pointerBackward(),["self","prevent"]),["up"]))],onKeypress:t[18]||(t[18]=m(a(s=>e.addPointerElement(s),["stop","self"]),["enter","tab"])),onKeyup:t[19]||(t[19]=m(s=>e.deactivate(),["esc"])),role:"combobox","aria-owns":"listbox-"+e.id},[d(e.$slots,"caret",{toggle:e.toggle},()=>[u("div",{onMousedown:t[1]||(t[1]=a(s=>e.toggle(),["prevent","stop"])),class:"multiselect__select"},null,32)]),d(e.$slots,"clear",{search:e.search}),u("div",W,[d(e.$slots,"selection",{search:e.search,remove:e.removeElement,values:r.visibleValues,isOpen:e.isOpen},()=>[y(u("div",X,[(f(!0),c(E,null,D(r.visibleValues,(s,h)=>d(e.$slots,"tag",{option:s,search:e.search,remove:e.removeElement},()=>[(f(),c("span",{class:"multiselect__tag",key:h},[u("span",{textContent:v(e.getOptionLabel(s))},null,8,["textContent"]),u("i",{tabindex:"1",onKeypress:m(a(n=>e.removeElement(s),["prevent"]),["enter"]),onMousedown:a(n=>e.removeElement(s),["prevent"]),class:"multiselect__tag-icon"},null,40,["onKeypress","onMousedown"])]))])),256))],512),[[S,r.visibleValues.length>0]]),e.internalValue&&e.internalValue.length>i.limit?d(e.$slots,"limit",{key:0},()=>[u("strong",{class:"multiselect__strong",textContent:v(i.limitText(e.internalValue.length-i.limit))},null,8,["textContent"])]):b("v-if",!0)]),u(B,{name:"multiselect__loading"},{default:k(()=>[d(e.$slots,"loading",{},()=>[y(u("div",Y,null,512),[[S,i.loading]])])]),_:3}),e.searchable?(f(),c("input",{key:0,ref:"search",name:i.name,id:e.id,type:"text",autocomplete:"off",spellcheck:i.spellcheck,placeholder:e.placeholder,required:i.required,style:r.inputStyle,value:e.search,disabled:i.disabled,tabindex:i.tabindex,onInput:t[2]||(t[2]=s=>e.updateSearch(s.target.value)),onFocus:t[3]||(t[3]=a(s=>e.activate(),["prevent"])),onBlur:t[4]||(t[4]=a(s=>e.deactivate(),["prevent"])),onKeyup:t[5]||(t[5]=m(s=>e.deactivate(),["esc"])),onKeydown:[t[6]||(t[6]=m(a(s=>e.pointerForward(),["prevent"]),["down"])),t[7]||(t[7]=m(a(s=>e.pointerBackward(),["prevent"]),["up"])),t[9]||(t[9]=m(a(s=>e.removeLastElement(),["stop"]),["delete"]))],onKeypress:t[8]||(t[8]=m(a(s=>e.addPointerElement(s),["prevent","stop","self"]),["enter"])),class:"multiselect__input","aria-controls":"listbox-"+e.id},null,44,["name","id","spellcheck","placeholder","required","value","disabled","tabindex","aria-controls"])):b("v-if",!0),r.isSingleLabelVisible?(f(),c("span",{key:1,class:"multiselect__single",onMousedown:t[10]||(t[10]=a((...s)=>e.toggle&&e.toggle(...s),["prevent"]))},[d(e.$slots,"singleLabel",{option:r.singleValue},()=>[O(v(e.currentOptionLabel),1)])],32)):b("v-if",!0),r.isPlaceholderVisible?(f(),c("span",{key:2,class:"multiselect__placeholder",onMousedown:t[11]||(t[11]=a((...s)=>e.toggle&&e.toggle(...s),["prevent"]))},[d(e.$slots,"placeholder",{},()=>[O(v(e.placeholder),1)])],32)):b("v-if",!0)],512),u(B,{name:"multiselect"},{default:k(()=>[y(u("div",{class:"multiselect__content-wrapper",onFocus:t[12]||(t[12]=(...s)=>e.activate&&e.activate(...s)),tabindex:"-1",onMousedown:t[13]||(t[13]=a(()=>{},["prevent"])),style:{maxHeight:e.optimizedHeight+"px"},ref:"list"},[u("ul",{class:"multiselect__content",style:r.contentStyle,role:"listbox",id:"listbox-"+e.id,"aria-multiselectable":e.multiple},[d(e.$slots,"beforeList"),e.multiple&&e.max===e.internalValue.length?(f(),c("li",Z,[u("span",x,[d(e.$slots,"maxElements",{},()=>[O("Maximum of "+v(e.max)+" options selected. First remove a selected option to select another.",1)])])])):b("v-if",!0),!e.max||e.internalValue.length<e.max?(f(!0),c(E,{key:1},D(e.filteredOptions,(s,h)=>(f(),c("li",{class:"multiselect__element",key:h,"aria-selected":e.isSelected(s),id:e.id+"-"+h,role:s&&(s.$isLabel||s.$isDisabled)?null:"option"},[s&&(s.$isLabel||s.$isDisabled)?b("v-if",!0):(f(),c("span",{key:0,class:[e.optionHighlight(h,s),"multiselect__option"],onClick:a(n=>e.select(s),["stop"]),onMouseenter:a(n=>e.pointerSet(h),["self"]),"data-select":s&&s.isTag?e.tagPlaceholder:r.selectLabelText,"data-selected":r.selectedLabelText,"data-deselect":r.deselectLabelText},[d(e.$slots,"option",{option:s,search:e.search,index:h},()=>[u("span",null,v(e.getOptionLabel(s)),1)])],42,["onClick","onMouseenter","data-select","data-selected","data-deselect"])),s&&(s.$isLabel||s.$isDisabled)?(f(),c("span",{key:1,"data-select":e.groupSelect&&r.selectGroupLabelText,"data-deselect":e.groupSelect&&r.deselectGroupLabelText,class:[e.groupHighlight(h,s),"multiselect__option"],onMouseenter:a(n=>e.groupSelect&&e.pointerSet(h),["self"]),onMousedown:a(n=>e.selectGroup(s),["prevent"])},[d(e.$slots,"option",{option:s,search:e.search,index:h},()=>[u("span",null,v(e.getOptionLabel(s)),1)])],42,["data-select","data-deselect","onMouseenter","onMousedown"])):b("v-if",!0)],8,["aria-selected","id","role"]))),128)):b("v-if",!0),y(u("li",null,[u("span",_,[d(e.$slots,"noResult",{search:e.search},()=>[ee])])],512),[[S,i.showNoResults&&e.filteredOptions.length===0&&e.search&&!i.loading]]),y(u("li",null,[u("span",te,[d(e.$slots,"noOptions",{},()=>[ie])])],512),[[S,i.showNoOptions&&(e.options.length===0||r.hasOptionGroup===!0&&e.filteredOptions.length===0)&&!e.search&&!i.loading]]),d(e.$slots,"afterList")],12,["id","aria-multiselectable"])],36),[[S,e.isOpen]])]),_:3})],42,["tabindex","aria-owns"])}M.render=se;const le={class:"email-container"},ne={__name:"AdminEmailPage",setup(e){const t=w({subject:"",text:""}),i=w([]),l=w(""),o=w([]);G(async()=>{(await F(K(j,"users"))).forEach(n=>{o.value.push({...n.data(),id:n.id})})});const r="https://5032-ass2.pages.dev",s=async()=>{var g;if(i.value.length===0){l.value="Please select at least one user.";return}const n={to:i.value.map(V=>V.email),subject:t.value.subject,text:t.value.text};try{const V=await q.get(`${r}/send-email`,n);l.value="Email sent successfully!"}catch(V){l.value=`Error: ${((g=V.response)==null?void 0:g.data)||V.message}`}};return(h,n)=>(f(),C("div",le,[n[7]||(n[7]=p("h1",null,"Send Bulk Email to Users",-1)),p("form",{onSubmit:a(s,["prevent"])},[p("div",null,[n[3]||(n[3]=p("label",{for:"recipient"},"Select Users:",-1)),u(N(M),{modelValue:i.value,"onUpdate:modelValue":n[0]||(n[0]=g=>i.value=g),options:o.value,multiple:!0,label:"username","track-by":"email",placeholder:"Select users..."},null,8,["modelValue","options"])]),p("div",null,[n[4]||(n[4]=p("label",{for:"subject"},"Subject:",-1)),y(p("input",{"onUpdate:modelValue":n[1]||(n[1]=g=>t.value.subject=g),type:"text",required:""},null,512),[[T,t.value.subject]])]),p("div",null,[n[5]||(n[5]=p("label",{for:"message"},"Message:",-1)),y(p("textarea",{"onUpdate:modelValue":n[2]||(n[2]=g=>t.value.text=g),required:""},null,512),[[T,t.value.text]])]),n[6]||(n[6]=p("button",{type:"submit"},"Send Email",-1))],32),p("p",null,v(l.value),1)]))}},ae=H(ne,[["__scopeId","data-v-bc05bc46"]]);export{ae as default};
