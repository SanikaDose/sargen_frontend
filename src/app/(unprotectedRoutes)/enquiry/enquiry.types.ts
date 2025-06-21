export interface EnquiryRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}
