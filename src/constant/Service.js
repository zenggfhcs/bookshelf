import {BaseService} from "@/service/BaseService.js";
import {ResourceType} from "@/constant/type.js";

const Book = new BaseService(ResourceType.Book);

const BookInfo = new BaseService(ResourceType.BookInfo);

const Debit = new BaseService(ResourceType.Debit);

const Log = new BaseService(ResourceType.Log);

const Publisher = new BaseService(ResourceType.Publisher);

const User = new BaseService(ResourceType.User);
export const Service = {
   Book,
   BookInfo,
   Debit,
   Log,
   Publisher,
   User,
}
