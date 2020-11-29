import { Drug } from './drug';
import { MedOrder } from './medorder';

export interface Visit {
    currentDate: 'timestamp',
    visitId: string,
    createdDate: string,
    clinicName: string,
    doctorName: string,
    patientName: string,
    patientAge: string,
    patientGender: string,
    patientMobile: string,
    prescription: Array<Drug>,
    order: Array<MedOrder>,
    docEmail?: string,
    docClinic?: string,
    
    visitStatus: string,
    visitDate: Date,
    patientBloodGroup: string,
    patientLongtermIllness: string,
    patientLongtermMedicine: string,
    visitShortDescription: string,
    hasOrders: boolean,
    hasPrescriptions: boolean,
    isClosed: boolean
}