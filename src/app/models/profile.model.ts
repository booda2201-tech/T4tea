export interface UserProfile {
  id?: string | number;
  name?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  [key: string]: unknown;
}

/** Matches backend Address DTO from Postman */
export interface UserAddress {
  id?: string | number;
  label?: string;
  street?: string;
  city?: string;
  governorate?: string;
  postalCode?: string;
  notes?: string;
  userId?: string | number;
  /** UI aliases */
  fullName?: string;
  address?: string;
  phone?: string;
  isDefault?: boolean;
  [key: string]: unknown;
}

export interface AddressPayload {
  label: string;
  street: string;
  city: string;
  governorate: string;
  postalCode?: string;
  notes?: string;
  userId?: string | number;
  id?: string | number;
}
