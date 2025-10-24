const { useState } = React;

function FoodOrderingBilling() {
  const menuItems = [
    { id: 1, name: 'Bicol Express', price: 120, image: 'https://i.imgur.com/v4eGm2R.png' },
    { id: 2, name: 'Laing W/ Lechon Kawali', price: 80, image: 'https://i.imgur.com/kQXQb8T.png' },
    { id: 3, name: 'Sisig', price: 250, image: 'https://i.imgur.com/XfVt6M9.png' },
    { id: 4, name: 'Roasted Chicken', price: 180, image: 'https://i.imgur.com/Dn7UqlF.png' },
    { id: 5, name: 'Roasted Ribs', price: 60, image: 'https://i.imgur.com/ftrwBcm.png' },
    { id: 6, name: 'dsadadas', price: 70, image: 'https://i.imgur.com/ftrwBcm.png' }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const checkout = () => {
    alert('Order confirmed!');
    setCart([]);
  };

  return (
    <div className="container">
      {/* Menu Section */}
      <div className="card">
        <h1>🍽️ Menu</h1>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div className="menu-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₱{item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="card">
        <h1>🛒 Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <strong>{item.name}</strong> (x{item.qty})
              </div>
              <div>
                ₱{item.price * item.qty}{' '}
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}

        {/* Billing Summary */}
        <div className="summary">
          <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
          <p>Tax (12%): ₱{tax.toFixed(2)}</p>
          <p><strong>Total: ₱{total.toFixed(2)}</strong></p>
          <button disabled={cart.length === 0} onClick={checkout} style={{ width: '100%', marginTop: '10px' }}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

// Render React App
ReactDOM.createRoot(document.getElementById('root')).render(<FoodOrderingBilling />);