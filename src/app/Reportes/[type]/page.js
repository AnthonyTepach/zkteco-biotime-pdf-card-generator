
import Hero from "@/app/components/Hero";
import PunchTable from "@/app/components/PunchTable";
import {fetchPunchTime} from "@/app/services/biotimepro";

/* const fetchPunchTime = (type,date_one,date_two) => {
  const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/consulta?departamento=${type}&fecha_inicio=${date_one}&fecha_fin=${date_two}`;

  return fetch(url).then((res) => res.json());
}; */



export default async function PerType({ params }) {
  const { type } = params;
  const punchs = await fetchPunchTime(type,"2023-11-01","2023-11-03");


  return (
    <>
      <Hero />
      <PunchTable punchs={punchs} type={type}/>
    </>
  );
}
