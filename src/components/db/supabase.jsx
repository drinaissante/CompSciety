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

async function uploadCanva(exportUrl, progress) {
    if (!exportUrl) return null;

    const blob = await getBlob(exportUrl, progress)
    const fileName = `${Date.now()}.png`;

    const { data, error } = await supabase.storage.from("canva_exports").upload(fileName, blob, {
        contentType: 'image/png',
        upsert: true,
    });

    if (error) throw error;

    const { data: dataSigned, error: errorSigned } = await supabase.storage.from("canva_exports").createSignedUrl(data.path, 60);

    if (errorSigned) throw errorSigned;

    return dataSigned.signedUrl;
}

async function getProfileImageBlob(profile_link, progress) {
    const filePath = profile_link.split("/").pop();

    const { data, error } = await supabase.storage.from("profile_uploads").createSignedUrl(filePath, 60);

    if (error) throw error;

    const signedUrl = data.signedUrl;

    const blob = getBlob(signedUrl, progress);
    return blob;
}

async function getBlob(url, progress) {
    const response = await fetch(url);

    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;
    let loaded = 0;
    
    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        chunks.push(value);
        loaded += value.length;

        if (progress && total) {
            const percent = Math.round((loaded / total) * 100);
            progress(percent);
        }
    }

    const blob = new Blob(chunks, { type: "image/png"});

    return blob;
}


export { supabase, uploadVia, uploadCanva, getProfileImageBlob, getBlob };