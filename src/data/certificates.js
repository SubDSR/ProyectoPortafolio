import { FaBrain, FaChartLine, FaCloud, FaDatabase } from 'react-icons/fa6';

import certDiseGra from '../assets/Certificado_DiseñoGrafico.webp';
import certCienDat from '../assets/Certificado_CienciaDeDatos.webp';
import certCloudCompt from '../assets/Certificado_CloudComputing.webp';
import certSQlBD from '../assets/Certificado_SQLBaseDeDatos.webp';

export const certificates = [
  {
    img: certDiseGra,
    alt: 'Certificado de Diseño Gráfico',
    title: 'Diseño Gráfico con IA',
    description: 'Diseño asistido por IA, prompting avanzado, flujos generativos, automatización creativa, agentes y ética profesional.',
    pdf: '/certificates/Certificado_DiseñoGrafico.pdf',
    tag: 'Diseño & IA',
    id: '017 - 0075683',
    year: '2025',
    command: 'run_diseno_grafico_ia.sh',
    Icon: FaBrain,
  },
  {
    img: certCienDat,
    alt: 'Certificado de Ciencia de Datos',
    title: 'Ciencia de Datos',
    description: 'Análisis exploratorio de datos, visualización, limpieza, tratamiento de outliers e ingeniería de variables con Python.',
    pdf: '/certificates/Certificado_CienciaDeDatos.pdf',
    tag: 'Data',
    id: '017 - 0068761',
    year: '2025',
    command: 'run_ciencia_de_datos.sh',
    Icon: FaChartLine,
  },
  {
    img: certCloudCompt,
    alt: 'Certificado de Cloud Computing',
    title: 'Cloud Computing',
    description: 'Fundamentos cloud en AWS, Azure y Google Cloud: arquitectura, redes, almacenamiento, seguridad, costos y despliegues.',
    pdf: '/certificates/Certificado_CloudComputing.pdf',
    tag: 'Cloud',
    id: '017 - 0078792',
    year: '2025',
    command: 'run_cloud_computing.sh',
    Icon: FaCloud,
  },
  {
    img: certSQlBD,
    alt: 'Certificado de SQL Base de Datos',
    title: 'SQL — Base de Datos 1',
    description: 'Gestión de bases de datos en SQL Server: consultas, tablas, joins, agregaciones, vistas y seguridad.',
    pdf: '/certificates/Certificado_SQLBaseDeDatos.pdf',
    tag: 'Backend',
    id: '017 - 0080527',
    year: '2025',
    command: 'run_sql_base_de_datos.sh',
    Icon: FaDatabase,
  },
];
