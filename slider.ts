interface ISlider {
  container?: string;
  numberOfSlides?: number;
  speed?: 300 | 500 | 700;
  direction?: 'horizontal' | 'vertical';
  dots?: boolean;
  arrows?: boolean;
  animationName?: string;
}

function createSlider({
  container = '',
  numberOfSlides = 1,
  speed = 300,
  direction = 'horizontal',
  dots = true,
  arrows = true,
}: ISlider = {}): void {
  console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();

interface CustomSliderType
  extends Required<Omit<ISlider, 'animationName' | 'speed'>> {
  speed: number;
}

const customSliderOptions: CustomSliderType = {
  container: 'id',
  numberOfSlides: 4,
  speed: 1100,
  direction: 'horizontal',
  dots: true,
  arrows: true,
};

function createCustomSlider(options: CustomSliderType): void {
  if ('container' in options) {
    console.log(options);
  }
}

createCustomSlider(customSliderOptions);
