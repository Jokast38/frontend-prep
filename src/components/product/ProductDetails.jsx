import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { toast, ToastContainer } from 'react-toastify';
import ProductCard from './ProductCard';
import { staticProducts } from '../../pages/HomePage'; // Import static products from HomePage

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Breadcrumb = styled.div`
  margin-bottom: 30px;
  color: #666;
  
  a {
    color: #333;
    text-decoration: none;
    
    &:hover {
      color: #ffd200;
    }
  }
  
  span {
    margin: 0 8px;
  }
`;

const ProductSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  margin-bottom: 20px;
  display: flex;
    justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ThumbnailList = styled.div`
  display: flex;
  gap: 10px;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  height: auto;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ProductRating = styled.div`
  display: flex;
  gap: 5px;
`;

const RatingValue = styled.span`
  font-size: 14px;
  color: #666;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;  

const RatingIcon = styled.span`
  color: #ffd200;
`;

const RatingCount = styled.span`
  font-size: 14px;
  color: #666;
`;

const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  color: #666;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ffd200;
  color: #333;
  font-weight: bold;
  cursor: pointer;
`;

const ActionIcon = styled.span`
  font-size: 20px;
`;

const ProductDetails = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

  // Convertir l'ID en nombre pour la comparaison
  const product = staticProducts.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(product?.image || null);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
    if (!token) {
      toast.error('Vous devez être connecté pour ajouter un produit au panier.');
      navigate('/auth'); // Redirige vers la page de connexion
      return;
    }

    if (!product) {
      toast.error('Produit non disponible.');
      return;
    }

    toast.success('Produit ajouté au panier avec succès.');
  };

  if (!product) return <div>Produit introuvable.</div>;

  return (
    <PageContainer>
      <ToastContainer /> {/* Conteneur pour afficher les toasts */}
      <Breadcrumb>
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{product.category || 'Category'}</span>
      </Breadcrumb>
      <ProductSection>
        <ImageContainer>
          <MainImage>
            <ProductImage src={selectedImage || product.image} alt={product.title} />
          </MainImage>
          {product.images && (
            <ThumbnailList>
              {product.images.map((image, index) => (
                <Thumbnail 
                  key={index} 
                  src={image} 
                  alt={product.title} 
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </ThumbnailList>
          )}
        </ImageContainer>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductRating>
            <RatingValue>{product.rating || 0}</RatingValue>
            <RatingStars>
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < (product.rating || 0) ? <RatingIcon><StarIcon /></RatingIcon> : <RatingIcon><StarBorderIcon /></RatingIcon>}
                </span>
              ))}
            </RatingStars>
            <RatingCount>({product.ratingCount || 0})</RatingCount>
          </ProductRating>
          <ProductPrice>${product.prix}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductActions>
            <ActionButton onClick={handleAddToCart}>Add to Cart</ActionButton>
            <ActionButton>
              <ActionIcon><FavoriteBorderIcon /></ActionIcon>
              Add to Wishlist
            </ActionButton>
            <ActionButton>
              <ActionIcon><ShareIcon /></ActionIcon>
              Share
            </ActionButton>
          </ProductActions>
        </ProductInfo>
      </ProductSection>
      {product.relatedProducts && (
        <ProductSection>
          {product.relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </ProductSection>
      )}
    </PageContainer>
  );
};

export default ProductDetails;