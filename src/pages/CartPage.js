import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // État pour stocker les articles du panier
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  // Fonction pour récupérer les articles du panier
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token JWT
      if (!token) {
        alert('Vous devez être connecté pour voir votre panier.');
        return;
      }

      const response = await fetch('http://localhost:8080/cart/items', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data); // Stocker les articles du panier
      } else {
        console.error('Erreur lors de la récupération des articles du panier:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles du panier:', error);
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };

  // Charger les articles du panier au montage du composant
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fonction pour calculer le total du panier
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Votre Panier</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Titre</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Prix</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.title}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.prix.toFixed(2)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>${(item.prix * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 style={{ marginTop: '20px' }}>Total: ${calculateTotal()}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;