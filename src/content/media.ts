import containerFallback from '../assets/media/homepage/container-yard.jpg';
import containerWebp800 from '../assets/media/homepage/container-yard-800.webp';
import containerWebp from '../assets/media/homepage/container-yard-1200.webp';
import containerWebp2000 from '../assets/media/homepage/container-yard-2000.webp';
import containerAvif800 from '../assets/media/homepage/container-yard-800.avif';
import containerAvif from '../assets/media/homepage/container-yard-1200.avif';
import containerAvif2000 from '../assets/media/homepage/container-yard-2000.avif';
import portFallback from '../assets/media/logistics/cargo-port.jpg';
import portWebp800 from '../assets/media/logistics/cargo-port-800.webp';
import portWebp from '../assets/media/logistics/cargo-port-1200.webp';
import portWebp2000 from '../assets/media/logistics/cargo-port-2000.webp';
import portAvif800 from '../assets/media/logistics/cargo-port-800.avif';
import portAvif from '../assets/media/logistics/cargo-port-1200.avif';
import portAvif2000 from '../assets/media/logistics/cargo-port-2000.avif';
import componentsFallback from '../assets/media/sourcing/industrial-components.jpg';
import componentsWebp800 from '../assets/media/sourcing/industrial-components-800.webp';
import componentsWebp from '../assets/media/sourcing/industrial-components-1200.webp';
import componentsWebp2000 from '../assets/media/sourcing/industrial-components-2000.webp';
import componentsAvif800 from '../assets/media/sourcing/industrial-components-800.avif';
import componentsAvif from '../assets/media/sourcing/industrial-components-1200.avif';
import componentsAvif2000 from '../assets/media/sourcing/industrial-components-2000.avif';
import equipmentFallback from '../assets/media/iot/connected-equipment.jpg';
import equipmentWebp800 from '../assets/media/iot/connected-equipment-800.webp';
import equipmentWebp from '../assets/media/iot/connected-equipment-1200.webp';
import equipmentWebp2000 from '../assets/media/iot/connected-equipment-2000.webp';
import equipmentAvif800 from '../assets/media/iot/connected-equipment-800.avif';
import equipmentAvif from '../assets/media/iot/connected-equipment-1200.avif';
import equipmentAvif2000 from '../assets/media/iot/connected-equipment-2000.avif';
import medicalFallback from '../assets/media/medical/sterile-instruments.jpg';
import medicalWebp800 from '../assets/media/medical/sterile-instruments-800.webp';
import medicalWebp from '../assets/media/medical/sterile-instruments-1200.webp';
import medicalWebp2000 from '../assets/media/medical/sterile-instruments-2000.webp';
import medicalAvif800 from '../assets/media/medical/sterile-instruments-800.avif';
import medicalAvif from '../assets/media/medical/sterile-instruments-1200.avif';
import medicalAvif2000 from '../assets/media/medical/sterile-instruments-2000.avif';
const widths = [800, 1200, 2000] as const;
const srcset = (sources: readonly { src: string }[]) => sources.map((source, index) => `${source.src} ${widths[index]}w`).join(', ');
export const editorialMedia = {
  containerYard: { fallback: containerFallback, webp: srcset([containerWebp800, containerWebp, containerWebp2000]), avif: srcset([containerAvif800, containerAvif, containerAvif2000]), alt: 'Aerial view of organized shipping containers and access lanes at a port terminal.', width: 2000, height: 1123 },
  cargoPort: { fallback: portFallback, webp: srcset([portWebp800, portWebp, portWebp2000]), avif: srcset([portAvif800, portAvif, portAvif2000]), alt: 'Aerial view of a cargo port with containers, cranes and rail connections.', width: 2000, height: 1500 },
  industrialComponents: { fallback: componentsFallback, webp: srcset([componentsWebp800, componentsWebp, componentsWebp2000]), avif: srcset([componentsAvif800, componentsAvif, componentsAvif2000]), alt: 'Monochrome close-up of connected industrial machinery and hydraulic components.', width: 2000, height: 3000 },
  connectedEquipment: { fallback: equipmentFallback, webp: srcset([equipmentWebp800, equipmentWebp, equipmentWebp2000]), avif: srcset([equipmentAvif800, equipmentAvif, equipmentAvif2000]), alt: 'Close-up of wiring, chain and mechanical parts inside industrial equipment.', width: 2000, height: 1600 },
  sterileInstruments: { fallback: medicalFallback, webp: srcset([medicalWebp800, medicalWebp, medicalWebp2000]), avif: srcset([medicalAvif800, medicalAvif, medicalAvif2000]), alt: 'Close-up of sterile surgical instruments arranged on a clean table.', width: 2000, height: 3000 },
} as const;
export type EditorialMedia = (typeof editorialMedia)[keyof typeof editorialMedia];
