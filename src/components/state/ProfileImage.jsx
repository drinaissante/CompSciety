import { useEffect, useState } from "react";
import { auth } from "../auth/firebase.jsx";
import { supabase } from "../db/supabase.jsx";
import { IoPersonCircle } from "react-icons/io5";

export default function ProfileImage({imageUrl, width = 80, height = 80, maxAgeMs = 55 * 60 * 1000}) {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        const cached = localStorage.getItem("cache");
        const cachedTime = localStorage.getItem("cache-time");

        if (cached && cachedTime && Date.now() - cachedTime < maxAgeMs) {
            setSrc(
                <img 
                    src={cached} 
                    alt="Image" 
                    className={`object-contain rounded-full border cursor-pointer`} 
                    style={{
                        width: `${width}px`,
                        height: `${height}px`
                    }}
                    draggable={false} 
                />
            );
            return;
        }

        // not cached
        (async () => {
            try {
                if (!auth || !auth.currentUser)
                    return;

                const key = imageUrl.split("/").pop();

                const { data, error } = await supabase.storage.from("profile_uploads").createSignedUrl(key, 60 * 60); // 1 hour signed url

                if (error) throw error;

                localStorage.setItem("cache", data.signedUrl);
                localStorage.setItem("cache-time", Date.now().toString());

                setSrc(
                    <img 
                        src={data.signedUrl} 
                        alt="Image" 
                        className={`object-contain rounded-full border cursor-pointer`} 
                        style={{
                            width: `${width}px`,
                            height: `${height}px`
                        }}
                        draggable={false} 
                    />
                );
            } catch (error) {
                console.error(error);

                setSrc(<IoPersonCircle size={120}/>);
            }
        })();
    }, [imageUrl]);

    return src;
}