import {customRef} from "vue"

/**
 * 带延迟更新的 ref
 * @param value 更新的值
 * @param delay 延迟时间（毫秒值）
 * @returns debounce ref
 */
export function debounceRef(value, delay = 1000) {
   let timer;
   return customRef((track, trigger) => {
      return {
         get() {
            track();
            return value;
         },
         set(val) {
            clearTimeout(timer);
            timer = setTimeout(() => {
               value = val;
               trigger();
            }, delay);
         }
      };
   });
}