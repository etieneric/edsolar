
-- reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Public can submit reviews" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (approved = false);

-- gallery table
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;
GRANT ALL ON public.gallery_photos TO service_role;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads gallery" ON public.gallery_photos FOR SELECT TO anon, authenticated USING (true);

-- kits table
CREATE TABLE public.kits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  price TEXT,
  image_url TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.kits TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kits TO authenticated;
GRANT ALL ON public.kits TO service_role;
ALTER TABLE public.kits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads kits" ON public.kits FOR SELECT TO anon, authenticated USING (true);

-- seed default kits
INSERT INTO public.kits (slug, title, subtitle, description, price, features, sort_order) VALUES
('kit-prestige', 'Kit Prestige', 'Confort haut de gamme pour villas et grandes résidences',
 'Solution solaire premium conçue pour alimenter climatiseurs, appareils électroménagers et éclairage LED d''une villa ou d''une grande maison sans coupure.',
 'À partir de 2 500 000 FCFA',
 '["Onduleur hybride 8 kVA / 48V","2 batteries lithium 48V 400Ah","12 panneaux 450W","Autonomie 24h","Installation & mise en service incluses"]'::jsonb, 1),
('kit-congelateur', 'Kit Congélateur', 'Solution dédiée aux commerces et poissonneries',
 'Kit spécifiquement dimensionné pour maintenir un ou plusieurs congélateurs en fonctionnement continu, idéal pour boutiques, poissonneries et restaurants.',
 'À partir de 1 000 000 FCFA',
 '["Onduleur 2 kVA / 24V","Batterie lithium 25.6V 200Ah","4 panneaux 450W","Autonomie 12h","Protection surtension"]'::jsonb, 2),
('kit-filet-bleu', 'Kit Filet Bleu', 'Solution économique essentielle',
 'Kit d''entrée de gamme parfait pour l''éclairage, la télévision et la recharge d''appareils dans une petite maison ou un studio.',
 'À partir de 500 000 FCFA',
 '["Onduleur 1 kVA / 12V","Batterie lithium 25.6V 100Ah","2 panneaux 450W","Éclairage LED + TV + Ventilateur","Installation incluse"]'::jsonb, 3);
