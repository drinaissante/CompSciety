import { createClient } from "@supabase/supabase-js"
import { shortImageKey } from "../../extras/Encrypt.jsx";

const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON,
)

const EDGE_FUNCTION_URL = import.meta.env.SUPA_UPLOAD_FUNC; 


async function upload(file) {
    if (!file) return null;

    try {
        const formData = new FormData();
        const deconstructed = await shortImageKey(file.name);

        formData.append('file', file);
        formData.append('filename', deconstructed);

        const res = await fetch(EDGE_FUNCTION_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${ANON}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || `Upload failed: ${res.status}`);
        }

        return data.publicUrl;
    } catch (error) {
        console.error(error);
    }

    return null;
}

export { supabase, upload };