export const categoriesAPI = async (paramsURL) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/categoria.php/?${paramsURL}`
    );
    const res = await response.json();
    if (response.status === 200) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
