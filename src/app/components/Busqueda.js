import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import PunchTable from "@/app/components/PunchTable";

import { fetchPunchTime } from '../services/biotimepro';

const Busqueda = ({ type }) => {
  // ... Resto del código del componente Hero ...



  // ... Resto del código del componente Hero ...

  return (
    
      {/* Renderiza el contenido del componente */}
   
  );
};

export async function getServerSideProps(context) {
  // Obtenemos 'type' del parámetro 'context' que se pasa a getServerSideProps
  const { type } = context.query;

  // Luego puedes utilizar 'type' para realizar las llamadas necesarias a la API o cargar datos.

  // Ejemplo de llamada a una función de servicio para obtener datos
  const punchs = await fetchPunchTime(type, startDate, endDate);

  return {
    props: {
      type,
      punchs,
    },
  };
}

export default Busqueda;
