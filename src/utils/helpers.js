// for formatting price to display it to user
//calculations will still be made in decimal
export const formatPrice = (num) => {
	const newNum = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(num / 100)
	return newNum
}

export const getUniqueValues = (data, type) => {
	//dynamic accessing property [] so can handle different categories
	let unique = data.map((item) => item[type]) //get all of that particular category and return as new array

	//if category is colors, it's an array, and we want to flatten it to single array of colors.
	if (type === 'colors') {
		unique = unique.flat()
	}
		// returns new array with first element called 'all', and spreads out unique values, which will change depending on which category was passed in, this is a dynamic way of returning the unique vals based on type
			//console.log(unique)

	return ['all', ...new Set(unique)]
}
