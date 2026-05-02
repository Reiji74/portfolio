import { ReactNode } from "react";
import { project1 } from "./project1";
import { project2 } from "./project2";
import { project3 } from "./project3";
import { project4 } from "./project4";
import { project5 } from "./project5";
import { project6 } from "./project6";
import { project7 } from "./project7";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  image: string;
  code: string;
  platformioIni?: string;
  pythonCode?: string;
  wiringDiagram?: string;
  notes?: string;
  overviewContent?: ReactNode;
};

export const projects: Project[] = [
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7
];