export const fetchPunchTime = async (type, date_one, date_two) => {
  const url = `http://192.168.200.3:3000/api/consulta?departamento=${type}&fecha_inicio=${date_one}&fecha_fin=${date_two}`;
  
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json(); // Agregamos 'await' aquí para esperar la respuesta JSON.
    return data;
  } else {
    throw new Error('Error fetching data');
  }
};

export const fetchEmployeePunchTime = async (emp_code, date_one, date_two) => {
  const url = `http://192.168.200.3:3000/api/employee/${emp_code}?fecha_inicio=${date_one}&fecha_fin=${date_two}`;

  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching data');
  }
};
