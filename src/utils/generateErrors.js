
function generateErrorCharacter(alphabet, typeOfAttribute, faker) {
  if (typeOfAttribute === "numeric") {
    return faker.number.int({ max: 9 }).toString();
  } else if (typeOfAttribute === "alphanumeric") {
    return faker.helpers.arrayElement([...alphabet, ..."0123456789".split("")]);
  } else {
    return faker.helpers.arrayElement(alphabet);
  }
}

function swapCharacters(attributeValueArray, errorPosition) {
  [attributeValueArray[errorPosition], attributeValueArray[errorPosition + 1]] =
    [
      attributeValueArray[errorPosition + 1],
      attributeValueArray[errorPosition],
    ];
}

function getRandomAttribute(region) {
  const attributes = [
    { value: "firstName", type: "alpha" },
    ...(region.hasMiddleName ? [{ value: "middleName", type: "alpha" }] : []),
    { value: "lastName", type: "alpha" },
    { value: "address", type: "alphanumeric" },
    { value: "phoneNumber", type: "numeric" },
  ];

  return region.faker.helpers.arrayElement(attributes);
}

function makeError(attributeValue, errorType, errorCharacter, errorPosition) {
  let attributeValueArray = attributeValue.split("");
  if (errorType === 0) {
    attributeValueArray[errorPosition] = "";
  } else if (errorType === 1) {
    attributeValueArray.splice(errorPosition, 0, errorCharacter);
  } else {
    swapCharacters(attributeValueArray, errorPosition);
  }
  return attributeValueArray.join("");
}

function introduceSingleError(
  user,
  attribute,
  typeOfAttribute,
  alphabet,
  faker
) {
  const errorPosition = faker.number.int({
    max: (user[attribute].length || 1) - 1,
  });
  const errorType = faker.number.int({ max: 2 });
  let errorCharacter = generateErrorCharacter(alphabet, typeOfAttribute, faker);
  user[attribute] = makeError(
    user[attribute],
    errorType,
    errorCharacter,
    errorPosition
  );
}

function getErrorCount(region, errorCount) {
  const integerPart = Math.floor(errorCount);
  const fractionalPart = errorCount - integerPart;
  const randomNumber = region.faker.number.float({ max: 0.99 });
  const howManyTimes =
    randomNumber < fractionalPart ? integerPart + 1 : integerPart;
  return howManyTimes;
}

export function introduceErrors(users, errorCount, region) {
  return users.map((user) => {
    user = {
      ...user,
    };
    const numberOfErrors = getErrorCount(region, errorCount);
    for (let i = 0; i < numberOfErrors; i++) {
      const attribute = getRandomAttribute(region);
      introduceSingleError(
        user,
        attribute.value,
        attribute.type,
        region.alphabet,
        region.faker
      );
    }
    return user;
  });
}
