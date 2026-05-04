"use client"
import Hero from "@/app/components/Hero";

import Busqueda from "@/app/components/Busqueda";



export default  function PerType({ params }) {
  const { type } = params;


  return (

      <Hero type={type}/>

  );
}
