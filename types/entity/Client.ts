export interface Client {
  id: string;
  name: string;
  address: string;
  zipcode: string;
  country: string;
  city: string;
  siret: string;
}

export interface EditableClient {
  name?: string;
  address?: string;
  zipcode?: string;
  country?: string;
  city?: string;
  siret?: string;
}
