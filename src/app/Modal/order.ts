export interface Order {
    currentDate: 'timestamp',
    createdDate: string,
    clinicName: string,
    visitId: string,
    orderStatus: string,
    orderDate: Date,
    orderingDoctor: string,
    orderTitle: string,
    orderDescription: string,
    orderComment: string,
    isComplete: boolean
}