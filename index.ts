interface IPlayTime {
  total: number;
  inMenu: number;
}

interface IPlayerData<
  T extends string | number,
  S extends IPlayTime | string | number
> {
  game: T;
  hours: S;
  server: string;
}

const player1: IPlayerData<string, number> = {
  game: 'CS:GO',
  hours: 300,
  server: 'basic',
};

const player2: IPlayerData<number, string> = {
  game: 2048,
  hours: '300 h.',
  server: 'arcade',
};

const player3: IPlayerData<string, IPlayTime> = {
  game: 'Chess',
  hours: {
    total: 500,
    inMenu: 50,
  },
  server: 'chess',
};

interface AmountOfFigures {
  squares: number;
  circles: number;
  triangles: number;
  others: number;
}

enum FigureType {
  SQUARE = 'rect',
  CIRCLE = 'circle',
  TRIANGLE = 'triangle',
  LINE = 'line',
}

interface IFigure {
  name: FigureType;
}

function calculateAmountOfFigures<T extends IFigure>(
  figure: T[]
): AmountOfFigures {
  return figure.reduce(
    (acc, item) => {
      switch (item.name) {
        case FigureType.SQUARE:
          acc.squares += 1;
          break;
        case FigureType.CIRCLE:
          acc.circles += 1;
          break;
        case FigureType.TRIANGLE:
          acc.triangles += 1;
          break;
        case FigureType.LINE:
          acc.others += 1;
          break;
        default:
          return acc;
      }
      return acc;
    },
    { squares: 0, circles: 0, triangles: 0, others: 0 }
  );
}

const data = [
  {
    name: FigureType.SQUARE,
    data: { a: 5, b: 10 },
  },
  {
    name: FigureType.SQUARE,
    data: { a: 6, b: 11 },
  },
  {
    name: FigureType.TRIANGLE,
    data: { a: 5, b: 10, c: 14 },
  },
  {
    name: FigureType.LINE,
    data: { l: 15 },
  },
  {
    name: FigureType.CIRCLE,
    data: { r: 10 },
  },
  {
    name: FigureType.CIRCLE,
    data: { r: 5 },
  },
  {
    name: FigureType.SQUARE,
    data: { a: 15, b: 7 },
  },
  {
    name: FigureType.TRIANGLE,
  },
];

console.log(calculateAmountOfFigures(data));
