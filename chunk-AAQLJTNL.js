import{a as G}from"./chunk-QVK2J54K.js";import"./chunk-PZ4MZPGG.js";import{a as U}from"./chunk-TEQWPPR7.js";import{a as M,c as a,d as P,e as V,h as B,i as R,k as x,m as I,n as O}from"./chunk-3UAONKD5.js";import{a as k,b as A}from"./chunk-DFN6WZGK.js";import{g as f,k as D}from"./chunk-J3VABQEQ.js";import{Ea as N,Fa as m,K as b,La as n,Ma as i,Na as d,Qa as w,R as g,T as u,Ta as c,Xa as F,Ya as _,ab as T,ba as v,bb as h,ca as y,ka as E,la as S,ua as s,za as C}from"./chunk-6TCVSYX7.js";import"./chunk-7CGTOI24.js";var q=(()=>{let t=class t{constructor(){this.type=S.required(),this.placeholder=S(),this.changed=E(),this.value=C(void 0),this.disabled=C(void 0),this.propagateChange=()=>{},this.propagateTouched=()=>{}}registerOnChange(e){this.propagateChange=e}registerOnTouched(e){this.propagateTouched=e}setDisabledState(e){this.disabled.set(e)}writeValue(e){this.value.set(e)}onKeyup(e){this.value.set(e),this.propagateChange(e),this.changed.emit(e)}onBlur(){this.propagateTouched()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=u({type:t,selectors:[["app-input"]],inputs:{type:[1,"type"],placeholder:[1,"placeholder"]},outputs:{changed:"changed"},standalone:!0,features:[T([{provide:M,useExisting:b(()=>t),multi:!0}]),h],decls:2,vars:4,consts:[["input",""],[1,"form__input",3,"keyup","blur","type","value","placeholder"]],template:function(o,r){if(o&1){let l=w();n(0,"input",1,0),c("keyup",function(){v(l);let z=F(1);return y(r.onKeyup(z.value))})("blur",function(){return v(l),y(r.onBlur())}),i()}if(o&2){let l;m("type",r.type())("value",r.value())("placeholder",(l=r.placeholder())!==null&&l!==void 0?l:""),N("disabled",r.disabled()||null)}},styles:[".ng-invalid.ng-touched[_nghost-%COMP%]   .form__input[_ngcontent-%COMP%]{border-color:var(--strawberry-red)}.form__input[_ngcontent-%COMP%]{padding:.5rem 1rem;border-color:var(--light-gray);border-style:solid;border-width:1px;border-radius:5px;font-size:.95rem;width:100%}.form__input[_ngcontent-%COMP%]:hover{border-color:var(--purplish-blue);cursor:pointer}"],changeDetection:0});let p=t;return p})();var K={phone:/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/},L={phone:"Invalid phone number, expected this format: +1 234 567 8900"};var de=(()=>{let t=class t{constructor(){this.signUpService=g(D),this.formBuilder=g(I);let{personalInfo:e}=this.signUpService.signUpState();this.form=this.formBuilder.group({name:this.formBuilder.control(f(e?.name),{validators:[a.required,a.minLength(2),a.maxLength(255)]}),email:this.formBuilder.control(f(e?.email),{validators:[a.required,a.email]}),phone:this.formBuilder.control(f(e?.phone),{validators:[a.required,a.pattern(K.phone)]})})}onSubmit(){if(this.form.invalid){this.form.markAllAsTouched();return}let e=this.form.getRawValue();this.signUpService.progressToNextStep({personalInfo:e})}get phonePatternError(){return L.phone}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=u({type:t,selectors:[["app-step1"]],standalone:!0,features:[h],decls:13,vars:5,consts:[[1,"main-section__header"],[1,"main-section"],["appForm","",3,"ngSubmit","formGroup"],["label","Name",3,"control"],["type","text","formControlName","name","placeholder","e.g. Stephen King"],["label","Email Address",3,"control"],["type","email","formControlName","email","placeholder","e.g. stephenking@lorem.com"],["label","Phone Number",3,"control","patternError"],["type","tel","formControlName","phone","placeholder","e.g. +1 234 567 890"]],template:function(o,r){o&1&&(n(0,"header",0)(1,"app-main-header"),_(2,"Personal info"),i()(),n(3,"section",1)(4,"app-main-instructions"),_(5," Please provide your name, email address, and phone number. "),i(),n(6,"form",2),c("ngSubmit",function(){return r.onSubmit()}),n(7,"app-form-field",3),d(8,"app-input",4),i(),n(9,"app-form-field",5),d(10,"app-input",6),i(),n(11,"app-form-field",7),d(12,"app-input",8),i()()()),o&2&&(s(6),m("formGroup",r.form),s(),m("control",r.form.controls.name),s(2),m("control",r.form.controls.email),s(2),m("control",r.form.controls.phone)("patternError",r.phonePatternError))},dependencies:[U,G,q,k,A,O,B,P,V,R,x],encapsulation:2,changeDetection:0});let p=t;return p})();export{de as Step1Component};