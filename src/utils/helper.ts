export function getFormData(formElement: HTMLFormElement) {
  const formData = new FormData(formElement);
  const data: { [key: string]: FormDataEntryValue } = {};
  for (const [k, v] of formData.entries()) {
    data[k] = v;
  }
  return data;
}
