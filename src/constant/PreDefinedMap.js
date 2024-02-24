import DefaultMap from "@/utils/DefaultMap.js";

/* ============================ code massage map ============================ */
const codeMassageMap = new DefaultMap();
{
   const g = (c, m) => {
      return {c: c, m: m}
   }
   const data = [
      g(400, '错误请求'),
      g(401, '未授权，请重新登录'),
      g(403, '拒绝访问'),
      g(404, '请求错误,未找到该资源'),
      g(405, '请求方法未允许'),
      g(408, '请求超时'),
      g(500, '服务器端出错'),
      g(501, '网络未实现'),
      g(502, '网络错误'),
      g(503, '服务不可用'),
      g(504, '网络超时'),
      g(505, 'http版本不支持该请求'),
   ];

   data.forEach(item => {
      codeMassageMap.set(item.c, item.m);
   })
}

export {
   codeMassageMap
}
/* ============================ code massage map ============================ */
