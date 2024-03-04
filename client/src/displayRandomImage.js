export const displayRandomImage = ()=> {
    const randomNumber = Math.random();
    if(randomNumber<= 1/4)
      return 'disaster1.jpeg';
    else if(randomNumber> 1/4 && randomNumber <= 2/4)
      return 'disaster2.jpeg';
    else if (randomNumber > 2/4 && randomNumber <=3/4)
      return 'disaster3.jpeg';
    else
      return 'disaster4.jpeg';
  }
