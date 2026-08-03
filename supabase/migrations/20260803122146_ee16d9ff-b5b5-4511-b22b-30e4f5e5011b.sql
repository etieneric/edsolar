ALTER TABLE public.gallery_photos
  ADD COLUMN IF NOT EXISTS location text NOT NULL DEFAULT 'Cameroun',
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'realisations';