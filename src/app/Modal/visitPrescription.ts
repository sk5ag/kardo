export interface VisitPrescription {
    id: string,
    generic_name: string,
    strength: string,
    dosage_form: string,
    route:string,
    amount?: string,
    directionOfUse?: string,
    description?: string,
    isDispensed?: boolean
} 