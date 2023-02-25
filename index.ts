const electricityUserData = {
  readings: 95,
  units: 'kWt',
  mode: 'double',
};

const waterUserData = {
  readings: 3,
  units: 'm3',
};

const elRate: number = 0.45;
const wRate: number = 2;

const monthPayments: number[] = [0, 0]; // [electricity, water]

const calculatePayments = (
  { mode, readings }: { mode: string; readings: number },
  { readings: wData }: { readings: number },
  elRate: number,
  wRate: number
): void => {
  if (mode === 'double' && readings < 50) {
    monthPayments[0] = readings * elRate * 0.7;
  } else {
    monthPayments[0] = readings * elRate;
  }

  monthPayments[1] = wData * wRate;
};

calculatePayments(electricityUserData, waterUserData, elRate, wRate);

const sendInvoice = (
  [electricity, water]: number[],
  { readings: eReadings, units: eUnits }: { readings: number; units: string },
  { readings: wReadings, units: wUnits }: { readings: number; units: string }
): string => {
  const text: string = `    Hello!
    This month you used ${eReadings} ${eUnits} of electricity
    It will cost: ${electricity}€
    
    This month you used ${wReadings} ${wUnits} of water
    It will cost: ${water}€`;

  return text;
};

console.log(sendInvoice(monthPayments, electricityUserData, waterUserData));
