// Global helpers
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Mobile nav toggle
function toggleNav(){
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
}

// Newsletter subscribe (demo)
function subscribe(e){
  e.preventDefault();
  alert('Thanks for subscribing! We’ll keep you updated.');
}

// Membership simulation
function subscribePlan(plan){
  localStorage.setItem('ckap_membership', plan);
  alert(`Subscribed to ${plan} plan. Premium downloads are now unlocked (where applicable).`);
}

// Require membership for premium actions
function requireMembership(e){
  e.preventDefault();
  const plan = localStorage.getItem('ckap_membership') || 'Free';
  if (plan === 'Free'){
    alert('Premium content requires a Student, Researcher, or Institutional plan. Please visit Membership.');
    window.location.href = 'membership.html';
  } else {
    alert(`Access granted for ${plan} plan. Starting download (demo).`);
  }
}

// Archive filtering
function setCategory(btn){
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.archive-item').forEach(item=>{
    const cat = item.getAttribute('data-cat');
    item.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
  });
}

function filterArchive(){
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.archive-item').forEach(item=>{
    const tags = item.getAttribute('data-tags').toLowerCase();
    item.style.display = tags.includes(q) ? '' : (q ? 'none' : '');
  });
}

// Open archive item (demo)
function openItem(e){
  e.preventDefault();
  alert('Demo: This would open the item detail page or modal with full content.');
}

// Marketplace cart (localStorage demo)
const CART_KEY = 'ckap_cart';

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function setCart(items){
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  renderCart();
}

function addToCart(id){
  const card = document.querySelector(`[data-id="${id}"]`);
  const title = card.querySelector('h3').textContent;
  const priceText = card.querySelector('.price').textContent.replace(/[^\d]/g,'');
  const price = parseInt(priceText, 10) || 0;

  const items = getCart();
  const existing = items.find(i => i.id === id);
  if (existing){ existing.qty += 1; }
  else { items.push({ id, title, price, qty:1 }); }
  setCart(items);
  alert('Added to cart.');
}

function clearCart(){
  setCart([]);
}

function renderCart(){
  const container = document.getElementById('cart-items');
  if (!container) return;
  const items = getCart();
  if (!items.length){
    container.classList.add('empty');
    container.textContent = 'Cart is empty.';
    return;
  }
  container.classList.remove('empty');
  container.innerHTML = items.map(i => `
    <div class="cart-row">
      <span>${i.title}</span>
      <span>Qty: ${i.qty}</span>
      <span>₦${(i.price * i.qty).toLocaleString()}</span>
    </div>
  `).join('');
}

function checkout(){
  const items = getCart();
  if (!items.length){ alert('Your cart is empty.'); return; }
  const total = items.reduce((sum,i)=>sum + i.price*i.qty, 0);
  alert(`Demo checkout:\n\n${items.map(i=>`${i.title} x${i.qty}`).join('\n')}\n\nTotal: ₦${total.toLocaleString()}`);
}

document.addEventListener('DOMContentLoaded', renderCart);

// Community contribution (demo)
function submitContribution(e){
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  alert(`Thanks, ${data.name}! Your ${data.type.toLowerCase()} from ${data.region} was submitted for review.`);
  form.reset();
}

// Learning enroll (demo)
function enroll(course){
  alert(`You’re enrolled in: ${course}. Check your email for the schedule (demo).`);
}

// Contact form (demo)
function sendMessage(e){
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  alert(`Message sent. Thank you, ${data.name}! We’ll reply to ${data.email}.`);
  form.reset();
}