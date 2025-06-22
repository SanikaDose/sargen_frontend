export interface EnquiryRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  organizationName: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}
