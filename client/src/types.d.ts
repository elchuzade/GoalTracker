type SignupData = {
  email: string;
  password: string;
  password2: string;
}

type SigninData = {
  email: string;
  password: string;
}

type SigninResponse = {
  success: boolean;
  token: string;
}

type SignupFunction = (data: SignupData) => void
type SigninFunction = (data: SigninData) => void

type jwtDecode = {
  id: string;
  permission: number;
  profile: string;
  iat: number;
  exp: number
}

type reducerAction = {
  type: string;
  payload: object
}