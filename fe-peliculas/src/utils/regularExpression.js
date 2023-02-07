const emailER = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const claveER = /^[a-z0-9_-]{6,20}$/;
const comentarioER = /^[^\n]{15,250}$/;
const nombresER = /^[^\n]{2,50}$/;
const descripPeliculaER = /^[^\n]{15,200}$/;
const anioEstrenoER = /^[0-9]{4}$/;

export {
  emailER,
  claveER,
  comentarioER,
  nombresER,
  descripPeliculaER,
  anioEstrenoER
}
