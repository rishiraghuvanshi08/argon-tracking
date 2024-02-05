import { toast } from "react-toastify";
export const notify = (message) =>{
    toast(message, {
      position: "top-center",
      });
}
