import { PeriodicElement } from "./periodic_element.type";

export type ElementsState = { 
    elements: PeriodicElement[];
    filteredElements: PeriodicElement[];
    loader: boolean;
    search: string;
}