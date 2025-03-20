import {z} from "zod";
import {schemaLocation} from "@/types/Client";

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

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
      // Guardamos los datos en el localstorage
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
