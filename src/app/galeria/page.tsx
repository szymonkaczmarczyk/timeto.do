import type { Metadata } from 'next';
import GaleriaClient from '@/components/GaleriaClient';

export const metadata: Metadata = {
  title: 'Galeria Zespołu i Eventów',
  description: 'Zobacz naszą codzienność w obiektywie. Oficjalne zdjęcia zespołu TimeTo z konferencji, szkoleń oraz wspólnych chwil w biurze. Poznaj nas od kulis!',
  openGraph: {
    title: 'Galeria Zespołu i Eventów | TimeTo Performance Agency',
    description: 'Zobacz naszą codzienność w obiektywie. Oficjalne zdjęcia zespołu TimeTo z konferencji, szkoleń oraz wspólnych chwil w biurze. Poznaj nas od kulis!',
    url: 'https://timeto.do/galeria',
    siteName: 'TimeTo',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: 'https://timeto.do/wp-content/uploads/2026/03/TimeToDo.jpg',
        width: 1200,
        height: 630,
        alt: 'Zespół TimeTo w obiektywie',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galeria Zespołu i Eventów | TimeTo',
    description: 'Oficjalne zdjęcia zespołu TimeTo z konferencji, szkoleń oraz wspólnych chwil w biurze.',
  },
  alternates: {
    canonical: 'https://timeto.do/galeria',
  },
};


export default function GaleriaPage() {
  return <GaleriaClient />;
}
