let products = [
  {
    id: 1,
    sku: "ABC123",
    name: "Смартфон X1",
    country: "Китай",
    price1: 12000,
    price2: 11000,
    price3: 10500,
    stock: 15,
  },
  {
    id: 2,
    sku: "DEF456",
    name: "Ноутбук ProBook",
    country: "США",
    price1: 40000,
    price2: 39000,
    price3: 37000,
    stock: 7,
  },
  {
    id: 3,
    sku: "GHI789",
    name: "Телевізор SmartVision",
    country: "Польща",
    price1: 18000,
    price2: 17000,
    price3: 16000,
    stock: 4,
  },
  {
    id: 4,
    sku: "JKL012",
    name: "Навушники Bass+",
    country: "Китай",
    price1: 2500,
    price2: 2300,
    price3: 2000,
    stock: 30,
  },
  {
    id: 5,
    sku: "MNO345",
    name: "Планшет Tab10",
    country: "США",
    price1: 15000,
    price2: 14500,
    price3: 14000,
    stock: 10,
  },
  {
    id: 6,
    sku: "PQR678",
    name: "Монітор UltraHD",
    country: "Корея",
    price1: 12000,
    price2: 11500,
    price3: 11000,
    stock: 5,
  },
  {
    id: 7,
    sku: "STU901",
    name: "Клавіатура Gaming",
    country: "Китай",
    price1: 2000,
    price2: 1800,
    price3: 1700,
    stock: 50,
  },
  {
    id: 8,
    sku: "VWX234",
    name: "Мишка Wireless",
    country: "Німеччина",
    price1: 1500,
    price2: 1400,
    price3: 1350,
    stock: 20,
  },
  {
    id: 9,
    sku: "YZA567",
    name: "Колонка SoundBoom",
    country: "Польща",
    price1: 5000,
    price2: 4700,
    price3: 4500,
    stock: 12,
  },
  {
    id: 10,
    sku: "BCD890",
    name: "Роутер SpeedNet",
    country: "Корея",
    price1: 3000,
    price2: 2900,
    price3: 2700,
    stock: 18,
  },
];

// Сортування за країною та середня ціна
function sortByCountry(products) {
  return [...products].sort((a, b) => a.country.localeCompare(b.country));
}

function avgPriceByCountry(products) {
  let result = {};
  products.forEach((p) => {
    let avg = (p.price1 + p.price2 + p.price3) / 3;
    if (!result[p.country]) {
      result[p.country] = { sum: 0, count: 0 };
    }
    result[p.country].sum += avg;
    result[p.country].count++;
  });

  for (let country in result) {
    result[country] = result[country].sum / result[country].count;
  }
  return result;
}

console.log("Сортування за країною:", sortByCountry(products));
console.log("Середня ціна по країнах:", avgPriceByCountry(products));

// Мінімальна price2
function findMinPrice2(products) {
  let min = products[0];
  products.forEach((p) => {
    if (p.price2 < min.price2) min = p;
  });
  return min.id;
}

console.log("ID з мінімальною price2:", findMinPrice2(products));

// Додавання нового запису

function addProduct(products, newProduct) {
  let values = Object.values(newProduct);
  let hasEmpty = values.some((v) => v === undefined || v === null);
  if (hasEmpty) {
    products.push(newProduct); // в кінець
  } else {
    products.unshift(newProduct); // на початок
  }
}

addProduct(products, {
  id: 11,
  sku: "EEE111",
  name: "Смарт-годинник TimeX",
  country: "Японія",
  price1: 8000,
  price2: 7800,
  price3: 7500,
  stock: 8,
});

console.log("Після додавання нового продукту:", products);

// 4. Динаміка цін
function priceDynamics(products) {
  return products.map((p) => {
    let prices = [p.price1, p.price2, p.price3];

    let isIncreasing = prices.every(
      (val, i, arr) => i === 0 || arr[i] > arr[i - 1]
    );
    let isDecreasing = prices.every(
      (val, i, arr) => i === 0 || arr[i] < arr[i - 1]
    );

    let status = "не стабільні зміни";
    if (isIncreasing) {
      status = "стабільно дорожчає";
    } else if (isDecreasing) {
      status = "стабільно дешевшає";
    }

    return { id: p.id, name: p.name, trend: status };
  });
}

console.log("Динаміка цін:", priceDynamics(products));
