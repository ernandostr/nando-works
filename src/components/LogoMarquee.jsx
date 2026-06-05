import styles from './LogoMarquee.module.css';

import logoBukalapak     from '../assets/client and company logo/1. bukalapak.png';
import logoMRT           from '../assets/client and company logo/2. mrt jakarta.png';
import logoParagon       from '../assets/client and company logo/3. paragon.png';
import logoKahf          from '../assets/client and company logo/4. kahf.png';
import logoKemenparekraf from '../assets/client and company logo/5. kemenparekraf.png';
import logoEfishery      from '../assets/client and company logo/6. efishery.png';
import logoClarion       from '../assets/client and company logo/7. clarion events.png';
import logoIllume        from '../assets/client and company logo/8. illume.png';
import logoAceplace      from '../assets/client and company logo/9. aceplace.png';

const LOGOS = [
  { src: logoBukalapak,     alt: 'Bukalapak' },
  { src: logoMRT,           alt: 'MRT Jakarta' },
  { src: logoParagon,       alt: 'Paragon' },
  { src: logoKahf,          alt: 'Kahf' },
  { src: logoKemenparekraf, alt: 'Kemenparekraf' },
  { src: logoEfishery,      alt: 'eFishery' },
  { src: logoClarion,       alt: 'Clarion Events' },
  { src: logoIllume,        alt: 'Illume' },
  { src: logoAceplace,      alt: 'Aceplace' },
];

export default function LogoMarquee() {
  return (
    <div className={styles.logoTrack}>
      <div className={styles.logoStrip}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className={styles.logo}
          />
        ))}
      </div>
    </div>
  );
}
