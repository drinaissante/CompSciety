import { createClient } from "@supabase/supabase-js"
import { shortImageKey } from "../../extras/Encrypt.jsx";

const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON,
)


async function uploadVia(file) {
    if (!file) return null;

    const filePath = await shortImageKey(file.name);

    const { data, error } = await supabase.storage.from("profile_uploads").upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage.from("profile_uploads").getPublicUrl(filePath);

    return publicUrl.publicUrl;
}

export { supabase, uploadVia };