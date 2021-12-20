export interface Profile{
        email?: string,
        correspondencia?: boolean,
        carne?: boolean,
        enderecoResidencial?: {
            endereco: string,
            bairro: string,
            cidade: string,
            uf: string,
            cep: string,
            telefone: string
        },
        enderecoComercial?: {
            endereco: string,
            bairro: string,
            cidade: string,
            uf: string,
            cep: string,
            telefone: string
        },
        dependentes?: []
    
}

export interface ChangePassword{
    idenUsu: number, 
    senhaAntig: string,
    senhaNova: string,
    confirSenha: string
}