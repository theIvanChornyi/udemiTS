type Animal = 'cat' | 'dog' | 'bird';

enum Status {
  Avalible = 'available',
  NoAvalible = 'not available',
}

interface IAnimal {
  animal: Animal;
  breed: string;
  sterilized?: boolean;
}

interface ISuccesData extends IAnimal {
  location: string;
  age?: number;
}

interface ISuccesRes {
  status: Status.Avalible;
  data: ISuccesData;
}

interface IRejectRes {
  status: Status.NoAvalible;
  data: {
    message: string;
    nextUpdateIn: Date;
  };
}

type Res = ISuccesRes | IRejectRes;

function isAvalible(res: Res): res is ISuccesRes {
  if (res.status === Status.Avalible) {
    return true;
  } else {
    return false;
  }
}

function checkAnimalData(animal: Res): string | ISuccesData {
  if (isAvalible(animal)) {
    return animal.data;
  } else {
    return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
  }
}
