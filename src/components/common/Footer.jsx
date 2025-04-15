import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const FooterContainer = styled.footer`
  background-color: #f8f8f8;
  padding: 50px 0 20px;
  margin-top: 50px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  margin-bottom: 20px;
`;

const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 30px;
    height: 2px;
    background-color:rgb(0, 153, 255);
  }
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 10px;
  
  a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: rgb(0, 153, 255);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  color: grey;
`;

const ContactIcon = styled.div`
  margin-right: 10px;
  color: rgb(0, 153, 255)0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgb(0, 153, 255);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color:rgb(0, 153, 255);
    color: #333;
  }
`;

const NewsletterForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color:rgb(0, 153, 255);
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: rgb(0, 153, 255);
  }
`;

const CopyrightSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
  margin-top: 30px;
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <ColumnTitle>Contact Info</ColumnTitle>
          <ContactItem>
            <ContactIcon><LocationOnIcon /></ContactIcon>
            <div>123 Example Street, City, Country</div>
          </ContactItem>
          <ContactItem>
            <ContactIcon><PhoneIcon /></ContactIcon>
            <div>+123 456 7890</div>
          </ContactItem>
          <ContactItem>
            <ContactIcon><EmailIcon /></ContactIcon>
            <div>contact@limupa.com</div>
          </ContactItem>
          <SocialLinks>
            <SocialIcon to="#"><FacebookIcon /></SocialIcon>
            <SocialIcon to="#"><TwitterIcon /></SocialIcon>
            <SocialIcon to="#"><InstagramIcon /></SocialIcon>
            <SocialIcon to="#"><YouTubeIcon /></SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Information</ColumnTitle>
          <LinksList>
            <LinkItem><Link to="/about">About Us</Link></LinkItem>
            <LinkItem><Link to="/delivery">Delivery Information</Link></LinkItem>
            <LinkItem><Link to="/privacy">Privacy Policy</Link></LinkItem>
            <LinkItem><Link to="/terms">Terms & Conditions</Link></LinkItem>
            <LinkItem><Link to="/contact">Contact Us</Link></LinkItem>
            <LinkItem><Link to="/returns">Returns</Link></LinkItem>
          </LinksList>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Customer Service</ColumnTitle>
          <LinksList>
            <LinkItem><Link to="/shipping">Shipping Policy</Link></LinkItem>
            <LinkItem><Link to="/help">Help & FAQ</Link></LinkItem>
            <LinkItem><Link to="/account">My Account</Link></LinkItem>
            <LinkItem><Link to="/orders">Order History</Link></LinkItem>
            <LinkItem><Link to="/wishlist">Wishlist</Link></LinkItem>
            <LinkItem><Link to="/newsletter">Newsletter</Link></LinkItem>
          </LinksList>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Subscribe to our newsletter</ColumnTitle>
          <p>Get the latest updates, news and special offers sent directly to your inbox.</p>
          <NewsletterForm>
            <InputField type="email" placeholder="Your Email Address" />
            <SubmitButton type="submit">Subscribe</SubmitButton>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>
      
      <CopyrightSection>
        <p>&copy; {new Date().getFullYear()} Limupa. All Rights Reserved.</p>
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;