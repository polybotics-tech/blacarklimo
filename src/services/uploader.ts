import sharp from "sharp";
import { randomUUID } from "crypto";

import constants from "@/src/libs/constants";
import { supabase } from "@/src/utils/supabase";

export async function validateUploadedFileAsPhoto(
  file: any,
): Promise<{ error: string | null }> {
  if (!(file instanceof File)) {
    return { error: "No image detected in upload" };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      error: "Only JPG, PNG and WEBP images are allowed.",
    };
  }

  if (file.size > constants.photoUpload.MAX_FILE_SIZE) {
    return {
      error: "Image must not exceed 5MB.",
    };
  }

  return { error: null };
}

export async function convertFileToBuffer(
  file: File,
): Promise<Buffer<ArrayBuffer>> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return buffer;
}

export async function resizeImageSizeByBuffer(
  buffer: Buffer<ArrayBuffer>,
): Promise<Buffer<ArrayBuffer>> {
  const resizedBuffer = await sharp(buffer)
    .resize({
      width: constants.photoUpload.MAX_WIDTH,
      height: constants.photoUpload.MAX_HEIGHT,

      fit: "inside",

      withoutEnlargement: true,
    })
    .webp({
      quality: 85,
    })
    .toBuffer();

  return resizedBuffer;
}

export async function uploadImageBufferToStorage(
  directory: string,
  buffer: Buffer<ArrayBuffer>,
  bucket: string | undefined,
): Promise<{ error: string; uri: null } | { error: null; uri: string }> {
  //--RENAME FILE NAME
  const extension = ".webp";
  const filename =
    directory + "/" + `${Date.now()}-${randomUUID()}` + extension;

  //--FORCE CONVERT BUFFER TO FILE
  const blob = new Blob([buffer], {
    type: "image/webp",
  });

  //--UPLOAD TO SUPABASE
  const { error: uploadError } = await supabase.storage
    .from(bucket!)
    .upload(filename, blob, {
      contentType: "image/webp",
      upsert: false,
    });

  if (uploadError) {
    console.log("uploadError: ", uploadError);
    return {
      error: uploadError?.message ?? "Unable to upload vehicle image",
      uri: null,
    };
  }

  //--GET PUBLIC IMAGE URI
  const { data } = supabase.storage.from(bucket!).getPublicUrl(filename);

  return { error: null, uri: data.publicUrl };
}

export async function deleteImageFromStorageByUri(
  directory: string,
  uri: string,
  bucket: string | undefined,
) {
  const oldFilename = uri.split(`/${directory}/`).pop();

  if (oldFilename) {
    await supabase.storage
      .from(bucket!)
      .remove([`${directory}/${oldFilename}`]);
  }
}
