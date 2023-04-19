import { ReactNode } from "react";
import { Url } from "url";

export type RouterNodeType = {
    path: string;
    href: Url | string;
    target?: string;
    children: ReactNode;
 };