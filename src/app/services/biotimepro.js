const API_BASE_URL = "http://localhost:3000";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
};

const fetchWithParams = async (endpoint, params) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`, document.baseURI);
  
  // Append parameters to the URL
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await fetch(url.toString());
    return handleResponse(response);
  } catch (error) {
    console.error("Error during fetch:", error.message);
    throw new Error("Failed to fetch data.");
  }
};

export const fetchPunchTime = async (type, date_one, date_two) => {
  if (!type || !date_one || !date_two) {
    throw new Error("Missing required parameters: type, date_one, date_two");
  }

  return await fetchWithParams("/api/consulta", { departamento: type, fecha_inicio: date_one, fecha_fin: date_two });
};

export const fetchEmployeePunchTime = async (emp_code, date_one, date_two) => {
  if (!emp_code || !date_one || !date_two) {
    throw new Error("Missing required parameters: emp_code, date_one, date_two");
  }

  return await fetchWithParams(`/api/employee/${emp_CODE}`, { fecha_inicio: date_one, fecha_fin: date_two });
};
