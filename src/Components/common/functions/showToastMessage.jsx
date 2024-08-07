import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastMessage = (status, message) => {
    console.log(status, message);
    const options = {
        position: 'bottom-right',
        draggable: true,
    }
    if (status===200){
        toast.success(message, options);
    }
    else if (status===100){
        toast.info(message,options)
    }
    else if (status===300){
        toast.warning(message,options)
    }
    else{
        toast.error(message,options)
    }
  };