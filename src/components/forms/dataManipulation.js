// data manipulation
import { convertNumberToWord } from './numberToWords'

function convertToIterable(object) {
  return Object.entries(object)
}

function convertToObject(iterable) {
  return Object.fromEntries(iterable)
}

function isDescriptionCardProperty([key, value]) {
  return key.indexOf('description-card') !== -1
}

function isNotDescriptionCardProperty([key, value]) {
  return key.indexOf('description-card') === -1
}

// function containsNumber([key, value], numberAsString) {
//   return key.indexOf(numberAsString) !== -1;
// }

function containsWord([key, value], word) {
  return key.indexOf(word) !== -1
}

function transformPropertyNames([key, value]) {
  if (
    containsWord([key, value], 'title') &&
    !containsWord([key, value], 'feature') &&
    !containsWord([key, value], 'subtitle')
  ) {
    return [(key = 'title'), value]
  } else if (
    containsWord([key, value], 'subtitle') &&
    !containsWord([key, value], 'feature')
  ) {
    return [(key = 'subtitle'), value]
  } else if (
    containsWord([key, value], 'image') &&
    !containsWord([key, value], 'feature')
  ) {
    return [(key = 'image'), value]
  } else if (
    containsWord([key, value], 'url') &&
    !containsWord([key, value], 'feature')
  ) {
    return [(key = 'url'), value]
  } else if (
    containsWord([key, value], 'description') &&
    !containsWord([key, value], 'feature')
  ) {
    return [(key = 'description'), value]
  } else if (containsWord([key, value], 'features')) {
    return [key, value]
  } else {
    return [key, value]
  }
}

function transformSecondaryPropertyNames([key, value]) {
  if (
    containsWord([key, value], 'title') &&
    containsWord([key, value], 'feature')
  ) {
    return [(key = 'title'), value]
  } else if (
    containsWord([key, value], 'description') &&
    containsWord([key, value], 'feature')
  ) {
    return [(key = 'description'), value]
  } else if (!containsWord([key, value], 'feature')) {
    return [key, value]
  } else {
    return [key, value]
  }
}

// // convert the data to an iterable
// const dataIterable = convertToIterable(data);

// // filter through the iterable and extract description card properties
// const descriptionCardPropertiesIterable = dataIterable.filter(
//   isDescriptionCardProperty
// );

// const notDescriptionCardPropertiesIterable = dataIterable.filter(
//   isNotDescriptionCardProperty
// );

// const notDescriptionCardPropertiesAsObject = convertToObject(
//   notDescriptionCardPropertiesIterable
// );

// const descriptionCardOneProperties = descriptionCardPropertiesIterable.filter(
//   ([key, value]) => {
//     return containsWord([key, value], "description-card-one");
//   }
// );

// const descriptionCardTwoProperties = descriptionCardPropertiesIterable.filter(
//   ([key, value]) => {
//     return containsWord([key, value], "description-card-two");
//   }
// );

// const descriptionCardThreeProperties = descriptionCardPropertiesIterable.filter(
//   ([key, value]) => {
//     return containsWord([key, value], "description-card-three");
//   }
// );

// const descriptionCardOnePropertiesWithCorrectPropertyNames = descriptionCardOneProperties.map(
//   ([key, value]) => {
//     return transformPropertyNames([key, value]);
//   }
// );
// const descriptionCardTwoPropertiesWithCorrectPropertyNames = descriptionCardTwoProperties.map(
//   ([key, value]) => {
//     return transformPropertyNames([key, value]);
//   }
// );
// const descriptionCardThreePropertiesWithCorrectPropertyNames = descriptionCardThreeProperties.map(
//   ([key, value]) => {
//     return transformPropertyNames([key, value]);
//   }
// );

// const descriptionCardOneAsObject = convertToObject(
//   descriptionCardOnePropertiesWithCorrectPropertyNames
// );

// const descriptionCardTwoAsObject = convertToObject(
//   descriptionCardTwoPropertiesWithCorrectPropertyNames
// );
// const descriptionCardThreeAsObject = convertToObject(
//   descriptionCardThreePropertiesWithCorrectPropertyNames
// );

// description_cards.push(
//   descriptionCardOneAsObject,
//   descriptionCardTwoAsObject,
//   descriptionCardThreeAsObject
// );

// let dataToSend = Object.assign(notDescriptionCardPropertiesAsObject, {
//   description_cards
// });

// console.log("the final data to be sent", dataToSend);
// console.log(
//   "the description cards array with the manipulated data",
//   description_cards
// );
// console.log(
//   "description card one with correct property name as object",
//   descriptionCardOneAsObject
// );
// console.log(
//   "description card one iterable after being mapped",
//   descriptionCardOnePropertiesWithCorrectPropertyNames
// );
// console.log("description card one properties", descriptionCardOneProperties);
// console.log("description card two properties", descriptionCardTwoProperties);
// console.log(
//   "description card three properties",
//   descriptionCardThreeProperties
// );
// console.log("description card properties", descriptionCardPropertiesIterable);
// console.log("this is the data output", data);
// console.log("this is the data to aim for", dataToAimFor);

// transforming a variable number of description cards
const test_data = {
  title: 'Welcome to the world',
  company: 'Amazon',
  image: 'image url',
  type: 'Virtual',
  duration: '10 days',
  location: 'Nigeria',
  url: 'https://youtube.com',

  'description-card-one-title': 'Title one',
  'description-card-one-subtitle': 'Subtitle one',
  'description-card-one-description': 'Description one ',
  'description-card-one-image': 'Image one ',
  'description-card-one-url': 'URL one ',

  'description-card-two-title': 'Title title',
  'description-card-two-subtitle': 'Subtitle two',
  'description-card-two-description': 'Description two ',
  'description-card-two-image': 'Image two ',
  'description-card-two-url': 'URL two ',

  'description-card-three-title': 'Title three',
  'description-card-three-subtitle': 'Subtitle three',
  'description-card-three-description': 'Description three ',
  'description-card-three-image': 'Image three ',
  'description-card-three-url': 'URL three ',

  'description-card-four-title': 'Title four',
  'description-card-four-subtitle': 'Subtitle four',
  'description-card-four-description': 'Description four ',
  'description-card-four-image': 'Image four ',
  'description-card-four-url': 'URL four ',

  'description-card-one-feature-one-title': 'card one feature one title',
  'description-card-one-feature-one-description':
    'card one feature one description',

  'description-card-one-feature-two-title': 'card one feature two title',
  'description-card-one-feature-two-description':
    'card one feature two description',

  'description-card-two-feature-one-title': 'card two feature one title',
  'description-card-two-feature-one-description':
    'card two feature one description',

  'description-card-two-feature-two-title': 'card two feature two title',
  'description-card-two-feature-two-description':
    'card two feature two description',

  'description-card-three-feature-one-title': 'card three feature one title',
  'description-card-three-feature-one-description':
    'card three feature one description',

  'description-card-three-feature-two-title': 'card three feature two title',
  'description-card-three-feature-two-description':
    'card three feature two description',

  'description-card-four-feature-one-title': 'card four feature one title',
  'description-card-four-feature-one-description':
    'card four feature one description',

  'description-card-four-feature-two-title': 'card four feature two title',
  'description-card-four-feature-two-description':
    'card four feature two description',
}

function createProxyArray(arrayToProxy) {
  const proxy = new Proxy(arrayToProxy, {
    get(target, prop) {
      if (!isNaN(prop)) {
        prop = parseInt(prop, 10)
        if (prop < 0) {
          prop += target.length
        }
      }
      return target[prop]
    },
  })
  return proxy
}

function calculateNumberOfGroups(iterable) {
  const unitsAsWords = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]
  let itemNumbers = []
  iterable.map(([key, value]) => {
    const arrayOfWordsInKey = key.split('-')
    const proxyArrayOfWordsInKey = createProxyArray(arrayOfWordsInKey)
    const itemNumber = proxyArrayOfWordsInKey[-2]
    if (unitsAsWords.includes(itemNumber)) {
      return itemNumbers.push(itemNumber)
    }
  })

  const uniqueItemNumbers = [...new Set(itemNumbers)]
  const numberOfUniqueItems = uniqueItemNumbers.length
  return {
    uniqueItemNumbers: uniqueItemNumbers,
    numberOfUniqueItems: numberOfUniqueItems,
  }
}

const dataAsIterable = convertToIterable(test_data)
const dataInNumbers = calculateNumberOfGroups(dataAsIterable)
const descriptionCardPropertiesIterableTwo = dataAsIterable.filter(
  isDescriptionCardProperty
)

const notDescriptionCardPropertiesIterableTwo = dataAsIterable.filter(
  isNotDescriptionCardProperty
)
const notDescriptionCardPropertiesAsObjectTwo = convertToObject(
  notDescriptionCardPropertiesIterableTwo
)

let groupedDescriptionCardProperties = []
for (let i = 1; i <= dataInNumbers.numberOfUniqueItems; i++) {
  let filterWord = ['description', 'card', convertNumberToWord(i)].join('-')
  let singleDescriptionCardProperties =
    descriptionCardPropertiesIterableTwo.filter(([key, value]) => {
      return containsWord([key, value], filterWord)
    })
  groupedDescriptionCardProperties.push(singleDescriptionCardProperties)
}

function sortArrayIntoGroups(arrayToSort, itemName) {
  let sortedArray = []
  for (
    let i = 1;
    i <= calculateNumberOfGroups(arrayToSort).numberOfUniqueItems;
    i++
  ) {
    let filterWord = [itemName, convertNumberToWord(i)].join('-')
    let singleItemProperties = arrayToSort.filter(([key, value]) => {
      return containsWord([key, value], filterWord)
    })

    sortedArray.push(singleItemProperties)
  }
  return sortedArray
}

let groupedDescriptionCardPropertiesWithFeatures =
  groupedDescriptionCardProperties.map((array) => {
    const groupedFeatureProperties = sortArrayIntoGroups(array, 'feature')
    const newArray = array.filter((array) => {
      return !containsWord(array, 'feature')
    })

    let groupedFeaturePropertiesWithCorrectNames = groupedFeatureProperties.map(
      (groupOfFeatureProperties) => {
        return groupOfFeatureProperties.map(([key, value]) => {
          return transformSecondaryPropertyNames([key, value])
        })
      }
    )

    let groupedFeaturePropertiesAsObjects =
      groupedFeaturePropertiesWithCorrectNames.map(
        (groupOfFeatureProperties) => {
          if (groupOfFeatureProperties.length) {
            return convertToObject(groupOfFeatureProperties)
          } else {
            return groupOfFeatureProperties
          }
        }
      )

    var groupedFeaturePropertiesAsObjectsCleaned =
      groupedFeaturePropertiesAsObjects.filter(
        (value) => Object.keys(value).length !== 0
      )

    newArray.push(['features', groupedFeaturePropertiesAsObjectsCleaned])
    return newArray
  })

function extractGroupedPropertiesIntoInternalArrayOfObjects(
  array,
  itemName,
  keyName
) {
  const transformedArray = array.map((internalArray) => {
    const groupedProperties = sortArrayIntoGroups(internalArray, itemName)
    const newArray = internalArray.filter((array) => {
      return !containsWord(array, itemName)
    })

    let groupedPropertiesWithCorrectNames = groupedProperties.map(
      (groupOfProperties) => {
        return groupOfProperties.map(([key, value]) => {
          return transformSecondaryPropertyNames([key, value])
        })
      }
    )

    let groupedPropertiesAsObjects = groupedPropertiesWithCorrectNames.map(
      (groupOfProperties) => {
        if (groupOfProperties.length) {
          return convertToObject(groupOfProperties)
        } else {
          return groupOfProperties
        }
      }
    )

    var groupedPropertiesAsObjectsCleaned = groupedPropertiesAsObjects.filter(
      (value) => Object.keys(value).length !== 0
    )

    newArray.push([keyName, groupedPropertiesAsObjectsCleaned])
    return newArray
  })

  return transformedArray
}

const groupOfDescriptionCardPropertiesAndFeatures =
  groupedDescriptionCardPropertiesWithFeatures.map(
    (groupOfDescriptionCardProperties) => {
      return groupOfDescriptionCardProperties.map(([key, value]) => {
        return transformPropertyNames([key, value])
      })
    }
  )

const arrayOfDescriptionCardObjectsWithFeatures =
  groupOfDescriptionCardPropertiesAndFeatures.map((array) => {
    return convertToObject(array)
  })

let dataToSendThree = Object.assign(notDescriptionCardPropertiesAsObjectTwo, {
  description_cards: arrayOfDescriptionCardObjectsWithFeatures,
})

// console.log("The initial data", test_data);
// console.log("The transformed data", dataToSendThree);

export function transformData(dataToTransform) {
  const dataAsIterable = convertToIterable(dataToTransform)
  const descriptionCardPropertiesIterable = dataAsIterable.filter(
    isDescriptionCardProperty
  )
  const notDescriptionCardPropertiesIterable = dataAsIterable.filter(
    isNotDescriptionCardProperty
  )
  const notDescriptionCardPropertiesAsObject = convertToObject(
    notDescriptionCardPropertiesIterable
  )

  const arrayOfGroupedDescriptionCardProperties = sortArrayIntoGroups(
    descriptionCardPropertiesIterable,
    'description-card'
  )

  const arrayOfGroupedDescriptionCardPropertiesWithSortedFeatures =
    extractGroupedPropertiesIntoInternalArrayOfObjects(
      arrayOfGroupedDescriptionCardProperties,
      'feature',
      'features'
    )

  const groupedPropertiesWithCorrectNames =
    arrayOfGroupedDescriptionCardPropertiesWithSortedFeatures.map(
      (groupOfDescriptionCardProperties) => {
        return groupOfDescriptionCardProperties.map(([key, value]) => {
          return transformPropertyNames([key, value])
        })
      }
    )

  const arrayOfDescriptionCardObjects = groupedPropertiesWithCorrectNames.map(
    (array) => {
      return convertToObject(array)
    }
  )

  const transformedData = Object.assign(notDescriptionCardPropertiesAsObject, {
    description_cards: arrayOfDescriptionCardObjects,
  })

  return transformedData
}

console.log('using the function', transformData(test_data))

// export default { transformData }
