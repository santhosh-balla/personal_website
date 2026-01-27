 import type {ReactNode} from "react";


 //typescript contracts -> enforces how posts should look like
 export type TimelinePost = {
    
    title: string;
    date: Date;
    content: ReactNode; 


 }