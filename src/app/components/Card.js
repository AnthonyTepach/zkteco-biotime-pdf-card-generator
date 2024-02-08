import Image from 'next/image';

function convertirFechaAFechaTexto(fecha) {
    const fechaObj = new Date(fecha);
    const opciones = { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return fechaObj.toLocaleDateString('es-MX', opciones);
  }

function Card(props) {
  const { name, projects, img,altimg} = props;
  //projects = chechadas

  return (
    <article className="rounded-xl border border-gray-700 bg-gray-300 p-4">
      <div className="flex items-center gap-4">
      <Image
          alt={altimg}
          src={img}
          width={64} // Ajusta el ancho según sea necesario
          height={64} // Ajusta la altura según sea necesario
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-medium text-zinc-800">{name}</h3>

          <div className="flow-root"></div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {projects.map((project, index) => (
          <li key={index}>
            <a
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600"
            >
              <strong className="font-medium text-zinc-800">{convertirFechaAFechaTexto(project.fecha)}</strong>

              <p className="mt-1 text-xs font-medium text-zing-300">
                {project.hora}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Card;
