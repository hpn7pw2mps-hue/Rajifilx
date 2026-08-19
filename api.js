// ============================================
// طبقة الاتصال بـ TMDB API
// ============================================
const TMDB = {
  isConfigured() {
    return CONFIG.TMDB_API_KEY && CONFIG.TMDB_API_KEY !== 'YOUR_TMDB_API_KEY';
  },

  async _get(path, params = {}) {
    if (!this.isConfigured()) {
      throw new Error('NO_API_KEY');
    }
    const url = new URL(CONFIG.TMDB_BASE + path);
    url.searchParams.set('api_key', CONFIG.TMDB_API_KEY);
    url.searchParams.set('language', CONFIG.LANG);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('TMDB_ERROR_' + res.status);
    return res.json();
  },

  popularMovies(page = 1) {
    return this._get('/movie/popular', { page });
  },
  popularSeries(page = 1) {
    return this._get('/tv/popular', { page });
  },
  topRatedMovies(page = 1) {
    return this._get('/movie/top_rated', { page });
  },
  searchMulti(query, page = 1) {
    return this._get('/search/multi', { query, page });
  },
  movieDetails(id) {
    return this._get(`/movie/${id}`);
  },
  tvDetails(id) {
    return this._get(`/tv/${id}`);
  },

  posterUrl(path) {
    return path ? CONFIG.IMG_BASE + path : null;
  },
  backdropUrl(path) {
    return path ? CONFIG.BACKDROP_BASE + path : null;
  }
};
