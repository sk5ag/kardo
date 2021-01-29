export interface Drug {
    id: string,
    generic_name: string,
    strength: string,
    ingredient: string,
    dosage_form: string,
    route:string,
    description?: string,
    warnings?: string
} 