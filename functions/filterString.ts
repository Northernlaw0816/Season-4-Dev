const filterString = (arr: string[], x: string) => {
	let filter = x.toUpperCase()

	let filteredList: string[] = []

	arr.forEach((string) => {
		if (string.toUpperCase().indexOf(filter) > -1) {
			filteredList.push(string)
			console.log(`result string: ${string}`)
		}
	})

	return filteredList
}

export default filterString