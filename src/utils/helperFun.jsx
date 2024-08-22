export const handleInputChange = (e, form, setForm) => {
  const { name, value } = e.target;

  setForm({ ...form, [name]: value });
};
