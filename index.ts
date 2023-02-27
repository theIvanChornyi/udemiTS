interface IData {
  email: string;
  title: string;
  text: string;
  checkbox: boolean;
}

const formData: IData = {
  email: '',
  title: '',
  text: '',
  checkbox: false,
};

const formsListRef = document.querySelectorAll('form');
const emailRef = document.querySelector('#email') as HTMLInputElement;
const titleRef = document.querySelector('#title') as HTMLInputElement;
const textRef = document.querySelector('#text') as HTMLInputElement;
const checkboxRef = document.querySelector('#checkbox') as HTMLInputElement;

function handleSubmit(e: SubmitEvent): void {
  e.preventDefault();

  formData.email = emailRef?.value;
  formData.title = titleRef?.value;
  formData.text = textRef?.value;
  formData.checkbox = checkboxRef.checked;

  validateFormData(formData) && checkFormData(formData);
}

formsListRef.forEach((elem: HTMLFormElement) =>
  elem.addEventListener('submit', handleSubmit)
);

function validateFormData(data: IData): boolean {
  if (
    Object.values(data).every((value: string | boolean) =>
      typeof value === 'string' ? value.trim() : value
    )
  ) {
    return true;
  } else {
    console.log('Please, complete all fields');
    return false;
  }
}

function checkFormData(data: IData): void {
  const { email } = data;
  const emails = ['example@gmail.com', 'example@ex.com', 'admin@gmail.com'];

  const isInclude = emails.some(e => e === email);
  if (isInclude) {
    console.log('This email is already exist');
  } else {
    console.log('Posting data...');
  }
}
