// === WattWin App Logic ===

// OTP & CO2
const OTP_CODE = "123456";
const CO2_FACTOR = 0.757; // kg CO₂/kWh (CEA Combined Margin)

// ---- Login Flow ----
function sendOTP(){
  const phone = document.getElementById('phoneInput')?.value?.trim() || '';
  if(!/^\d{10}$/.test(phone)) { alert('Please enter a valid 10-digit phone number'); return; }
  localStorage.setItem('wattwin_phone', phone);
  const lc = document.getElementById('loginCard');
  const oc = document.getElementById('otpCard');
  if(lc && oc){ lc.style.display='none'; oc.style.display='block'; }
}

function verifyOTP(){
  const otp = document.getElementById('otpInput')?.value?.trim() || '';
  if(otp === OTP_CODE){
    localStorage.setItem('wattwin_loggedin','true');
    window.location.href = 'home.html';
  } else {
    alert('Incorrect OTP. Try 123456.');
  }
}

function backToLogin(){
  const lc = document.getElementById('loginCard');
  const oc = document.getElementById('otpCard');
  if(lc && oc){ lc.style.display='block'; oc.style.display='none'; }
}

function checkLogin(){
  if(!localStorage.getItem('wattwin_loggedin')) window.location.href = 'index.html';
}

// ---- CO₂ Engine ----
function calculateCO2(prev, curr){
  prev = Number(prev); curr = Number(curr);
  const diff = Math.max(prev - curr, 0);
  const pct = prev>0 ? (diff/prev*100) : 0;
  const co2 = diff * CO2_FACTOR;
  return { diff, pct: +pct.toFixed(1), co2: +co2.toFixed(2) };
}

// ---- Rewards Engine ----
function calculatePoints(reductionPct){
  return Math.min(Math.floor(reductionPct), 30) * 10; // cap at 300
}

// Helpers
function getPoints(){ return Number(localStorage.getItem('wattwin_points') || 520); }
function setPoints(v){ localStorage.setItem('wattwin_points', Number(v)); }
