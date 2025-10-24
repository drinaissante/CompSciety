import { createClient } from "@supabase/supabase-js"
import { shortImageKey } from "../../extras/Encrypt.jsx";

// const supabase = createClient(
//     import.meta.env.SUPABASE_URL,
//     import.meta.env.SUPABASE_ANON,
// )

const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0dWp4emFpaGZrYnh5Z2tjeW1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTI5NDEwNSwiZXhwIjoyMDc2ODcwMTA1fQ.soTzGQgNaCJ-V2CUOBNOLXN6EkaOS_5vYEAM9cDVOwM";

const supabase = createClient(
    "https://wokgjmkdsrdpuivgvyuj.supabase.co",
    ANON,
)

const EDGE_FUNCTION_URL = 'https://ptujxzaihfkbxygkcymq.supabase.co/functions/v1/upload'; 



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