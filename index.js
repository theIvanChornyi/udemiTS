var electricityUserData = {
    readings: 95,
    units: 'kWt',
    mode: 'double'
};
var waterUserData = {
    readings: 3,
    units: 'm3'
};
var elRate = 0.45;
var wRate = 2;
var monthPayments = [0, 0]; // [electricity, water]
var calculatePayments = function (_a, _b, elRate, wRate) {
    var mode = _a.mode, readings = _a.readings;
    var wData = _b.readings;
    if (mode === 'double' && readings < 50) {
        monthPayments[0] = readings * elRate * 0.7;
    }
    else {
        monthPayments[0] = readings * elRate;
    }
    monthPayments[1] = wData * wRate;
};
calculatePayments(electricityUserData, waterUserData, elRate, wRate);
var sendInvoice = function (_a, _b, _c) {
    var electricity = _a[0], water = _a[1];
    var eReadings = _b.readings, eUnits = _b.units;
    var wReadings = _c.readings, wUnits = _c.units;
    var text = "    Hello!\n    This month you used ".concat(eReadings, " ").concat(eUnits, " of electricity\n    It will cost: ").concat(electricity, "\u20AC\n    \n    This month you used ").concat(wReadings, " ").concat(wUnits, " of water\n    It will cost: ").concat(water, "\u20AC");
    return text;
};
console.log(sendInvoice(monthPayments, electricityUserData, waterUserData));
