import {BaseService} from "@/api/BaseService.js";
import {ResourceType} from "@/constant/Type.js";

/* ============================ predefined ============================ */
const Book = new BaseService(ResourceType.Book);

const BookInfo = new BaseService(ResourceType.BookInfo);

const Debit = new BaseService(ResourceType.Debit);

const Log = new BaseService(ResourceType.Log);

const Publisher = new BaseService(ResourceType.Publisher);

const User = new BaseService(ResourceType.User);
/* ============================ predefined ============================ */

/**
 *
 * @type {{Debit: BaseService, User: BaseService, Log: BaseService, Book: BaseService, BookInfo: BaseService, Publisher: BaseService}}
 */
export const Service = {
   Book,
   BookInfo,
   Debit,
   Log,
   Publisher,
   User,
}
