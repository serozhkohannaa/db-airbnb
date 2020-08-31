interface paramI {
  property_type: string;
  cancellation_type: string;
  price: number;
  isHighScored: boolean;
  sortType: string;
}

export interface ParamsInterfaces {
  property_type: Array<paramI>;
  cancellation_policy: Array<paramI>;
  price: number;
  readonly isHighScored: boolean;
  readonly sortType: string;
}