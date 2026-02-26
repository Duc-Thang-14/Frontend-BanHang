import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../services/authService";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpUser,
  });
};
