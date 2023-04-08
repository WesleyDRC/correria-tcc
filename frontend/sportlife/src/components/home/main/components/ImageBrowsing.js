import styles from './ImageBrowsing.module.css';

import { useRef } from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import ImagesBrowsingCard from './ImagesBrowsingCard';

export default function ImageBrowsing(){
  const Carousel = useRef(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    Carousel.current.scrollLeft -= Carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    Carousel.current.scrollLeft += Carousel.current.offsetWidth;
  };

	return(
		<div className={styles.container}>
			<p className={styles.title}>Navegue por esportes</p>
			<div className={styles.photos}>
        <ImagesBrowsingCard link='https://i.imgur.com/qAX2o93.png' title='FUTEBOL' descrition='Os melhores produtos
        você compram aqui !' />
        <ImagesBrowsingCard link='https://i.imgur.com/30fsgu8.png' title='BASQUETE' descrition='As melhores equipes e acessórios estão aqui' />
        <ImagesBrowsingCard link='https://i.imgur.com/kKhzmLn.png' title='CORRIDA' descrition='Alta performance para o melhor desempenho' />
        <ImagesBrowsingCard link='https://i.imgur.com/li18LnR.png' title='VÔLEI' descrition='Levantamento de produtos é só aqui ' />
			</div>

			<div className={styles.carousel}>
        <IoIosArrowBack
          className={styles.arrowLeft}
          onClick={handleLeftClick}
        />
        <div className={styles.spotsContainer} ref={Carousel}>
					<img src='https://i.imgur.com/lU9oI6w.png' alt='soccer'/>
					<img src='https://i.imgur.com/OZbIsnt.png' alt='basketball'/>
					<img src='https://i.imgur.com/gaPtsCX.png' alt='running'/>
					<img src='https://i.imgur.com/CV0Xe9h.png' alt='volleyball'/>
        </div>
        <IoIosArrowForward
          className={styles.arrowRight}
          onClick={handleRightClick}
        />
			</div>
		</div>
	)
}
