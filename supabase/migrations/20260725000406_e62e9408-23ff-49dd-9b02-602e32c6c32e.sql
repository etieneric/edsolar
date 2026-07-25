ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS popularity integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS warranty text,
  ADD COLUMN IF NOT EXISTS price_amount integer;