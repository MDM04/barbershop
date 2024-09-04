import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { device } from '../config/MediaQuery'; // Ajuste o caminho conforme necessário
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 200%);
  height: 100vh;
  box-sizing: border-box;

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.tablet} {
    padding: 15px;
  }

  @media ${device.laptop} {
    padding: 20px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #141414;
  text-align: center;

  @media ${device.mobileS} {
    font-size: 1.5rem;
  }

  @media ${device.tablet} {
    font-size: 1.75rem;
  }

  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

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

const AddPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const PhotoInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const AddButton = styled.button`
width: 300px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminImage: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPhotos = localStorage.getItem('carouselPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  const savePhotosToLocalStorage = (photos: string[]) => {
    localStorage.setItem('carouselPhotos', JSON.stringify(photos));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const updatedPhotos = [...photos, reader.result as string];
          setPhotos(updatedPhotos);
          savePhotosToLocalStorage(updatedPhotos);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = () => {
    if (newPhotoUrl) {
      const updatedPhotos = [...photos, newPhotoUrl];
      setPhotos(updatedPhotos);
      savePhotosToLocalStorage(updatedPhotos);
      setNewPhotoUrl('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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
    <Div>
      <MainTitle>Adicione as Imagens</MainTitle>
      <AddPhotoContainer>
        <PhotoInput
          type="text"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
          placeholder="Digite a URL da nova foto"
        />
        <AddButton onClick={addPhoto}>Adicionar Foto por URL</AddButton>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }} // Oculta o input de arquivo
        />
        <AddButton onClick={triggerFileInput}>Adicionar Foto do Dispositivo</AddButton>
      </AddPhotoContainer>
      <GalleryContainer>
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <GalleryImage key={index} src={photo} alt={`Imagem ${index + 1}`} />
          ))}
        </Slider>
      </GalleryContainer>
    </Div>
  );
};

export default AdminImage;