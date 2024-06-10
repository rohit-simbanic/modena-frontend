export interface PropertyImage {
  filename: string;
  url?: string;
}
export interface PreconstructedPropertyDetails {
  agent_id: number;
  name: string;
  category: string;
  price: string;
  available_for: "sale" | "lease";
  listing_id: string;
  property_description: string;
  property_image: PropertyImage;
  general_details: GeneralDetails;
}

export interface GeneralDetails {
  Price: string;
  Address: string;
  Rooms: string;
  Bedrooms: string;
}
