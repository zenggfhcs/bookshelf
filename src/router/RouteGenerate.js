export function getRouterList() {
	// 第一个注意这个文件路径，这里很重要，不然你获取不到
	const fileObject = import.meta.glob('@/views/**/*.vue')
	let fileList = []
	for (let fileListItem in fileObject) {
		let name = fileListItem.replace(/..\/views\//, '').replace(/\/.*.vue/, '').toLocaleLowerCase()
		// 这里面不能够采用别名，推测是不能解析到
		// let routerUrl = fileListItem.replace(/../, '@')
		//为什么要这样子写fileObject[fileListItem],这里的话vite会自动帮你引入这个组件，你不使用vite提供的方法去引入，不好意思，我真没找到其他方法。
		let routerUrl = fileObject[fileListItem]
		let listItem = {name, routerUrl}
		fileList.push(listItem)
	}
	return fileList
}

