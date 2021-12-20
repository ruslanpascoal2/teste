import { Facility } from "./facility.model";

export interface FacilityReserve{
    dependencia: number,
    dataLocacao: string,
    periodo: "diurno" | "noturno",
    facility?: Facility
}