export const SUPABASE_URL = "https://cbtzxyyaukurziljqjuz.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidHp4eXlhdWt1cnppbGpxanV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODIzNTMsImV4cCI6MjA5NjI1ODM1M30.NirUq7jZLuqqU6aN2qxgt4uJjfN3gG6cWOkpzBdVj_s";

/**
 * Uploads a file directly to the Supabase Storage public 'banners' bucket.
 * Generates a unique filename using timestamp and random string to prevent filename collisions.
 * @param file The file object selected from a file input.
 * @returns The public URL of the uploaded asset.
 */
export async function uploadToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop() || "jpg";
  const uniqueId = Math.random().toString(36).substring(2, 15);
  const fileName = `${Date.now()}_${uniqueId}.${fileExt}`;
  
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/banners/${fileName}`;
  
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": file.type,
    },
    body: file,
  });
  
  if (!response.ok) {
    const errText = await response.text();
    let parsedError;
    try {
      parsedError = JSON.parse(errText);
    } catch {
      parsedError = { message: errText };
    }
    
    if (parsedError.message === "Bucket not found" || parsedError.error === "Bucket not found") {
      throw new Error("Supabase Storage bucket 'banners' does not exist. Please create a public bucket named 'banners' in your Supabase dashboard Storage section.");
    }
    throw new Error(parsedError.message || parsedError.error || `Upload failed (Status ${response.status})`);
  }
  
  return `${SUPABASE_URL}/storage/v1/object/public/banners/${fileName}`;
}
