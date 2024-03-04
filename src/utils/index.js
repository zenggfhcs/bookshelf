function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引，范围是 [0, i]
      // 交换当前元素和随机索引处的元素
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

export {
   shuffleArray
}
