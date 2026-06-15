import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub, FaCode } from 'react-icons/fa';
import { SiFastapi, SiFigma, SiMysql, SiVite } from 'react-icons/si';

import sqlserverLogo from '../assets/sqlserver-icon.png';
import pythonLogo from '../assets/python-icon.png';

export const row1 = [
  { name: 'HTML',       Icon: FaHtml5 },
  { name: 'CSS',        Icon: FaCss3Alt },
  { name: 'JavaScript', Icon: FaJs },
  { name: 'React',      Icon: FaReact },
  { name: 'Python',     iconSrc: pythonLogo },
  { name: 'FastAPI',    Icon: SiFastapi },
  { name: 'MySQL',      Icon: SiMysql },
];

export const row2 = [
  { name: 'SQL Server', iconSrc: sqlserverLogo },
  { name: 'Git',        Icon: FaGitAlt },
  { name: 'GitHub',     Icon: FaGithub },
  { name: 'Vite',       Icon: SiVite },
  { name: 'Figma',      Icon: SiFigma },
  { name: 'VS Code',    Icon: FaCode },
];
