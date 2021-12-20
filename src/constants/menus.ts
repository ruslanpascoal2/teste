import financeiro from "./../assets/icons/financeiro.svg";
import reservas from "./../assets/icons/reservas.svg";
import convites from "./../assets/icons/convites.svg";
import nautica from "./../assets/icons/nautica.svg";
import achados_e_perdidos from "./../assets/icons/achados_e_perdidos.svg";
import ouvidoria from "./../assets/icons/ouvidoria.svg";
import portal_da_transparencia from "./../assets/icons/portal_da_transparencia.svg";
import contato_e_redes_sociais from "./../assets/icons/contato_e_redes_sociais.svg";

interface Menu{
    icon: any,
    text: string,
    route: string
}

export const MENUS: Menu[] = [
    {route: '', icon: financeiro, text: 'Financeiro'},
    {route: '/reservas', icon: reservas, text: 'Reservas'},
    {route: '', icon: convites, text: 'Convites'},
    {route: '', icon: nautica, text: 'Náutica'},
    {route: '', icon: achados_e_perdidos, text: 'Achados e perdidos'},
    {route: '', icon: ouvidoria, text: 'Ouvidoria'},
    {route: '', icon: portal_da_transparencia, text: 'Portal da transparência'},
    {route: '', icon: contato_e_redes_sociais, text: 'Contato e redes sociais'},
]