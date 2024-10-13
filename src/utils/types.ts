export interface ServiceUserType {
    firstName: string;
    lastName: string;
    typeOfUser: 'serviceuser' | 'team'
    dateOfBirth: string; // Consider using Date if you parse it
    ethnicity: string;
    gender: 'male' | 'female' | 'other';
    startDate: string; // Consider using Date if you parse it
    address: string;
    telephoneNumber: string;
    postalCode: string;
    emailAddress: string;
    id?: string; // Optional properties
    nfcTag?: string;
    pharmacy?: string;
    gpPractice?: string;
    gpContactNumber?: string;
    nextOfKin?: string;
    nextOfKinContactNumber?: string;
  }

  export interface TeamMemberType {
    firstName: string;
    lastName: string;
    typeOfUser: 'serviceuser' | 'team'
    dateOfBirth: string; // Consider using Date if you parse it
    ethnicity: string;
    gender: 'male' | 'female' | 'other';
    startDate: string; // Consider using Date if you parse it
    address: string;
    telephoneNumber: string;
    postalCode: string;
    emailAddress: string;
    id?: string; // Optional properties
    role?: string;
    manager?: string;
    logincode?: string;
    permission?: string;
  }
  