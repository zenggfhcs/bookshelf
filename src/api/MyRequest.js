import {PRE_DEFINED_AXIOS} from "@/api/AxiosGenerator.js";

const MyRequest = {
   post: (url, payload) => {
      return PRE_DEFINED_AXIOS.post(url, payload);
   }
}

export {
   MyRequest
}