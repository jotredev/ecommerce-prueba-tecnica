import {z} from "zod";
import {schemaLocation} from "@/types/Client";

/**
 * Interfaz que representa un país obtenido de la API REST Countries.
 * Contiene solo las propiedades necesarias para la validación de países.
 *
 * @interface Country
 * @property {string} cca2 - Código de país de dos letras según ISO 3166-1 alpha-2
 * @property {Object} name - Objeto con información del nombre del país
 * @property {string} name.common - Nombre común del país en inglés
 */
interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

/**
 * Valida los datos de ubicación del cliente y verifica que el país
 * de envío pertenezca al continente americano.
 *
 * Esta función realiza dos validaciones:
 * 1. Verifica que los datos del formulario cumplan con el esquema definido
 * 2. Consulta la API REST Countries para confirmar que el país existe y
 *    pertenece a América
 *
 * @async
 * @param {z.infer<typeof schemaLocation>} values - Datos del formulario de ubicación
 * @returns {Promise<{response: string, message: string}>} Objeto con el resultado de la validación
 *   - response: "success" si la validación es exitosa, "error" en caso contrario
 *   - message: Mensaje descriptivo del resultado
 *
 * @example
 * // Ejemplo de uso exitoso
 * const result = await registerLocation({
 *   name: "Juan Pérez",
 *   phone: "1234567890",
 *   email: "juan@example.com",
 *   country: "MX"
 * });
 * // result = { response: "success", message: "El país pertenece a la región de América" }
 *
 * @example
 * // Ejemplo con país fuera de América
 * const result = await registerLocation({
 *   name: "María García",
 *   phone: "9876543210",
 *   email: "maria@example.com",
 *   country: "ES"
 * });
 * // result = { response: "error", message: "El país no pertenece a la región de América" }
 *
 * @throws {Error} Si ocurre un error al consultar la API REST Countries
 */
export async function registerLocation(values: z.infer<typeof schemaLocation>) {
  try {
    const {success, data} = schemaLocation.safeParse(values);

    if (!success) {
      return {response: "error", message: "Datos no válidos"};
    }

    const {country} = data;

    // Validamos que el país sea dela región de América
    const response = await fetch(
      "https://restcountries.com/v3.1/region/america"
    );

    if (!response.ok) {
      return {
        response: "error",
        message: "Error al obtener los países de América"
      };
    }

    // Verificamos que el país pertenezca a la región de América
    const americasCountries: Country[] = await response.json();
    const verifyCountry: boolean = americasCountries.some(
      (c: Country) => c.cca2 === country
    );

    if (verifyCountry) {
      // El país pertenece a la región de América
      const countryName = americasCountries.find(
        (c: Country) => c.cca2 === country
      );

      // Guardamos los datos del cliente en el localstorage

      localStorage.setItem(
        "customer-info",
        JSON.stringify({...data, country: countryName?.name.common})
      );

      return {
        response: "success",
        message: "El país pertenece a la región de América"
      };
    } else {
      return {
        response: "error",
        message: "El país no pertenece a la región de América"
      };
    }
  } catch (error) {
    console.log(error);
    return {response: "error", message: "Error del servidor"};
  }
}
