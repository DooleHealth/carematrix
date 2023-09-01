export interface ItemForm {
    data: any,
    id?: string,
    desactive?: boolean
}

export interface Form {
     id?: string,
     options?: any,
     layout?: any,
     data?: any,
     conditions?: any,
     translate?: any,
     validation?: any,
     required?: boolean,
     index?: number
     html?: string,
     type?: string,
     tooltip?: string,
     require?: string,
     label?: string,
     hidden: boolean,
     placeholder?: string,
     name?: string,
     userLang?: string,
     bioquimic?: any
}