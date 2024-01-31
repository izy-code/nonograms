const createNode = (parentNode, tagName, classNames = '', textContent = '', attribsObject = '', isSVG = false) => {
  let newNode;

  if (isSVG) {
    newNode = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  } else {
    newNode = document.createElement(tagName);
  }

  if (classNames) {
    newNode.setAttribute('class', classNames);
  }

  if (typeof attribsObject === 'object') {
    Object.entries(attribsObject).forEach(([key, value]) => {
      newNode.setAttribute(key, value);
    });
  }

  if (textContent) {
    newNode.textContent = textContent;
  }

  if (parentNode) {
    parentNode.append(newNode);
  }

  return newNode;
};

export { createNode };
