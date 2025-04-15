import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    
    .product-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 180px;
  object-fit: contain;
`;

const ProductActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  class-name: product-actions;
`;

const ActionButton = styled.button`
  background-color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #ffd200;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  ${props => props.position}: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${props => 
    props.type === 'new' ? '#2196f3' : 
    props.type === 'sale' ? '#ff5252' : '#4caf50'};
`;

const ProductBrand = styled.div`
  color: #777;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const ProductTitle = styled(Link)`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
  text-decoration: none;
  
  &:hover {
    color: #ffd200;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentPrice = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
  font-size: 14px;
`;

const Discount = styled.span`
  color: #ff5252;
  font-size: 12px;
  margin-left: 10px;
`;

// Composant pour afficher les étoiles de notation
const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<StarIcon key={i} style={{ color: '#ffd200', fontSize: '16px' }} />);
    } else {
      stars.push(<StarBorderIcon key={i} style={{ color: '#ffd200', fontSize: '16px' }} />);
    }
  }
  return stars;
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <Card>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.title} />
        
        {product.isNew && <Badge type="new" position="left">Nouveau</Badge>}
        {product.discount && <Badge type="sale" position="right">Promo</Badge>}
        
        <ProductActions className="product-actions">
          <ActionButton onClick={handleAddToCart} title="Ajouter au panier">
            <ShoppingCartIcon />
          </ActionButton>
          <ActionButton title="Ajouter aux favoris">
            <FavoriteBorderIcon />
          </ActionButton>
          <ActionButton as={Link} to={`/product/${product.id}`} title="Voir le produit">
            <VisibilityIcon />
          </ActionButton>
        </ProductActions>
      </ImageContainer>
      
      <ProductBrand>{product.brand}</ProductBrand>
      
      <Rating>
        <RatingStars rating={product.rating} />
      </Rating>
      
      <ProductTitle to={`/product/${product.id}`}>{product.title}</ProductTitle>
      
      <PriceContainer>
        {product.originalPrice && (
          <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
        )}
        <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
        {product.discount && (
          <Discount>{product.discount}</Discount>
        )}
      </PriceContainer>
    </Card>
  );
};

export default ProductCard;