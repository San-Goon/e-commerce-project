export type GetMeReturnType = {
  id: number;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  profile: string;
  gender: string;
  age: number;
};

export type PatchMeType = Partial<GetMeReturnType>;

export type PostRefreshTokenType = {
  access: string;
  refresh: string;
};

export type PostSocialLoginBodyType = {
  code: string;
  state: string;
};

export type PostSocialLoginReturnType = {
  isRegister: boolean;
  socialToken?: string;
  access?: string;
  refresh?: string;
};

export type PostRegisterBodyType = {
  socialToken: string;
  email: string;
  phone: string;
  name: string;
  nickname: string;
  profilePath: string;
  gender?: string;
  age?: number;
  marketingAdAgree: boolean;
};

export type PostRegisterReturnType = {
  id: number;
  profile: string;
  marketingAdAgree: boolean;
  access: string;
  refresh: string;
};

export type PostWithdrawReasonType = {
  reason: string;
  additionalReason?: string;
};
