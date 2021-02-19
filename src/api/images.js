const images = {
  1: 'https://user-images.githubusercontent.com/57708971/105352968-f8aa5f00-5c31-11eb-983a-fe853ede8df8.jpg',
  2: 'https://user-images.githubusercontent.com/57708971/105352972-fa742280-5c31-11eb-9e8b-bb5278e3559d.jpg',
  3: 'https://user-images.githubusercontent.com/57708971/105352976-fb0cb900-5c31-11eb-9137-fecc7b18b534.jpg',
  4: 'https://user-images.githubusercontent.com/57708971/105352979-fba54f80-5c31-11eb-9166-85c05b5a8817.jpg',
};

const randomImage = () => {
  let num = Math.floor(Math.random() * 4 + 1);
  return images[num];
};

export default randomImage;
