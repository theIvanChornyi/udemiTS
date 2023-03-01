interface IForm {
  login: string;
  password: string;
}

type Validation<T> = {
  [KEY in keyof T]: { isValid: false; errorMsg: string } | { isValid: true };
};

const validationData: Validation<IForm> = {
  login: { isValid: false, errorMsg: 'At least 3 characters' },
  password: { isValid: true },
};
