"use strict";
const player1 = {
    game: 'CS:GO',
    hours: 300,
    server: 'basic',
};
const player2 = {
    game: 2048,
    hours: '300 h.',
    server: 'arcade',
};
const player3 = {
    game: 'Chess',
    hours: {
        total: 500,
        inMenu: 50,
    },
    server: 'chess',
};
var FigureType;
(function (FigureType) {
    FigureType["SQUARE"] = "rect";
    FigureType["CIRCLE"] = "circle";
    FigureType["TRIANGLE"] = "triangle";
    FigureType["LINE"] = "line";
})(FigureType || (FigureType = {}));
function calculateAmountOfFigures(figure) {
    return figure.reduce((acc, item) => {
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
    }, { squares: 0, circles: 0, triangles: 0, others: 0 });
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
