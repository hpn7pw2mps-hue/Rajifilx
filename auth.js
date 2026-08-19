// ============================================
// نظام الدخول بالاسم + تحديد الصلاحية
// ============================================
const Auth = {
  STORAGE_KEY: 'rajflix_user',

  roles: {
    founder: { label: 'المؤسس التنفيذي', tag: 'FOUNDER' },
    admin:   { label: 'أدمن', tag: 'ADMIN' },
    friend:  { label: 'صديق', tag: 'FRIEND' }
  },

  resolveRole(rawName) {
    const name = (rawName || '').trim();
    if (!name) return null;
    if (name === CONFIG.FOUNDER_NAME) return 'founder';
    if (name === CONFIG.ADMIN_NAME) return 'admin';
    return 'friend';
  },

  login(rawName) {
    const name = (rawName || '').trim();
    const role = this.resolveRole(name);
    if (!role) return null;
    const user = { name, role, since: Date.now() };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  current() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  requireLogin() {
    const user = this.current();
    if (!user) {
      window.location.href = 'index.html';
      return null;
    }
    return user;
  },

  roleLabel(role) {
    return (this.roles[role] && this.roles[role].label) || 'ضيف';
  }
};
