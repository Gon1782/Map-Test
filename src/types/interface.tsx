export interface Data {
  resultMsg: string;
  totalCount: number;
  pageNo: number;
  resultCode: string;
  numOfRows: number;
  items: {
    item: Item[];
  };
}

export interface Result {
  address: Address;
  road_address: string | null;
}

export interface Address {
  address_name: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  zip_code: string;
}

export interface Item {
  [key: string]: string;
}

export interface Zcode {
  [key: string]: string;
}
