type Amount = 'empty' | number;
type InStock = 'empty' | boolean;

interface ClothesWarehouse {
  jackets: Amount;
  hats: Amount;
  socks: Amount;
  pants: Amount;
}

interface StationeryWarehouse {
  scissors: Amount;
  paper: InStock;
}

interface AppliancesWarehouse {
  dishwashers: Amount;
  cookers: Amount;
  mixers: Amount;
}

interface TotalWarehouse
  extends ClothesWarehouse,
    StationeryWarehouse,
    AppliancesWarehouse {
  deficit: boolean;
  date: Date;
}

const totalData: TotalWarehouse = {
  jackets: 5,
  hats: 'empty',
  socks: 'empty',
  pants: 15,
  scissors: 15,
  paper: true,
  dishwashers: 3,
  cookers: 'empty',
  mixers: 14,
  deficit: true,
  date: new Date(),
};

// Реализуйте функцию, которая принимает в себя главный объект totalData нужного формата
// и возвращает всегда строку
// Функция должна отфильтровать данные из объекта и оставить только те названия товаров, у которых значение "empty"
// и поместить их в эту строку. Если таких товаров нет - возвращается другая строка (см ниже)

// С данным объектом totalData строка будет выглядеть:
// "We need this items: hats, socks, cookers"
// Товары через запятую, в конце её не должно быть. Пробел после двоеточия, в конце строки его нет.

function printReport(data: TotalWarehouse): string {
  const emptyPositions: string = Object.entries(data)
    .reduce(
      (acc, [key, value]) => (value === 'empty' ? acc + ` ${key},` : acc),
      ''
    )
    .slice(0, -1);

  return emptyPositions === ''
    ? 'Everything fine'
    : `We need this items:${emptyPositions}`;
}

console.log(printReport(totalData));
