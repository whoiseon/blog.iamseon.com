export interface User {
  avatar: string;
  email: string;
  name: string;
}

export interface SupabaseUserMeta {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}
