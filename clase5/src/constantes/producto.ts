 export const obtenerProducto = async (idProducto: number) => {
      return await 
      fetch(`https://fakestoreapi.com/products/${idProducto}`)
      .then(response => response.json());
  }