export async function getUserToken(): Promise<string>
{
   const localData = localStorage.getItem("persist:auth");
   const tokenWithQuotes = await JSON.parse(localData!).token;
   const token = await tokenWithQuotes.match(/[?=(\w*|.|\-)]/igm).join('');

   return token;
}