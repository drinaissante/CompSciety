import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function ActionHandler() {
    const [params] = useSearchParams();
    const mode = params.get("mode");
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === "verifyEmail") 
            navigate(`/verify?${params.toString()}`);

        if (mode === "resetPassword") 
            navigate(`/resetpassword?${params.toString()}`);
    })

    return <p className="text-center font-bold text-white"> Invalid or unsupported action.</p>
}

export default ActionHandler;