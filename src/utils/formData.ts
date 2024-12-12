export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    // Only append if value is not empty string, undefined, or null
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value.toString());
    }
  });
  return formData;
};