export interface Appointment {
    currentDate: 'timestamp',
    clinicName: string,
    userName: string,
    appointmentStatus: boolean,
    appointmentDate: Date,
    appointmentDoctor: '',
    patientName: string,
    patientAge: number,
    patientGender: string,
    patientMobile: string,
    isWaiting: boolean
}