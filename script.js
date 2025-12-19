/* --- Order Management System --- */

function openOrderModal(title, price) {
  const modal = document.getElementById('orderModal');
  modal.style.display = 'flex';
  
  document.getElementById('modalBookTitle').innerText = 'Order: ' + title;
  document.getElementById('modalBookPrice').innerText = price;
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
  // Reset all fields
  document.getElementById('orderName').value = '';
  document.getElementById('orderEmail').value = '';
  document.getElementById('orderPhone').value = '';
}

window.onclick = (e) => {
  if (e.target === document.getElementById('orderModal')) closeModal();
};

/* --- Confirm Purchase with Contact Details --- */
function confirmOrder() {
  const name = document.getElementById('orderName').value.trim();
  const email = document.getElementById('orderEmail').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  
  const title = document.getElementById('modalBookTitle').innerText.replace('Order: ', '');
  const price = document.getElementById('modalBookPrice').innerText;

  // Basic validation check
  if (!name || !email || !phone) {
    alert("Please fill in all contact details to complete your order.");
    return;
  }

  // 1. Create Detailed Order Object
  const newOrder = {
    customer: { name, email, phone },
    product: title,
    amount: price,
    timestamp: new Date().toISOString()
  };

  // 2. Local Storage Persistence
  try {
    const history = JSON.parse(localStorage.getItem('bookstore_orders')) || [];
    history.push(newOrder);
    localStorage.setItem('bookstore_orders', JSON.stringify(history));
    
    // 3. Success Feedback
    alert(`Success! Check your email (${email}) for the receipt.`);
    closeModal();
  } catch (err) {
    console.error("Storage error:", err);
    alert("There was an error saving your order.");
  }
}