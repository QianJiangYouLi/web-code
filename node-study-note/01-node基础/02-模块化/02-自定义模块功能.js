function setString(str) {
	let str1 = str[0].toUpperCase()
	let str2 = str.slice(1).toLowerCase()
	return str1 + str2
}

module.exports = {
	setString
}