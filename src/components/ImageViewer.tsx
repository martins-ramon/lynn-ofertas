import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Focus, ZoomIn, ZoomOut } from 'lucide-react';
import { BrandLockup } from './Brand';
import { Modal } from './Shared';

export interface ReferenceImage {
  id: string;
  title: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  file: string;
}

export default function ImageViewer<T extends ReferenceImage>({ screen, screens, label, onScreen, onClose }: { screen: T; screens: T[]; label: string; onScreen: (screen: T) => void; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const viewer = useRef<HTMLDivElement>(null);
  const index = screens.findIndex(item => item.id === screen.id);
  const go = (next: number) => {
    setZoomed(false);
    viewer.current?.scrollTo({ top: 0, left: 0 });
    onScreen(screens[next]);
  };
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (zoomed) return;
      if (event.key === 'ArrowRight' && index < screens.length - 1) { event.preventDefault(); onScreen(screens[index + 1]); }
      if (event.key === 'ArrowLeft' && index > 0) { event.preventDefault(); onScreen(screens[index - 1]); }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [index, onScreen, screens, zoomed]);
  return <Modal titleId="product-lightbox-title" onClose={onClose} className="product-lightbox">
    <div className="product-lightbox-header"><BrandLockup /><span className="micro">{label} · {index + 1} / {screens.length}</span></div>
    <h2 id="product-lightbox-title">{screen.title}</h2>
    <div className="product-lightbox-viewer" ref={viewer} tabIndex={0} role="region" aria-label={zoomed ? 'Imagem em tamanho original. Use as setas ou a rolagem para explorar.' : 'Imagem ajustada à tela.'}>
      <img key={screen.id} className={zoomed ? 'image-original-size' : 'image-fit'} style={zoomed ? { width: screen.width, height: screen.height } : undefined} src={`/media/${screen.id}.webp`} width={screen.width} height={screen.height} alt={screen.alt} />
    </div>
    <div className="product-lightbox-description"><p>{screen.caption}</p><span>Captura de referência · {screen.file}</span></div>
    <div className="product-lightbox-controls"><div><button className="icon-button" disabled={index === 0} aria-label="Tela anterior" onClick={() => go(index - 1)}><ArrowLeft size={18} /></button><button className="icon-button" disabled={index === screens.length - 1} aria-label="Próxima tela" onClick={() => go(index + 1)}><ArrowRight size={18} /></button><span>{index + 1} de {screens.length}</span></div><button className="button outline" aria-pressed={zoomed} onClick={() => { setZoomed(!zoomed); viewer.current?.scrollTo({ top: 0, left: 0 }); }}>{zoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}{zoomed ? 'Ajustar à tela' : 'Ver tamanho original'}<Focus size={14} /></button></div>
  </Modal>;
}
