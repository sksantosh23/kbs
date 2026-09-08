import containerFallback from '../assets/media/homepage/container-yard.jpg';
import containerWebp480 from '../assets/media/homepage/container-yard-480.webp';
import containerWebp640 from '../assets/media/homepage/container-yard-640.webp';
import containerWebp800 from '../assets/media/homepage/container-yard-800.webp';
import containerWebp from '../assets/media/homepage/container-yard-1200.webp';
import containerWebp2000 from '../assets/media/homepage/container-yard-2000.webp';
import containerAvif480 from '../assets/media/homepage/container-yard-480.avif';
import containerAvif640 from '../assets/media/homepage/container-yard-640.avif';
import containerAvif800 from '../assets/media/homepage/container-yard-800.avif';
import containerAvif from '../assets/media/homepage/container-yard-1200.avif';
import containerAvif2000 from '../assets/media/homepage/container-yard-2000.avif';
import portFallback from '../assets/media/logistics/cargo-port.jpg';
import portWebp480 from '../assets/media/logistics/cargo-port-480.webp';
import portWebp640 from '../assets/media/logistics/cargo-port-640.webp';
import portWebp800 from '../assets/media/logistics/cargo-port-800.webp';
import portWebp from '../assets/media/logistics/cargo-port-1200.webp';
import portWebp2000 from '../assets/media/logistics/cargo-port-2000.webp';
import portAvif480 from '../assets/media/logistics/cargo-port-480.avif';
import portAvif640 from '../assets/media/logistics/cargo-port-640.avif';
import portAvif800 from '../assets/media/logistics/cargo-port-800.avif';
import portAvif from '../assets/media/logistics/cargo-port-1200.avif';
import portAvif2000 from '../assets/media/logistics/cargo-port-2000.avif';
import componentsFallback from '../assets/media/sourcing/industrial-components.jpg';
import componentsWebp480 from '../assets/media/sourcing/industrial-components-480.webp';
import componentsWebp640 from '../assets/media/sourcing/industrial-components-640.webp';
import componentsWebp800 from '../assets/media/sourcing/industrial-components-800.webp';
import componentsWebp from '../assets/media/sourcing/industrial-components-1200.webp';
import componentsWebp2000 from '../assets/media/sourcing/industrial-components-2000.webp';
import componentsAvif480 from '../assets/media/sourcing/industrial-components-480.avif';
import componentsAvif640 from '../assets/media/sourcing/industrial-components-640.avif';
import componentsAvif800 from '../assets/media/sourcing/industrial-components-800.avif';
import componentsAvif from '../assets/media/sourcing/industrial-components-1200.avif';
import componentsAvif2000 from '../assets/media/sourcing/industrial-components-2000.avif';
import equipmentFallback from '../assets/media/iot/connected-equipment.jpg';
import equipmentWebp480 from '../assets/media/iot/connected-equipment-480.webp';
import equipmentWebp640 from '../assets/media/iot/connected-equipment-640.webp';
import equipmentWebp800 from '../assets/media/iot/connected-equipment-800.webp';
import equipmentWebp from '../assets/media/iot/connected-equipment-1200.webp';
import equipmentWebp2000 from '../assets/media/iot/connected-equipment-2000.webp';
import equipmentAvif480 from '../assets/media/iot/connected-equipment-480.avif';
import equipmentAvif640 from '../assets/media/iot/connected-equipment-640.avif';
import equipmentAvif800 from '../assets/media/iot/connected-equipment-800.avif';
import equipmentAvif from '../assets/media/iot/connected-equipment-1200.avif';
import equipmentAvif2000 from '../assets/media/iot/connected-equipment-2000.avif';
import medicalFallback from '../assets/media/medical/sterile-instruments.jpg';
import medicalWebp480 from '../assets/media/medical/sterile-instruments-480.webp';
import medicalWebp640 from '../assets/media/medical/sterile-instruments-640.webp';
import medicalWebp800 from '../assets/media/medical/sterile-instruments-800.webp';
import medicalWebp from '../assets/media/medical/sterile-instruments-1200.webp';
import medicalWebp2000 from '../assets/media/medical/sterile-instruments-2000.webp';
import medicalAvif480 from '../assets/media/medical/sterile-instruments-480.avif';
import medicalAvif640 from '../assets/media/medical/sterile-instruments-640.avif';
import medicalAvif800 from '../assets/media/medical/sterile-instruments-800.avif';
import medicalAvif from '../assets/media/medical/sterile-instruments-1200.avif';
import medicalAvif2000 from '../assets/media/medical/sterile-instruments-2000.avif';
const widths = [480, 640, 800, 1200, 2000] as const;
const srcset = (sources: readonly { src: string }[]) => sources.map((source, index) => `${source.src} ${widths[index]}w`).join(', ');
export const editorialMedia = {
  containerYard: { fallback: containerFallback, webp: srcset([containerWebp480, containerWebp640, containerWebp800, containerWebp, containerWebp2000]), avif: srcset([containerAvif480, containerAvif640, containerAvif800, containerAvif, containerAvif2000]), alt: 'Aerial view of organized shipping containers and access lanes at a port terminal.', width: 2000, height: 1123 },
  cargoPort: { fallback: portFallback, webp: srcset([portWebp480, portWebp640, portWebp800, portWebp, portWebp2000]), avif: srcset([portAvif480, portAvif640, portAvif800, portAvif, portAvif2000]), alt: 'Aerial view of a cargo port with containers, cranes and rail connections.', width: 2000, height: 1500 },
  industrialComponents: { fallback: componentsFallback, webp: srcset([componentsWebp480, componentsWebp640, componentsWebp800, componentsWebp, componentsWebp2000]), avif: srcset([componentsAvif480, componentsAvif640, componentsAvif800, componentsAvif, componentsAvif2000]), alt: 'Monochrome close-up of connected industrial machinery and hydraulic components.', width: 2000, height: 3000 },
  connectedEquipment: { fallback: equipmentFallback, webp: srcset([equipmentWebp480, equipmentWebp640, equipmentWebp800, equipmentWebp, equipmentWebp2000]), avif: srcset([equipmentAvif480, equipmentAvif640, equipmentAvif800, equipmentAvif, equipmentAvif2000]), alt: 'Close-up of wiring, chain and mechanical parts inside industrial equipment.', width: 2000, height: 1600 },
  sterileInstruments: { fallback: medicalFallback, webp: srcset([medicalWebp480, medicalWebp640, medicalWebp800, medicalWebp, medicalWebp2000]), avif: srcset([medicalAvif480, medicalAvif640, medicalAvif800, medicalAvif, medicalAvif2000]), alt: 'Close-up of sterile surgical instruments arranged on a clean table.', width: 2000, height: 3000 },
} as const;
export type EditorialMedia = (typeof editorialMedia)[keyof typeof editorialMedia];
