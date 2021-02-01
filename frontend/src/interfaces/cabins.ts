export interface Booking {
  id: string;
  firstname: string;
  surname: string;
  phone: number;
  receiverEmail: string;
  bookFrom: string;
  bookTo: string;
  price: number;
}

export interface Cabin {
  id: string;
  name: string;
}

export interface BookingFromTo {
  from: Date;
  to: Date;
}

export interface QueryVariables {
  year: string;
  month: string;
  start?: string;
  end?: string;
}

export interface ContractProps {
  contractData: {
    firstname: string;
    surname: string;
    cabins: string[];
    fromDate: string;
    toDate: string;
    price: number;
  };
}

export interface SummaryProps {
  from: string;
  to: string;
  cabins: string[];
  price: number;
  nights: number;
}
