const minLength = (length: number) => (value: string) =>
  value.length >= length ? undefined : `Should be at least ${length} characters long`;
export const minLength6 = minLength(6);
export const required = (value: string) => (value ? undefined : 'Required');
export const validEmail = (value: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase()) ? undefined : 'Invalid email';
};
