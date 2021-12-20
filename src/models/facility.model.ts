export interface Facility{
    iden: number,
    abreviacao: string,
    descricao: string,
    diurno: "DISPONÍVEL" | "OCUPADO",
    noturno: "DISPONÍVEL" | "OCUPADO",
}