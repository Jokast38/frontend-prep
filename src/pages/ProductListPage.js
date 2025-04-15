import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/product/ProductCard';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  background-color: #f8f8f8;
  padding: 30px 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Breadcrumb = styled.div`
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const ViewOptions = styled.div`
  display: flex;
  align-items: center;
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#ffd200' : '#666'};
  margin-right: 10px;
  cursor: pointer;
  
  &:hover {
    color: #ffd200;
  }
`;

const ProductCount = styled.span`
  margin-left: 20px;
  color: #666;
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
`;

const SortLabel = styled.span`
  margin-right: 10px;
  color: #666;
`;

const SortSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterContainer = styled.div`
  margin-bottom: 30px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 4px;
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const FilterContent = styled.div`
  padding: 15px;
  border: 1px solid #eee;
  border-top: none;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const FilterGroupTitle = styled.h4`
  margin-bottom: 10px;
  color: #333;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  input {
    margin-right: 10px;
  }
`;

const PriceRange = styled.div`
  margin-top: 10px;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ApplyFilterButton = styled.button`
  background-color: #ffd200;
  border: none;
  color: black;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #e6bd00;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  border: 1px solid #ddd;
  background: ${props => props.active ? '#ffd200' : 'white'};
  color: ${props => props.active ? 'black' : '#666'};
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.active ? '#ffd200' : '#f5f5f5'};
  }
`;

const ProductListPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [sort, setSort] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // Appel à l'API backend pour récupérer les produits
    fetch('http://localhost:8080/produit/all')
      .then(res => {
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        return res.json();
      })
      .then(data => {
        // Filtrer les produits par catégorie si une catégorie est spécifiée
        const filteredProducts = category
          ? data.filter(product => product.category?.toLowerCase() === category.toLowerCase())
          : data;
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Erreur:', error));
  }, [category]);

  // Calculer les produits à afficher selon la pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Nombre total de pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trier les produits
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);

    let sortedProducts = [...products];

    switch (sortValue) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Ne rien faire, garder l'ordre par défaut
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{category ? category : 'All Products'}</PageTitle>
        <Breadcrumb>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/shop">Shop</a>
          {category && (
            <>
              <span>/</span>
              {category}
            </>
          )}
        </Breadcrumb>
      </PageHeader>

      <ContentLayout>
        <div>
          <FilterContainer>
            <FilterHeader onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FilterTitle>
                <FilterListIcon />
                Filtrer les produits
              </FilterTitle>
              <ArrowDropDownIcon />
            </FilterHeader>

            <FilterContent isOpen={isFilterOpen}>
              <FilterGroup>
                <FilterGroupTitle>Catégories</FilterGroupTitle>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <input type="checkbox" /> Smartphones
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Laptops
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Tablettes
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Audio
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Gaming
                  </CheckboxLabel>
                </CheckboxGroup>
              </FilterGroup>

              <FilterGroup>
                <FilterGroupTitle>Marques</FilterGroupTitle>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <input type="checkbox" /> Apple
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Samsung
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Sony
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Dell
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input type="checkbox" /> Microsoft
                  </CheckboxLabel>
                </CheckboxGroup>
              </FilterGroup>

              <FilterGroup>
                <FilterGroupTitle>Fourchette de prix</FilterGroupTitle>
                <PriceRange>
                  <PriceInput type="number" placeholder="Prix min" />
                  <PriceInput type="number" placeholder="Prix max" />
                </PriceRange>
              </FilterGroup>

              <ApplyFilterButton>Appliquer les filtres</ApplyFilterButton>
            </FilterContent>
          </FilterContainer>
        </div>

        <div>
          <ToolBar>
            <ViewOptions>
              <ViewButton
                active={view === 'grid'}
                onClick={() => setView('grid')}
              >
                <ViewModuleIcon />
              </ViewButton>
              <ViewButton
                active={view === 'list'}
                onClick={() => setView('list')}
              >
                <ViewListIcon />
              </ViewButton>
              <ProductCount>{products.length} produits trouvés</ProductCount>
            </ViewOptions>

            <SortOptions>
              <SortLabel>Trier par:</SortLabel>
              <SortSelect value={sort} onChange={handleSortChange}>
                <option value="default">Tri par défaut</option>
                <option value="price-low">Prix: croissant</option>
                <option value="price-high">Prix: décroissant</option>
                <option value="name-asc">Nom: A-Z</option>
                <option value="name-desc">Nom: Z-A</option>
              </SortSelect>
            </SortOptions>
          </ToolBar>

          {view === 'grid' ? (
            <ProductGrid>
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <ProductList>
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductList>
          )}

          <Pagination>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PageButton
                key={index}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </Pagination>
        </div>
      </ContentLayout>
    </PageContainer>
  );
};

export default ProductListPage;

// // import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { useCart } from '../context/CartContext';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

// // Styles pour la page d'accueil
// const HomeContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const HeroSection = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 40px;
// `;

// const MainPromo = styled.div`
//   flex: 2;
//   background-color: #f8f8f8;
//   padding: 20px;
//   border-radius: 4px;
//   position: relative;
// `;

// const SidePromos = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const SidePromo = styled.div`
//   background-color: #f8f8f8;
//   padding: 15px;
//   border-radius: 4px;
//   height: 48%;
//   position: relative;
// `;

// const PromoTag = styled.div`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   background-color: #ff5252;
//   color: white;
//   padding: 5px 10px;
//   border-radius: 4px;
//   font-weight: bold;
// `;

// const SectionTitle = styled.h2`
//   font-size: 24px;
//   margin-bottom: 20px;
//   padding-bottom: 10px;
//   border-bottom: 2px solid #eee;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const TabsContainer = styled.div`
//   display: flex;
//   gap: 15px;
// `;

// const Tab = styled.span`
//   font-size: 16px;
//   color: ${props => props.active ? '#000' : '#777'};
//   font-weight: ${props => props.active ? 'bold' : 'normal'};
//   cursor: pointer;
//   padding-bottom: 5px;
//   border-bottom: ${props => props.active ? '2px solid #ffd200' : 'none'};
// `;

// const ProductsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 20px;
//   margin-bottom: 40px;
// `;

// const ProductCard = styled.div`
//   border: 1px solid #eee;
//   border-radius: 4px;
//   padding: 15px;
//   text-align: center;
//   transition: all 0.3s ease;
//   position: relative;
  
//   &:hover {
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   }
// `;

// const ProductImage = styled.img`
//   max-width: 100%;
//   height: 120px;
//   object-fit: contain;
//   margin-bottom: 10px;
// `;

// const ProductBrand = styled.span`
//   color: #777;
//   font-size: 12px;
// `;

// const Rating = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 5px 0;
// `;

// const ProductTitle = styled.h3`
//   font-size: 14px;
//   margin: 5px 0;
//   color: #333;
// `;

// const ProductPrice = styled.div`
//   font-weight: bold;
  
//   .original-price {
//     text-decoration: line-through;
//     color: #999;
//     margin-right: 8px;
//     font-weight: normal;
//   }
  
//   .discount {
//     color: #ff5252;
//     font-size: 12px;
//     margin-left: 5px;
//   }
// `;

// const NewTag = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: #2196f3;
//   color: white;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
//   font-weight: bold;
// `;

// // const PromoSection = styled.div`
// //   display: flex;
// //   gap: 20px;
// //   margin-bottom: 40px;
// // `;

// // const PromoCard = styled.div`
// //   flex: 1;
// //   background-color: #f8f8f8;
// //   padding: 20px;
// //   border-radius: 4px;
// //   position: relative;
// //   display: flex;
// //   height: 150px;
// // `;

// // const PromoContent = styled.div`
// //   flex: 1;
// // `;

// // const PromoImage = styled.div`
// //   flex: 1;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // `;

// const ShopButton = styled(Link)`
//   display: inline-block;
//   background-color: #ffd200;
//   color: black;
//   padding: 8px 15px;
//   text-decoration: none;
//   border-radius: 4px;
//   font-weight: bold;
//   margin-top: 10px;
// `;


// // Composant pour afficher les étoiles de notation
// const RatingStars = ({ rating }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= rating) {
//       stars.push(<StarIcon key={i} style={{ color: '#ffd200', fontSize: '16px' }} />);
//     } else {
//       stars.push(<StarBorderIcon key={i} style={{ color: '#ffd200', fontSize: '16px' }} />);
//     }
//   }
//   return stars;
// };

// const HomePage = () => {
//   const { addToCart } = useCart();
//   const [activeTab, setActiveTab] = useState('bestseller');
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Appel à l'API backend pour récupérer les produits
//     fetch('http://localhost:8080/produit/')
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Erreur lors de la récupération des produits');
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data); // Mettre à jour les produits avec les données de l'API
//       })
//       .catch((error) => console.error('Erreur:', error));
//   }, [activeTab]);

//   return (
//     <HomeContainer>
//       <HeroSection>
//         <MainPromo>
//           <PromoTag>Sale Offer Black Friday This Week</PromoTag>
//           <h2>Work Desk<br />Surface Studio 2018</h2>
//           <p>Starting at <strong>$824.00</strong></p>
//           <ShopButton to="/shop">SHOP NOW</ShopButton>
//           <div style={{
//             position: 'absolute',
//             right: '30px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             width: '40%'
//           }}>
//             <img src="https://i.pinimg.com/736x/f2/0f/4c/f20f4c1877573fb8d76420745996acc5.jpg" alt="Work Desk" style={{ maxWidth: '100%' }} />
//           </div>
//         </MainPromo>

//         <SidePromos>
//           <SidePromo>
//             <h4>Full HD Display</h4>
//             <h3>Smartphone Meizu M5<br />New Color Green</h3>
//             <p>Sale 20% OFF</p>
//             <img
//               src="https://vk.telefonon.ru/wp-content/uploads/2023/03/meizu-20-infinity-147x240.jpg.webp"
//               alt="Smartphone"
//               style={{
//                 position: 'absolute',
//                 right: '10px',
//                 bottom: '10px',
//                 width: '40%',
//                 maxHeight: '100%', // Empêche l'image de dépasser la hauteur du conteneur
//                 objectFit: 'contain' // Garde les proportions de l'image
//               }}
//             />
//           </SidePromo>

//           <SidePromo>
//             <h4>Sale 20% Off At Store</h4>
//             <h3>Playstation VR Plus<br />Network 2018</h3>
//             <p>Sale 20% OFF</p>
//             <img src="https://m.media-amazon.com/images/I/71OVwWVSjTL._AC_SL1500_.jpg" alt="Playstation VR" style={{
//               position: 'absolute',
//               right: '10px',
//               bottom: '10px',
//               width: '40%'
//             }} />
//           </SidePromo>
//         </SidePromos>
//       </HeroSection>

//       <div>
//         <SectionTitle>
//           <span>Bestseller Products</span>
//           <TabsContainer>
//             <Tab active={activeTab === 'bestseller'} onClick={() => setActiveTab('bestseller')}>Bestseller Products</Tab>
//             <Tab active={activeTab === 'new'} onClick={() => setActiveTab('new')}>New Products</Tab>
//             <Tab active={activeTab === 'sale'} onClick={() => setActiveTab('sale')}>Sale Products</Tab>
//           </TabsContainer>
//         </SectionTitle>

//         <ProductsGrid>
//           {products.map(product => (
//             <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
//             <ProductCard key={product.id}>
//               {product.isNew && <NewTag>New</NewTag>}
//               <ProductImage src={product.image} alt={product.title} />
//               <ProductBrand>{product.brand}</ProductBrand>
//               <Rating>
//                 <RatingStars rating={product.rating} />
//               </Rating>
//               <ProductTitle>{product.title}</ProductTitle>
//               <ProductPrice>
//                 {product.originalPrice && (
//                   <span className="original-price">${product.originalPrice.toFixed(2)}</span>
//                 )}
//                 <span className="current-price">
//                   ${product.prix ? product.prix.toFixed(2) : 'N/A'}
//                 </span>
//                 {product.discount && (
//                   <span className="discount">-{product.discount}% OFF</span>
//                 )}
//               </ProductPrice>
//             </ProductCard>
//             </Link>
//           ))}
//         </ProductsGrid>
//       </div>
//     </HomeContainer>
//   );
// };

// export default HomePage;