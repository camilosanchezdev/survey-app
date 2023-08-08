const storagePrefix = 'survey_generator_react_';

const storage = {
  getData: (key: string) => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}${key}`) as string);
  },
  setData: (key: string, data: string) => {
    window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(data));
  },
  clearData: (key: string) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  },
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
