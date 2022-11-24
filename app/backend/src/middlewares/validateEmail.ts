import Exception from './exception';

export default (email: string): void => {
  const regex = /^([0-9a-zA-Z].*?@([0-9a-zA-Z].*\.\w{2,4}))$/gm;
  const match = regex.exec(email);
  if (!match) {
    throw new Exception(400, 'Valid email is required');
  }
};
