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

async function uploadCanva(exportUrl) {
    if (!exportUrl) return null;

    const response = await fetch(exportUrl);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    const blob = await response.blob();

    const fileName = `${Date.now()}.png`;

    const { data, error } = await supabase.storage.from("canva_exports").upload(fileName, blob, {
        contentType: blob.type || 'image/png',
        upsert: true,
    });

    if (error) throw error;

    const { data: publicUrl} = supabase.storage.from("canva_exports").getPublicUrl(fileName);

    return publicUrl.publicUrl;
}

export { supabase, uploadVia, uploadCanva };