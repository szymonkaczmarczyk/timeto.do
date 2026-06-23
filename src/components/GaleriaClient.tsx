'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import OrbitImages from '@/components/OrbitImages';
import ImageTrail from '@/components/ImageTrail';
import Masonry from '@/components/Masonry';
import Link from 'next/link';

const images = [
  { url: 'https://timeto.do/wp-content/uploads/2026/03/TimeToDo-2.jpg', aspectRatio: 1334 / 2000 },
  { url: 'https://timeto.do/wp-content/uploads/2026/03/TimeToDo-4.jpg', aspectRatio: 2000 / 1333 },
  { url: 'https://timeto.do/wp-content/uploads/2026/03/TimeToDo.jpg', aspectRatio: 2000 / 1334 },
  { url: 'https://timeto.do/wp-content/uploads/2026/05/MicrosoftTeams-image-7.jpg', aspectRatio: 2000 / 1334 },
  { url: 'https://timeto.do/wp-content/uploads/2026/05/Timetodo_www7.jpg', aspectRatio: 2000 / 1332 },
];

const masonryItems = images.map((img, i) => ({
  id: String(i + 1),
  img: img.url,
  aspectRatio: img.aspectRatio,
}));

const orbitImages = [
  'https://timeto.do/wp-content/uploads/2026/03/TimeToDo.jpg',
  'https://timeto.do/wp-content/uploads/2026/03/TimeToDo-4.jpg',
  'https://timeto.do/wp-content/uploads/2026/05/MicrosoftTeams-image-7.jpg',
  'https://timeto.do/wp-content/uploads/2026/05/Timetodo_www7.jpg',
];

interface MasonryItem {
  id: string;
  img: string;
  height?: number;
}

export default function GaleriaClient() {
  const [activePhoto, setActivePhoto] = useState<MasonryItem | null>(null);

  const handlePhotoClick = (item: MasonryItem) => {
    setActivePhoto(item);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  return (
    <main className="relative min-h-screen bg-background select-none pb-24 overflow-x-hidden">
      <Navbar />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[350px] md:w-[650px] h-[350px] md:h-[650px] rounded-full bg-accent/10 dark:bg-accent/15 blur-[120px] animate-aurora-1" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[110px] animate-aurora-2" />
      </div>

      <section className="relative pt-54 md:pt-50 pb-[188px] z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
        <OrbitImages
          images={orbitImages}
          shape="ellipse"
          radiusX={460}
          radiusY={120}
          rotation={-5}
          duration={35}
          itemSize={128}
          responsive={true}
          aspectRatio="1400 / 550"
          showPath={false}
          centerContent={
            <div className="text-center max-w-4xl px-4 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative -top-[100px] inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-bg border border-card-border text-xs font-semibold text-accent mb-6 shadow-sm"
              >
                <Sparkles size={12} className="animate-pulse" />
                Fotorelacje z Życia Zespołu
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-heading leading-tight"
              >
                Nasza codzienność <br />
                <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">
                  w obiektywie
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="relative top-[140px] text-base md:text-lg text-text-muted leading-relaxed px-4 md:px-12"
              >
                Nie tylko dostarczamy mierzalne efekty biznesowe, ale tworzymy zgrany, zaangażowany zespół.
                Oto migawki z naszych konferencji, szkoleń oraz wspólnych chwil w biurze.
              </motion.p>
            </div>
          }
        />
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Interakcja</span>
            <h2 className="text-3xl font-extrabold font-heading mt-1">
              Odkrywaj ruchami myszy
            </h2>
          </div>
        </div>

        <div className="relative w-full h-[550px] rounded-3xl border border-card-border bg-gradient-to-br from-card-bg/30 to-card-bg/10 backdrop-blur-sm overflow-hidden flex items-center justify-center cursor-crosshair group shadow-inner">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <ImageTrail items={images.map(img => img.url)} variant={2} />
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Album</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mt-1">
            Galeria wspomnień
          </h2>
          <p className="text-sm text-text-muted mt-2 max-w-xl">
            Kliknij na dowolne zdjęcie z konferencji, aby powiększyć je w pełnym kadrze.
          </p>
        </div>

        <Masonry
          items={masonryItems}
          gap={24}
          animateFrom="bottom"
          blurToFocus={true}
          scaleOnHover={true}
          hoverScale={0.96}
          onItemClick={handlePhotoClick}
        />
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 mb-8">
        <div className="p-8 md:p-12 rounded-3xl border border-card-border bg-card-bg/50 backdrop-blur-md relative overflow-hidden flex flex-col items-center">
          <h3 className="text-2xl font-bold font-heading mb-4">Efekt to dla nas standard</h3>
          <p className="text-text-muted text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            Nasz zespół łączy pasję to nowoczesnego marketingu, automatyzacji i precyzyjnej analityki.
            Poznaj naszą ofertę i stwórzmy wspólnie kolejną udaną historię.
          </p>
          <Link href="/">
            <button className="px-6 py-3.5 bg-foreground text-background font-semibold rounded-full hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer">
              Wróć do strony głównej
              <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300 cursor-pointer z-50 focus:outline-none"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center select-none overflow-hidden rounded-3xl"
            >
              <img
                src={activePhoto.img}
                alt="Powiększone zdjęcie"
                className="max-w-full max-h-[85vh] object-contain rounded-3xl border border-white/10 shadow-2xl"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
