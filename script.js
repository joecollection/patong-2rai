// Gallery Modal Functions
function openGallery() {
  document.getElementById('galleryModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  document.getElementById('galleryModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Investment Analysis Modal Functions
function openAnalysis() {
  document.getElementById('analysisModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAnalysis() {
  document.getElementById('analysisModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close Modals when clicking on the dark background overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close Modals when pressing the "Escape" key on keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => {
      el.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});
