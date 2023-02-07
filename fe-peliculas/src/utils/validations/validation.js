import {
  emailER,
  claveER,
  comentarioER,
  nombresER,
  descripPeliculaER,
  anioEstrenoER,
} from "../regularExpression";

export const validaEmail = (email) => {
  if (email.trim() !== "" && emailER.test(email)) return true;
  return false;
};

export const validaClave = (clave) => {
  if (clave.trim() !== "" && claveER.test(clave)) return true;
  return false;
};

export const validaComentario = (comentario) => {
  if (comentario.trim() !== "" && comentarioER.test(comentario)) return true;
  return false;
};

export const validaNombreChar50 = (name) => {
  if(name.trim() !=='' && nombresER.test(name)) return true;
    return false;
}
export const validaDescripcion = (descrip) => {
  if(descrip.trim() !== '' && descripPeliculaER.test(descrip)) return true;
  return false
}
export const validaAnio = (anio) => {
  if(anio.trim() !== null && anioEstrenoER.test(anio)) return true
    return false
}