export interface VaccineResponseType {
  idVac: number;
  vacName: string;
  date: string;
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