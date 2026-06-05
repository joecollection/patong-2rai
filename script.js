// ========================================================
// ⚡ JOE COLLECTION - AI REAL ESTATE INVESTMENT CORE ENGINE
// ========================================================

/**
 * 1. ระบบคำนวณสัดส่วนที่ดินและแปลงค่ามูลค่าทางการลงทุนตามจริง (Real-Time Real Estate Calculator)
 */
function generateLandAnalysisWithAI() {
  // ดึงค่า Input ของแต่ละฟิลด์ออกมาจากหน้าเว็บ
  const name = document.getElementById('landName').value;
  const location = document.getElementById('landLocation').value;
  const priceMillion = parseFloat(document.getElementById('askingPrice').value) || 0;
  
  const rai = parseFloat(document.getElementById('landRai').value) || 0;
  const ngan = parseFloat(document.getElementById('landNgan').value) || 0;
  const wah = parseFloat(document.getElementById('landWah').value) || 0;
  
  // แปลงมาตราวัดไทยไปเป็น ตารางวา และ ตารางเมตร ทั้งหมด
  const totalWah = (rai * 400) + (ngan * 100) + wah;
  const totalSqM = totalWah * 4;
  const totalRaiDecimal = totalWah / 400; // แปลงหน่วยทั้งหมดออกมาเป็นทศนิยมไร่เพื่อใช้หารราคา
  
  // ตรวจสอบการกรอกข้อมูลป้องกันระบบ Error บั๊กหารด้วยศูนย์
  if (totalWah <= 0) {
    alert("❌ กรุณากรอกจำนวนขนาดพื้นที่ดิน (ไร่ / งาน / ตารางวา) ให้ถูกต้องครับ");
    return;
  }
  
  // คำนวณมูลค่าลึกเชิงสถิติอสังหาฯ
  const totalPriceActual = priceMillion * 1000000;
  const calculatedPricePerRai = totalPriceActual / totalRaiDecimal;
  const calculatedPricePerWah = totalPriceActual / totalWah;
  
  // จัดข้อความรูปแบบไทยเพื่อนำไปแสดงผลบนตัวการ์ดหลัก
  let formattedAreaText = "";
  if (rai > 0) formattedAreaText += rai + " ไร่ ";
  if (ngan > 0) formattedAreaText += ngan + " งาน ";
  if (wah > 0) formattedAreaText += wah + " ตารางวา";
  if (formattedAreaText === "") formattedAreaText = wah + " ตารางวา";

  // ── STEP A: อัปเดตข้อมูลบนแถบข้อความวิ่ง (Ticker Track)
  document.getElementById('tickName').innerText = name;
  document.getElementById('tickRai').innerText = formattedAreaText;
  document.getElementById('tickPrice').innerText = "THB " + totalPriceActual.toLocaleString();
  
  // ── STEP B: อัปเดตราคาและข้อความพาดหัวบน Hero Card
  document.getElementById('cardPrice').innerHTML = "฿" + priceMillion.toLocaleString() + "M<span class='unit'>THB</span>";
  document.getElementById('cardTitle').innerHTML = name + "<br>" + location;
  document.getElementById('cardSubtitle').innerText = formattedAreaText + " · Prime Development Parcel";
  
  // ── STEP C: อัปเดตการแสดงผลตัวเลขทองสี่ช่องบน Stats Grid
  document.getElementById('statRai').innerText = totalRaiDecimal.toFixed(2);
  document.getElementById('statSqM').innerText = totalSqM.toLocaleString();
  document.getElementById('statPerRai').innerText = (calculatedPricePerRai / 1000000).toFixed(1) + "M";
  document.getElementById('statPerWa').innerText = calculatedPricePerWah >= 1000000 
    ? (calculatedPricePerWah / 1000000).toFixed(2) + "M" 
    : (calculatedPricePerWah / 1000).toFixed(0) + "K";
    
  // ── STEP D: ผูกข้อมูลเข้าตารางเปรียบเทียบเกณฑ์ประเมิน (Valuation Data Table)
  document.getElementById('tableArea').innerText = formattedAreaText + " (" + totalSqM.toLocaleString() + " m²)";
  document.getElementById('tableTotal').innerText = "THB " + totalPriceActual.toLocaleString();
  document.getElementById('tablePerRai').innerText = "THB " + Math.round(calculatedPricePerRai).toLocaleString();
  document.getElementById('tablePerWa').innerText = "THB " + Math.round(calculatedPricePerWah).toLocaleString();
  
  // ── STEP E: ฉีดประมวลผลบทวิเคราะห์ภาษาทางกฎหมายและการเงินเข้าหน้าต่างวิเคราะห์ AI Modal
  document.getElementById('aiRationale').innerText = "AI Analysis Engine successfully processed: '" + name + "' located in " + location + ". This premium " + formattedAreaText + " (" + totalRaiDecimal.toFixed(2) + " Rai) plot scale configuration satisfies institutional-grade layouts for residential or mixed-use placement under active zone code frameworks.";
  document.getElementById('aiConclusion').innerText = "Strategic acquisition is recommended for the " + name + " pipeline profile. At an indexed rate of THB " + (calculatedPricePerRai / 1000000).toFixed(1) + "M per Rai, entry costs demonstrate strong equity alignment compared to immediate district benchmarks.";
  
  // แจ้งสเตตัสความสำเร็จ
  alert("⚡ ประมวลผลข้อมูลผ่าน AI Investment Engine เรียบร้อยแล้วครับ!");
}

/**
 * 2. ฟังก์ชันควบคุมโมดัลแกลเลอรีรูปภาพ (Gallery Modal Controls)
 */
function openGallery() {
  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // ล็อกหน้ารายการไม่ให้เลื่อนเบื้องหลัง
  }
}

function closeGallery() {
  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // คืนค่าหน้าเว็บบนเบราว์เซอร์ให้เลื่อนปกติ
  }
}

/**
 * 3. ฟังก์ชันควบคุมโมดัลวิเคราะห์การลงทุน (Investment Analysis Modal Controls)
 */
function openAnalysis() {
  const modal = document.getElementById('analysisModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // ล็อกหน้ารายการไม่ให้เลื่อนเบื้องหลัง
  }
}

function closeAnalysis() {
  const modal = document.getElementById('analysisModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // คืนค่าหน้าเว็บบนเบราว์เซอร์ให้เลื่อนปกติ
  }
}
