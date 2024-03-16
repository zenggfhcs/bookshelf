/* ============================ post type ============================ */
const SELECT = 'select';
const UPDATE = 'update';
const DELETE = 'delete';
const CREATE = 'create';
/**
 * 操作类型
 * @type {{DELETE: string, CREATE: string, UPDATE: string, SELECT: string}}
 */
export const PostType = {
	SELECT, UPDATE, DELETE, CREATE,
};
/* ============================ post type ============================ */


/* ============================ parameter type ============================ */
const NUMBER = 'number';
const STRING = 'string';
const BOOLEAN = 'boolean';
const FUNCTION = 'function';
const OBJECT = 'object';

export const ParameterType = {
	NUMBER, STRING, BOOLEAN, FUNCTION, OBJECT,
};
/* ============================ parameter type ============================ */

/* ============================ resource type ============================ */
const Book = 'books';
const BookInfo = 'bookInfos';
const Debit = 'debits';
const Log = 'logs';
const Publisher = 'publishers';
const User = 'users';

/**
 * 资源类型
 *
 * @type {{Debit: string, User: string, LogIcon: string, Book: string, BookInfo: string, Publisher: string}}
 */
export const ResourceType = {
	Book,
	BookInfo,
	Debit,
	Log,
	Publisher,
	User,
};
/* ============================ 声明 ============================ */
