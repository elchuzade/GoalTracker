type SignupData = {
  email: string;
  password: string;
  password2: string;
}

type SignupFunction = (data: SignupData) => void

type jwtDecode = {
  id: string;
  permission: number;
  profile: string;
  iat: number;
  exp: number
}