
import { clsx, type ClassValue } from "clsx";
import { Route } from "next";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BasicLinkSchema {
  label: string;
  path: Route;
}
export interface LinkSchema extends BasicLinkSchema {
  sub?: BasicLinkSchema[];
}

export const links: LinkSchema[] = [
  {
    label: "Home",
    path: "/" satisfies Route,
  },
  {
    label: "About",
    path: "/about" satisfies Route,
  },
  {
    label: "Solutions",
    path: "/solution" satisfies Route,
  },
  {
    label: "Projects",
    path: "/" satisfies Route,
    sub: [
      {
        label: "Case Study",
        path: "/case-study",
      },
      {
        label: "Gallery",
        path: "/gallery",
      },
    ],
  },
  {
    label: "Resources",
    path: "/" satisfies Route,
    sub: [
      {
        label: "Downloads",
        path: "/download",
      },
      {
        label: "Knowledge Hub",
        path: "/blogs",
      },
      {
        label: "FAQs",
        path: "/faq",
      },
    ],
  },
  // {
  //   label: "FAQs",
  //   path: "/faq"
  // },
  // {
  //   label: "Company",
  //   path: "/" satisfies Route,
  //   sub: [
  //     {
  //       label: "About Factory",
  //       path: "/about-factory",
  //     },
  //     {
  //       label: "Career",
  //       path: "/career",
  //     },
  //   ],
  // },
  {
    label: "Career",
    path: "/career",
  },
  //{
    //label: "Product",
    //path: "/product" satisfies Route,
  //},
  {
    label: "Contact",
    path: "/contact" satisfies Route,
    sub: [
      {
        label: "Contact Us",
        path: "/contact",
      },
      {
        label: "Get Quote",
        path: "/quote",
      },
      {
        label: "Vendor Onboarding",
        path: "/onboarding",
      },
    ],
  },
];

export interface FaqSchema {
  id: string;
  title: string;
  answer: ReactNode;
}

export const faqs: FaqSchema[] = [
  {
    id: "1",
    title: "1. How long does manufacturing take?",
    answer: (
      <>
        Standard prefabricated assemblies are ready within 5–7 business days.
        Custom or large-scale assemblies may take 10–14 days, while
        containerized pump rooms typically require 3–4 weeks. Our production and
        logistics teams coordinate closely to ensure on-time delivery for every
        project.
      </>
    ),
  },
  {
    id: "2",
    title: "2. What's included with each prefabricated assembly?",
    answer: (
      <>
        Every BOTPipes shipment is factory-complete and inspection-ready,
        including:
        <br />
        • Pressure test and weld certificates
        <br />
        • Material test and coating reports
        <br />
        • Fabrication and as-built drawings
        <br />
        • Dimensional verification records
        <br />
        • Quality compliance documentation
        <br />
        <br />
        We deliver everything you need for a plug-and-play installation.
      </>
    ),
  },
  {
    id: "3",
    title: "3. Do you provide installation support?",
    answer: (
      <>
        While we don&apos;t install systems directly, our technical support
        division assists throughout the process — from on-site guidance and
        installation training to troubleshooting and coordination. Our engineers
        ensure your team installs every assembly quickly, safely, and correctly
        — with zero welding required.
      </>
    ),
  },
  {
    id: "4",
    title: "4. What warranty do you offer?",
    answer: (
      <>
        We offer a 5-year manufacturer warranty on all prefabricated assemblies
        against defects in material and workmanship. The warranty includes
        replacement parts, technical support, and covers factory fabrication
        quality. Installation warranties are generally provided by the executing
        contractor.
      </>
    ),
  },
];

export type WithUndefined<T> = {
  [K in keyof T]: T[K] | undefined;
};

export function flatten(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}_${key}` : key;
      if (typeof value === "object" && value !== null) {
        Object.assign(acc, flatten(value as Record<string, unknown>, newKey));
      } else {
        acc[newKey] = value as string;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}
