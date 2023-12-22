export class Url {
   baseIp = "localhost";
   baseUrl = `https://${this.baseIp}`;

   users = {
      select: `/users/`,
      update: `/users`,
      create: `/`
   }
}