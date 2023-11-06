export const fetchPunchTime = async (type, date_one, date_two) => {
    const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/consulta?departamento=${type}&fecha_inicio=${date_one}&fecha_fin=${date_two}`;
  
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching data');
    }
  };


  export const fetchEmployeePunchTime = async (emp_code, date_one, date_two) => {
    const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/employee/${emp_code}?fecha_inicio=${date_one}&fecha_fin=${date_two}`;
  
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching employee data');
    }
  };