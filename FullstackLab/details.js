document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  loadCaregiverDetails();
  initPrintButton();
});

function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Play rotation animation
    themeToggleBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
  });
}

function loadCaregiverDetails() {
  const caregiverData = localStorage.getItem('registeredCaregiver');
  if (!caregiverData) {
    alert('No registration data found. Redirecting to home...');
    window.location.href = 'index.html';
    return;
  }

  try {
    const caregiver = JSON.parse(caregiverData);
    
    document.getElementById('disp-name').textContent = caregiver.fullName || 'N/A';
    document.getElementById('disp-email').textContent = caregiver.email || 'N/A';
    document.getElementById('disp-phone').textContent = caregiver.phone || 'N/A';
    document.getElementById('disp-age').textContent = caregiver.age ? `${caregiver.age} Years` : 'N/A';
    document.getElementById('disp-dob').textContent = caregiver.dob || 'N/A';
    document.getElementById('disp-time').textContent = caregiver.preferredTime || 'N/A';
    document.getElementById('disp-gender').textContent = caregiver.gender ? (caregiver.gender.charAt(0).toUpperCase() + caregiver.gender.slice(1)) : 'N/A';
    document.getElementById('disp-address').textContent = caregiver.address || 'N/A';
    
    // Handle Skills
    const skillsContainer = document.getElementById('disp-skills');
    if (caregiver.skills && caregiver.skills.length > 0) {
      skillsContainer.innerHTML = '';
      const list = document.createElement('ul');
      list.style.listStyle = 'none';
      list.style.display = 'flex';
      list.style.flexWrap = 'wrap';
      list.style.gap = '0.5rem';
      list.style.paddingTop = '0.25rem';
      
      caregiver.skills.forEach(skill => {
        const item = document.createElement('li');
        item.style.backgroundColor = 'var(--color-sand)';
        item.style.color = 'var(--color-pine)';
        item.style.padding = '0.25rem 0.75rem';
        item.style.borderRadius = '20px';
        item.style.fontSize = '0.85rem';
        item.style.fontWeight = '600';
        item.textContent = formatSkillName(skill);
        list.appendChild(item);
      });
      skillsContainer.appendChild(list);
    } else {
      skillsContainer.textContent = 'None declared.';
    }

    // Handle Notes
    const notesContainer = document.getElementById('disp-notes');
    if (caregiver.additionalNotes && caregiver.additionalNotes.trim()) {
      notesContainer.textContent = caregiver.additionalNotes;
    } else {
      notesContainer.textContent = 'No additional comments or requirements notes provided.';
      notesContainer.style.color = 'var(--color-sage)';
    }

  } catch (err) {
    console.error('Error loading caregiver profile data:', err);
    alert('Failed to parse caregiver credentials. Redirecting to home...');
    window.location.href = 'index.html';
  }
}

function formatSkillName(skill) {
  const map = {
    'nursing': 'Nursing Care',
    'elderly': 'Elderly Support',
    'firstaid': 'First Aid & CPR',
    'cooking': 'Meal Preparation',
    'housekeeping': 'Housekeeping'
  };
  return map[skill] || skill;
}

function initPrintButton() {
  const printBtn = document.getElementById('btn-print');
  printBtn?.addEventListener('click', () => {
    window.print();
  });
}
