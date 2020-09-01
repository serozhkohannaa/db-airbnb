interface paramI {
  property_type: string;
  cancellation_type: string;
  price: number;
  isHighScored: boolean;
  sortPrice: number;
}

export interface ParamsInterfaces {
  property_type: Array<paramI>;
  cancellation_policy: Array<paramI>;
  price: number;
  readonly isHighScored: boolean;
  sortPrice: number;
}