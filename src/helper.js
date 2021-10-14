const hashCode = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
};

const intToRGB = (i) => {
	const c = (i & 0x00FFFFFF)
		.toString(16)
		.toUpperCase();
	return `#${'00000'.substring(0, 6 - c.length) + c}`;
};

const findCommonElement = (array1, array2) => {
	for (let i = 0; i < array1.length; i++) {
		for (let j = 0; j < array2.length; j++) {
			if (array1[i] === array2[j]) {
				return true;
			}
		}
	}
	return false;
};

const getInitials = (name) => {
	const nameArray = name.split(' ');
	const initialArray = nameArray.map((name) => name.slice(0, 1).toUpperCase());
	return initialArray.join(' ');
};

const randomNameGenerator = (gender) => {
	try {
		const response = fetch(`https://www.randomlists.com/data/names-${gender}.json`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const list = response.json();
		const firstName = list[Math.floor(Math.random() * list.length)];
		const lastName = list[Math.floor(Math.random() * list.length)];
		return `${firstName} ${lastName}`;
	} catch (error) {
		console.error('Unable to fetch data:', error);
	}
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export {
  shuffleArray,
	getInitials,
	hashCode,
	intToRGB,
	findCommonElement,
	randomNameGenerator,
};
