const buildApiUrl = (endpoint, queryParams) => {
  const baseUrl = `${process.env.API_IP}:${process.env.API_PORT}`;
  return new URL(`${baseUrl}/${endpoint}`, document.baseURI).href + '?' + new URLSearchParams(queryParams).toString();
};

export const fetchPunchTime = async (type, date_one, date_two) => {
  const url = buildApiUrl('api/consulta', { departamento: type, fecha_inicio: date_one, fecha_fin: date_two });

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json(); // Agregamos 'await' aquí para esperar la respuesta JSON.
    return data;
  } else {
    throw new Error('Error fetching punch time data');
  }
};

export const fetchEmployeePunchTime = async (emp_code, date_one, date_two) => {
  const url = buildApiUrl(`/api/employee/${emp_code}`, { fecha_inicio: date_one, fecha_fin: date_two });

  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching employee punch time data');
  }
};
