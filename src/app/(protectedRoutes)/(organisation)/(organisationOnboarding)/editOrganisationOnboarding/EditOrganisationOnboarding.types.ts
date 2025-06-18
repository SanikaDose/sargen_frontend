export interface OrgPayload {
  companyName: string;
  website: string;
  gstin: string;
  revenue: string;
  about: string;
  numberOfEmployees: string;
}


export type OrgOnboard = {
   companyName: string,
      website: string,
      gstin: string,
      country: string,
      revenue: number,
      uom: string,
      numberOfEmployees: number,
      about: string
};

export interface getOrgPayload {
  message: string;
  success: boolean;
  data: {
    country: string;
    uom: string;
    userLogo: any;
    name: string;
    website: string;
    gstin: string;
    revenue: string;
    about: string;
    numberOfEmployees: string;
  };
}

export interface PocPayload {
  message: string;
  success: boolean;
  data: {
    firstName: string;
    lastName: string;
    employeeId: string;
    email: string;
    contactNumber: string;
    designation: string;
  };
}