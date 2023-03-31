export const sortByNumInStock = (arrayOfProducts) => {
  const sortedArrayOfProducts = arrayOfProducts.sort((a, b) => {
    if (a.numInStock === 0 && b.numInStock !== 0) {
      return 1; // a is out of stock, b is in stock, move a to the end
    } else if (a.numInStock !== 0 && b.numInStock === 0) {
      return -1; // a is in stock, b is out of stock, move a to the beginning
    } else {
      return 0; // both are either in stock or out of stock, leave their order unchanged
    }
  });
  return sortedArrayOfProducts;
};

export const sortPriceHighToLow = (arrayOfProducts) => {
  const sortedArrayOfProducts = arrayOfProducts.sort(
    (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
  );
  return sortByNumInStock(sortedArrayOfProducts);
};

export const sortPriceLowToHigh = (arrayOfProducts) => {
  const sortedArrayOfProducts = arrayOfProducts.sort(
    (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
  );
  return sortByNumInStock(sortedArrayOfProducts);
};

export const sortByName = (arrayOfProducts) => {
  const sortedArrayOfProducts = arrayOfProducts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sortByNumInStock(sortedArrayOfProducts);
};
