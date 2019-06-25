export const StrUtil = {
	under2camel(str: string): string {
		const arr = str.split(/[_-]/);
		let newStr = "";
		for (var i = 1; i < arr.length; i++) {
			newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
		}
		return arr[0] + newStr;
	}
};