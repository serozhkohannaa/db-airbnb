interface paramI {
  property_type: string;
  cancellation_type: string;
}

export interface ParamsInterfaces {
  propertyTypes: Array<paramI>;
  cancellation_policy: Array<paramI>;
}