type ToastType = 'success' | 'error' | 'info';

export function showToast(message: string, type: ToastType = 'info') {
  const existingToast = document.getElementById('toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out flex items-center gap-3 font-inter font-medium animate-slide-in ${
    type === 'success'
      ? 'bg-green-500 text-white'
      : type === 'error'
      ? 'bg-red-500 text-white'
      : 'bg-blue-500 text-white'
  }`;

  const icon = document.createElement('span');
  icon.className = 'text-xl';
  icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
