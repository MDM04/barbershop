import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../config/MediaQuery'; // Ajuste o caminho conforme necessário
import ImageGallery from '../components/ImageGallery'; // Ajuste o caminho conforme necessário
import { ReactTyped } from 'react-typed';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import { useState } from 'react';

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  ; /* Alterado para gradiente */ 
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

// Estilos do título principal
const MainTitle = styled.h1`
  font-size: 7rem;
  margin-bottom: 40px;
  color:  #0e0f0f;
  font-family: GreyQo-Regular;
  letter-spacing: 2px;
  word-spacing:20px;

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

// Estilos do subtítulo
const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 50px;

  @media ${device.mobileS} {
    font-size: 1.2rem;
  }

  @media ${device.tablet} {
    font-size: 1.4rem;
  }

  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;

// Estilos do botão
const Button = styled(Link)`
  margin: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const HomePageClient = () => {
  const images = [image1, image2, image3];
  const [showCursor, setShowCursor] = useState(true);

  return (
    <Container>
      <MainTitle>{` Seu Zé  Barbearia`}</MainTitle>
      <SubTitle>
        <ReactTyped
          strings={['Considerada a melhor barbearia de corte INFANTIL em 2023...']}
          typeSpeed={60}
          showCursor={showCursor}
          onComplete={() => setShowCursor(false)}
          loop={false}
          
        />
      </SubTitle>
      <ImageGallery images={images} />
      <Button to="/admin/admin-welcome-page">Admin</Button>
      / * colocar /login depois de fazer os testes com os compoenent novos */ 
      <Button to="/welcome">Ir para Login</Button>
    </Container>
  );
};

export default HomePageClient;
