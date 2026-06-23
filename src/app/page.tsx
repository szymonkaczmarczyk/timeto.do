import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Timeto | Agencja Performance Marketingu — Leady, Konwersje, ROAS',
  description: 'Liczą się efekty, nie deklaracje. Jesteśmy agencją performance, która wspiera marki w planowaniu, realizacji i skalowaniu kampanii nastawionych na wynik. E-mail, SMS, Display, Push.',
  keywords: [
    'agencja performance',
    'performance marketing',
    'lead generation',
    'kampanie e-mail',
    'SMS marketing',
    'display advertising',
    'ROAS',
    'generowanie leadów',
    'agencja marketingowa Polska',
    'kampanie reklamowe',
    'timeto',
  ],
  openGraph: {
    title: 'Timeto | Agencja Performance Marketingu — Leady, Konwersje, ROAS',
    description: 'Liczą się efekty, nie deklaracje. Jesteśmy agencją performance, która wspiera marki w planowaniu, realizacji i skalowaniu kampanii nastawionych na wynik.',
    url: 'https://timeto.do',
    siteName: 'Timeto',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: 'https://timeto.do/wp-content/uploads/2026/03/TimeToDo.jpg',
        width: 1200,
        height: 630,
        alt: 'Timeto — Agencja Performance Marketingu',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timeto | Agencja Performance Marketingu',
    description: 'Liczą się efekty, nie deklaracje. Wspieramy marki w planowaniu, realizacji i skalowaniu kampanii nastawionych na wynik.',
  },
  alternates: {
    canonical: 'https://timeto.do',
  },
};

export default function Home() {
  return <HomeClient />;
}
