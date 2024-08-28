type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';
type TError = string | null;

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


export type { TError, TLoading, TSetFunc, TRegisterData, TLoginData };