import api from './api';

export const sendReservation = (values) => api.post('/reservations', values).then((r) => r.data);
export const sendEventEnquiry = (values) => api.post('/event-enquiries', values).then((r) => r.data);
export const sendEnquiry = (values) => api.post('/enquiries', values).then((r) => r.data);
