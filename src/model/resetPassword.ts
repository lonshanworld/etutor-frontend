export type OTP = {
  message: string;
  otp?: string;
};

export function otpFromJson(jsonData: any) {
  const otp: OTP = {
    message: jsonData.message,
    otp: jsonData.data.otp,
  };

  return otp;
}

export type ConfirmOtp = {
  message: string;
  status?: boolean;
  emailError?: string;
  otpError?: string;
};

export function confirmOtpFromJson(jsonData: any) {
  const confirmOtp: ConfirmOtp = {
    message: jsonData.message,
    status: jsonData.data.status,
    emailError: jsonData.errors?.email,
    otpError: jsonData.errors?.otp,
  };

  return confirmOtp;
}

export type ResetPassword = {
  message: string;
};

export function resetPasswordFromJson(jsonData: any) {
  const resetPassword: ResetPassword = {
    message: jsonData.message,
  };

  return resetPassword;
}
