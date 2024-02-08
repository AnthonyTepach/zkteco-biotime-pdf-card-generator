"use client"
import Hero from "@/app/components/Hero";

import Busqueda from "@/app/components/Busqueda";
/* const fetchPunchTime = (type,date_one,date_two) => {
  const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/consulta?departamento=${type}&fecha_inicio=${date_one}&fecha_fin=${date_two}`;

  return fetch(url).then((res) => res.json());
}; */



export default  function PerType({ params }) {
  const { type } = params;


  return (

      <Hero type={type}/>

  );
}
