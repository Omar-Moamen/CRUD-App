import axios from "axios";
import axiosErrorHandler from "./axiosErrorHandler";

const sendFormDataHandler = async <T>(endPoint: string, formData: T) =>
{
   try
   {
      const response = await axios.post(`${endPoint}`, formData);
      return response.data;
   }
   catch (error)
   {
      axiosErrorHandler(error);
   }
}

export default sendFormDataHandler;