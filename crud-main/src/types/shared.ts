type TLoading = boolean;
type TError = string | null;
type TToken = string | null;

type TProductIdWithToken = {
   _id: string,
   token: TToken,
}

type TSetFunc = (args: string) => void;

type TRegisterData =
   {
      username: string;
      email: string;
      password: string;
      role: string;
   }

type TLoginData =
   {
      email: string;
      password: string;
   }


export type { TError, TLoading, TToken, TProductIdWithToken, TSetFunc, TRegisterData, TLoginData };