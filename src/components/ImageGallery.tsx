import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { device } from '../config/MediaQuery'; // Ajuste o caminho conforme necessário
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Estilos do container da galeria de imagens
const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1000px; // Ajuste conforme necessário
  gap: 5px;
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

// Estilos das imagens na galeria
const GalleryImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2); // Aumenta a imagem em 10%

  }

  @media ${device.mobileS} {
    max-width: 120px;
  }

  @media ${device.tablet} {
    max-width: 150px;
  }

  @media ${device.laptop} {
    max-width: 180px;
  }

  @media ${device.desktop} {
    max-width: 200px;
  }

  @media ${device.desktopL} {
    max-width: 270px;
  }
`;

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
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
        {images.map((image, index) => (
          <GalleryImage key={index} src={image} alt={`Imagem ${index + 1}`} />
        ))}
      </Slider>
    </GalleryContainer>
  );
};

export default ImageGallery;
