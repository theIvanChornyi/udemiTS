interface IPhone {
  company: string;
  number: number;
}

interface IMobilePhone extends IPhone {
  size: string;
  companyPartner: IPhone['company'];
  manufactured: Date;
}

const phones: IMobilePhone[] = [
  {
    company: 'Nokia',
    number: 1285637,
    size: '5.5',
    companyPartner: 'MobileNokia',
    manufactured: new Date('2022-09-01'),
  },
  {
    company: 'Samsung',
    number: 4356637,
    size: '5.0',
    companyPartner: 'SamMobile',
    manufactured: new Date('2021-11-05'),
  },
  {
    company: 'Apple',
    number: 4552833,
    size: '5.7',
    companyPartner: 'no data',
    manufactured: new Date('2022-05-24T12:00:00'),
  },
];

interface IPhonesManufacturedAfterDate extends IMobilePhone {
  initialDate: string;
}

function filterPhonesByDate(
  phones: IMobilePhone[],
  key: keyof IMobilePhone,
  initial: string
): IPhonesManufacturedAfterDate[] {
  const initialDate = new Date(initial);
  const initialArr: IPhonesManufacturedAfterDate[] = [];

  return phones.reduce((acc, phone) => {
    if (phone[key] > initialDate) {
      acc.push({ ...phone, initialDate: initial });
    }
    return acc;
  }, initialArr);

  // return phones
  //   .filter(phone => phone[key] > new Date(initial))
  //   .map(phone => ({ ...phone, initialDate: initial }));
}

console.log(filterPhonesByDate(phones, 'manufactured', '2022-01-01'));
