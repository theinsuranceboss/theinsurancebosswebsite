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

/**
 * Fetches a public Google Drive folder page via CORS proxy and extracts all image IDs.
 * @param folderUrl The public sharing link of a Google Drive folder.
 * @returns Array of direct image stream URLs from that folder.
 */
export async function extractGoogleDriveFolderImages(folderUrl: string): Promise<string[]> {
  let folderId = "";
  const folderIdMatch = folderUrl.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderIdMatch && folderIdMatch[1]) {
    folderId = folderIdMatch[1];
  } else {
    const idParamMatch = folderUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idParamMatch && idParamMatch[1]) {
      folderId = idParamMatch[1];
    }
  }

  if (!folderId) {
    throw new Error("Could not extract folder ID from URL. Make sure it contains '/folders/FOLDER_ID' or '?id=FOLDER_ID'");
  }

  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://drive.google.com/drive/folders/${folderId}`)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error("Failed to access Google Drive folder page. Ensure the folder is public ('Anyone with the link can view').");
  }

  const html = await response.text();

  // Find all Google Drive file IDs mentioned in the page.
  const fileIdRegex = /\/file\/d\/([a-zA-Z0-9_-]{25,50})/g;
  const fileIds = new Set<string>();
  
  let match;
  while ((match = fileIdRegex.exec(html)) !== null) {
    if (match[1]) {
      fileIds.add(match[1]);
    }
  }

  // Fallback: search for standard Google Drive resource IDs in bootstrap/JSON blocks
  if (fileIds.size === 0) {
    const jsonIdRegex = /"([a-zA-Z0-9_-]{33})"/g;
    let matchJson;
    while ((matchJson = jsonIdRegex.exec(html)) !== null) {
      if (matchJson[1]) {
        fileIds.add(matchJson[1]);
      }
    }
  }

  if (fileIds.size === 0) {
    throw new Error("No files could be found in the folder. Please verify the folder contains files and is publicly shared.");
  }

  return Array.from(fileIds).map(id => `https://lh3.googleusercontent.com/d/${id}`);
}
