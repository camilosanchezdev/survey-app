const sizes = {
  MobileS: '320px',
  MobileM: '375px',
  MobileL: '425px',
  Tablet: '768px',
  Laptop: '1024px',
  LaptopL: '1440px',
  Desktop: '2560px',
};

export const Breakpoints = {
  MobileS: `(min-width: ${sizes.MobileS})`,
  MobileM: `(min-width: ${sizes.MobileM})`,
  MobileL: `(min-width: ${sizes.MobileL})`,
  Tablet: `(min-width: ${sizes.Tablet})`,
  Laptop: `(min-width: ${sizes.Laptop})`,
  LaptopL: `(min-width: ${sizes.LaptopL})`,
  Desktop: `(min-width: ${sizes.Desktop})`,
};
