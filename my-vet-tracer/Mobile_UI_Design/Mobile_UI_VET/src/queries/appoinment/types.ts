export interface AppointmentResponseType {
    idAppointment: number;
    time: string; 
    ownerName: string;
    veterinarian: string;
    isConfirmed: number; // (1 || 0)
    pet: PetResponseType;
    vetUser: VetUserResponseType;
  }
  
  export interface PetResponseType {
    idPet: number;
  }
  
  export interface VetUserResponseType {
    idVetUser: number;
  }