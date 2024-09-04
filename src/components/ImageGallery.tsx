import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { device } from '../config/MediaQuery'; // Ajuste o caminho conforme necessário
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Estilos do container da galeria de imagens
const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1000px; // Ajuste conforme necessário
  margin: 0 auto;
  gap: 5px;
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

// Estilos das imagens na galeria
const GalleryImage = styled.img`
  width: 100%;
  height: 200px; // Define uma altura fixa para as imagens
  object-fit: cover; // Faz com que a imagem preencha o espaço sem distorcer
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  @media ${device.mobileS} {
    max-width: 120px;
    height: 80px; // Ajusta a altura para telas pequenas
  }

  @media ${device.tablet} {
    max-width: 150px;
    height: 120px; // Ajusta a altura para tablets
  }

  @media ${device.laptop} {
    max-width: 180px;
    height: 150px; // Ajusta a altura para laptops
  }

  @media ${device.desktop} {
    max-width: 200px;
    height: 180px; // Ajusta a altura para desktops
  }

  @media ${device.desktopL} {
    max-width: 270px;
    height: 200px; // Ajusta a altura para telas grandes
  }
`;

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  // Carregar imagens do localStorage ao montar o componente
  useEffect(() => {
    const savedImages = localStorage.getItem('carouselPhotos');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // laptop
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600, // tablet
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <GalleryContainer>
      <Slider {...settings}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <GalleryImage key={index} src={image} alt={`Imagem ${index + 1}`} />
          ))
        ) : (
          <div>Sem imagens disponíveis</div>
        )}
      </Slider>
    </GalleryContainer>
  );
};

export default ImageGallery;
