import { toast } from "react-toastify";

const CatchErr = (err:({code?:string})) => {
    let code:string = err.code || "No Error Code"
    code = code.replace("auth/", "").replace("-", " ")
    toast.error(code)
};
export default CatchErr;