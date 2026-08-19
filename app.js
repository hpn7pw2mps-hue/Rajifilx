(function () {
  const user = Auth.requireLogin();
  if (!user) return;

  document.getElementById('welcomeName').textContent = user.name;
  document.getElementById('roleChip').textContent = Auth.roleLabel(user.role);

  document.getElementById('logoutBtn').addEventListener('click', () => {
    Auth.logout();
    window.location.href = 'index.html';
  });

  const content = document.getElementById('content');
  const setupNote = document.getElementById('setupNote');
  const tabs = document.querySelectorAll('.tab');
  const searchTab = document.getElementById('searchTab');
  let activeTab = 'movies';

  function skeletonGrid(n = 10) {
    return `<div class="grid">${Array.from({ length: n }).map(() =>
      `<div class="card"><div class="poster skeleton"></div><div class="info">
        <div class="skeleton" style="height:14px;border-radius:4px;margin-bottom:6px;"></div>
        <div class="skeleton" style="height:10px;width:60%;border-radius:4px;"></div>
      </div></div>`
    ).join('')}</div>`;
  }

  function cardHTML(item, kind) {
    const title = item.title || item.name || 'بدون عنوان';
    const date = (item.release_date || item.first_air_date || '').slice(0, 4);
    const poster = TMDB.posterUrl(item.poster_path);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : '—';
    return `
      <a class="card" href="movie.html?type=${kind}&id=${item.id}">
        ${poster
          ? `<img class="poster" src="${poster}" alt="${title}" loading="lazy">`
          : `<div class="poster">لا توجد صورة</div>`}
        <div class="info">
          <p class="title" title="${title}">${title}</p>
          <div class="meta"><span>${date || ''}</span><span class="rating">★ ${rating}</span></div>
        </div>
      </a>`;
  }

  async function renderMovies() {
    content.innerHTML = `<h2 class="section-title"><span class="idx">01</span> أفلام رائجة الآن</h2>` + skeletonGrid();
    try {
      const data = await TMDB.popularMovies();
      content.innerHTML = `<h2 class="section-title"><span class="idx">01</span> أفلام رائجة الآن</h2>
        <div class="grid">${data.results.map(m => cardHTML(m, 'movie')).join('')}</div>`;
    } catch (e) {
      handleFetchError(e);
    }
  }

  async function renderSeries() {
    content.innerHTML = `<h2 class="section-title"><span class="idx">02</span> مسلسلات رائجة الآن</h2>` + skeletonGrid();
    try {
      const data = await TMDB.popularSeries();
      content.innerHTML = `<h2 class="section-title"><span class="idx">02</span> مسلسلات رائجة الآن</h2>
        <div class="grid">${data.results.map(m => cardHTML(m, 'tv')).join('')}</div>`;
    } catch (e) {
      handleFetchError(e);
    }
  }

  async function renderSearch(query) {
    searchTab.style.display = 'inline-block';
    setActiveTab('search');
    content.innerHTML = `<h2 class="section-title">نتائج البحث عن "${query}"</h2>` + skeletonGrid();
    try {
      const data = await TMDB.searchMulti(query);
      const items = data.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv');
      content.innerHTML = items.length
        ? `<h2 class="section-title">نتائج البحث عن "${query}"</h2>
           <div class="grid">${items.map(m => cardHTML(m, m.media_type)).join('')}</div>`
        : `<h2 class="section-title">نتائج البحث عن "${query}"</h2>
           <div class="empty-state">ما لكينا شي مطابق. جرب كلمة ثانية.</div>`;
    } catch (e) {
      handleFetchError(e);
    }
  }

  function handleFetchError(e) {
    if (e.message === 'NO_API_KEY') {
      setupNote.style.display = 'block';
      content.innerHTML = '';
    } else {
      content.innerHTML = `<div class="empty-state">صار خطأ بجلب البيانات. تأكد من اتصالك بالإنترنت أو من صحة مفتاح API.</div>`;
    }
  }

  function setActiveTab(name) {
    activeTab = name;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === 'search') return;
      setActiveTab(tab.dataset.tab);
      tab.dataset.tab === 'movies' ? renderMovies() : renderSeries();
    });
  });

  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  function doSearch() {
    const q = document.getElementById('searchInput').value.trim();
    if (q) renderSearch(q);
  }

  renderMovies();
})();
