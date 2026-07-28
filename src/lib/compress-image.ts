/**
 * Compression d'image côté navigateur avant envoi.
 * Redimensionne (max 1000px) et convertit en WebP qualité 80.
 * Objectif : réduire fortement le poids stocké et la bande passante.
 */
export async function compressImage(
  file: File,
  maxSize = 1000,
  quality = 0.8,
): Promise<{ blob: Blob; filename: string; contentType: string }> {
  const baseName = (file.name.replace(/\.[^.]+$/, "") || "image").slice(0, 60);
  const fallback = { blob: file as Blob, filename: file.name, contentType: file.type || "image/jpeg" };

  if (typeof window === "undefined" || file.type === "image/svg+xml") return fallback;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return fallback;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality),
    );
    if (!blob || blob.size === 0) return fallback;

    // Si la compression n'apporte rien, on garde l'original.
    if (blob.size >= file.size && scale === 1) return fallback;

    return { blob, filename: `${baseName}.webp`, contentType: "image/webp" };
  } catch {
    return fallback;
  }
}
