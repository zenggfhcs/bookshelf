const g = (n, id, e = undefined) => {
   const de = {
      C: `/${n}/${id}/create`, U: `/${n}/${id}/update`, R: `/${n}/${id}/select`, D: `/${n}/${id}/delete`,

   }
   return e === null || e === undefined ? de : {...de, ...e};
}

const Urls = {
   LOGIN: '/login',
   REGISTER: '/register',
   USER: (id) => {
      return {...g('users', id)};
   }
}

export {
   Urls
}

// console.log(Urls.USER('list').R)