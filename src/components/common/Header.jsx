import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

const ContactInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const Options = styled.div`
  display: flex;
  gap: 15px;
`;

const OptionItem = styled.div`
  font-size: 14px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  
  span {
    color: rgb(0, 153, 255);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: rgb(0, 153, 255);
  color: #000;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionItem = styled(Link)`
  color: #333;
  position: relative;
  text-decoration: none;
`;

const CartCounter = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: rgb(0, 153, 255);
  color: #000;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBar = styled.nav`
  background-color: rgb(0, 153, 255);
  padding: 15px 20px;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 20px;
  
  a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
    text-transform: uppercase;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur
  const [cartTotal, setCartTotal] = useState(0); // État pour stocker le total du panier

  // Récupérer les informations de l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token JWT
        if (!token) {
          console.warn('No token found. User is not logged in.');
          return;
        }

        const response = await fetch('http://localhost:8080/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Stocker les informations de l'utilisateur
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // Récupérer le total du panier
  useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token JWT
        if (!token) {
          console.warn('No token found. Cannot fetch cart total.');
          return;
        }

        const response = await fetch('http://localhost:8080/cart/total', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const total = await response.json();
          setCartTotal(total); // Stocker le total du panier
        } else {
          console.error('Failed to fetch cart total:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cart total:', error);
      }
    };

    fetchCartTotal();
  }, []);

  return (
    <HeaderContainer>
      <TopBar>
        <ContactInfo>Téléphone d'Enquiry: 12345678</ContactInfo>
        <Options>
          <OptionItem>Currency: $USD</OptionItem>
          <OptionItem>Language: Français</OptionItem>
          {user ? (
            <OptionItem>Bienvenue, {user.username}</OptionItem>
          ) : (
            <OptionItem>Mon Compte</OptionItem>
          )}
        </Options>
      </TopBar>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px' }}>
        <Logo>
          <span>BNK</span>PRO
        </Logo>
        
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Je recherche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchBar>
        
        <Actions>
          <ActionItem to="/wishlist">
            <FavoriteBorderIcon />
          </ActionItem>
          <ActionItem to="/cart">
            <ShoppingCartIcon />
            {cartItems.length > 0 && <CartCounter>{cartItems.length}</CartCounter>}
            <span style={{ marginLeft: '5px' }}>${cartTotal.toFixed(2)}</span>
          </ActionItem>
          <ActionItem to="/account">
            <PersonOutlineIcon />
          </ActionItem>
        </Actions>
      </div>
      
      <NavBar>
        <NavMenu>
          <NavItem><Link to="/">HOME</Link></NavItem>
          <NavItem><Link to="/shop">SHOP</Link></NavItem>
          <NavItem><Link to="/products">PRODUCTS</Link></NavItem>
          <NavItem><Link to="/about">ABOUT US</Link></NavItem>
          <NavItem><Link to="/contact">CONTACT US</Link></NavItem>
        </NavMenu>
      </NavBar>
    </HeaderContainer>
  );
};

export default Header;