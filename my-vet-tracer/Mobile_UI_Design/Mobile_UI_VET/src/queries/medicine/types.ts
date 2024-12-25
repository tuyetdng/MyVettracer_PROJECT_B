export interface MedicineResponseType {
  idMed: number;
  medName: string;
  amount: string;
  notice: string;
  dose: string;
  total: number;
  pet: PetResponseType;
  vetUser: VetUserResponseType;
}

export interface PetResponseType {
  idPet: number;
}

export interface VetUserResponseType {
  idVetUser: number;
}