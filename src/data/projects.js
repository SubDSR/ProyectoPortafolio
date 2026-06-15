import { FaReact, FaCss3Alt, FaPython } from 'react-icons/fa';
import { SiVite, SiFastapi, SiMysql, SiExpo } from 'react-icons/si';

import systemvetImg from '../assets/sistema_veterinario.webp';
import portfolioImg from '../assets/portafolio-personal.webp';
import educamovilImg from '../assets/educamovil.webp';
import lapuntitaImg from '../assets/lapuntita.webp';

export const projects = [
  {
    id: 1,
    category: 'Backend',
    image: systemvetImg,
    title: 'Sistema de Gestión Clínica Veterinaria',
    techs: [
      { Icon: FaPython,  name: 'Python'  },
      { Icon: SiFastapi, name: 'FastAPI' },
      { Icon: SiMysql,   name: 'MySQL'   },
    ],
    description:
      'Proyecto enfocado en la gestión integral de una clínica veterinaria. Me concentré principalmente en el desarrollo del backend con Python y FastAPI, además del diseño y administración de la base de datos en MySQL.',
    links: {
      web:    'https://veterinariabd.vercel.app/',
      github: 'https://github.com/KevinBohorquez/VeterinariaClinica_Backend',
    },
  },
  {
    id: 2,
    category: 'Frontend',
    image: portfolioImg,
    title: 'Portafolio Personal',
    techs: [
      { Icon: FaReact,   name: 'React' },
      { Icon: SiVite,    name: 'Vite'  },
      { Icon: FaCss3Alt, name: 'CSS'   },
    ],
    description:
      'Mi portafolio personal, diseñado y desarrollado para mostrar mis habilidades y proyectos. Creado desde cero con un enfoque en un diseño limpio, moderno e interactivo.',
    links: {
      web:    '#',
      github: 'https://github.com/SubDSR/ProyectoPortafolio.git',
    },
  },
  {
    id: 3,
    category: 'Mobile',
    image: educamovilImg,
    imageClass: 'img-top-focus',
    title: 'EducaMovil',
    techs: [
      { Icon: FaReact, name: 'React Native' },
      { Icon: SiExpo,  name: 'Expo'         },
    ],
    description:
      'Aplicación móvil educativa diseñada para mejorar el aprendizaje interactivo.',
    links: {
      video:  'https://drive.google.com/file/d/1mNoM-mDNSaqoxgwZHod_F0MmrttUZspz/view?usp=sharing',
      github: 'https://github.com/SubDSR/EducaMovil',
    },
  },
  {
    id: 4,
    category: 'Frontend',
    image: lapuntitaImg,
    title: 'La Puntita',
    techs: [
      { Icon: FaReact,   name: 'React' },
      { Icon: FaCss3Alt, name: 'CSS'   },
    ],
    description:
      'Página web dedicada a la venta de comida, enfocada en una interfaz de usuario atractiva y funcional.',
    links: {
      video:  'https://drive.google.com/file/d/1kiKX-rTdQ6A9EWuQ5JFfWFJB5x2u1_8p/view?usp=sharing',
      github: 'https://github.com/AngelaEstrella/La-Puntita-Front.git',
    },
  },
];

export const FILTERS = ['Todos', 'Frontend', 'Backend', 'Mobile'];
