

// Función para guardar un item en localStorage
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

// Función para obtener un item de localStorage
export const getItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Error al obtener de localStorage:", error);
    return null;
  }
};

// Función para eliminar un item de localStorage
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error al eliminar de localStorage:", error);
  }
};

