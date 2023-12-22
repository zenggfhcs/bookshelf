<script setup>
import {debounceRef} from "@/static/js/utils/debounceRef.js";
import {nextTick} from "vue";

nextTick(() => {});

let pwd = debounceRef("");
const that = this;
const e = {
   hidden: that.$refs.hidden,
   display: that.$refs.display,
   pwd: that.$refs.pwdInput,
   pwdBox: that.$refs.pwdBox
}

function display() {
   e.hidden.classList.remove('off');
   e.display.classList.add('off');
   e.pwdInput.type = 'text';
}

function hidden() {
   e.display.classList.remove('off');
   e.hidden.classList.add('off');
   e.pwdInput.type = 'password';
}

function init() {
  e.pwdInput.addEventListener('focus', () => {
     e.pwdBox.classList.add('.input-focus');
   })
   e.pwdInput.addEventListener('blur', () => {
      e.pwdBox.classList.remove('.input-focus');
   })
}
</script>

<template>
   <div class="pwd-box" ref="pwdBox">
      <input ref="pwdInput" type="password" value="abc" v-model="pwd" id="pwd" />
      <div class="svg-box">
         <svg ref="hidden" class="off" @click="hidden" width="1em" height="1em" viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="m1.75 8s2-4.25 6.25-4.25 6.25 4.25 6.25 4.25-2 4.25-6.25 4.25-6.25-4.25-6.25-4.25z"/>
            <circle cx="8" cy="8" r="1.25" fill="#000000"/>
         </svg>
         <svg ref="display" class="" @click="display" fill="#000000" width="1em" height="1em" viewBox="-2 -2 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin">
            <path
               d='M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414L11.885 9.33a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6 .914.003 1.827.094 2.709.262z'/>
         </svg>
      </div>
   </div>
</template>

<style scoped>
.off {
   opacity: 0;
   pointer-events: none;
}

* {
   --border-color: white;
   --bg-color: grey;
   --color: black;
}

.svg-box {
   width: calc(1rem + .6em);
   height: calc(1.2rem + .3em * 2);
   line-height: calc(1.2rem + .3em * 2);
   padding: .3em 0;
   position: relative;
   opacity: 1;
   text-align: center;
}

.svg-box svg {
   position: absolute;
   left: 0;
   cursor: pointer;
}

.pwd-box {
   width: 10em;
   border-radius: .3em;
   margin: .1em;
   border: 2px solid var(--border-color);
   color: var(--color);
   background-color: var(--bg-color);
   display: flex;
   align-items: center;
}

.input-focus {
   --border-color: grey;
   --bg-color: white;
   --color: black;
}

input {
   width: 1em;
   font-size: 1.2rem;
   line-height: 1.2rem;
   background: none;
   outline: none;
   border: 0;
   padding: .3em;
   flex: 1;
}
</style>