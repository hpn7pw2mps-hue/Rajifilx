(function () {
  const root = document.getElementById('root');
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') === 'tv' ? 'tv' : 'movie';
  const id = params.get('id');

  if (!id) {
    root.innerHTML = `<div class="container"><div class="empty-state" style="margin-top:40px;">ما لكينا هذا العنوان.</div></div>`;
    return;
  }

  root.innerHTML = `<div class="container"><p style="margin-top:40px;color:#8A93A6;">جاري التحميل...</p></div>`;

  const fetcher = type === 'tv' ? TMDB.tvDetails(id) : TMDB.movieDetails(id);
  fetcher.then(renderDetails).catch(handleError);

  function renderDetails(d) {
    const title = d.title || d.name;
    const date = d.release_date || d.first_air_date || '';
    const backdrop = TMDB.backdropUrl(d.backdrop_path);
    const poster = TMDB.posterUrl(d.poster_path);
    const runtime = d.runtime
      ? `${d.runtime} دقيقة`
      : (d.episode_run_time && d.episode_run_time[0] ? `${d.episode_run_time[0]} دقيقة / حلقة` : null);
    const seasons = d.number_of_seasons ? `${d.number_of_seasons} مواسم` : null;
    const genres = (d.genres || []).map(g => g.name);

    root.innerHTML = `
      <div class="details-hero" style="${backdrop ? `background-image:url('${backdrop}')` : ''}"></div>
      <div class="details-body">
        <div class="details-poster">
          ${poster ? `<img src="${poster}" alt="${title}">` : ''}
        </div>
        <div class="details-main">
          <a class="back-link" href="index.html">← رجوع للرئيسية</a>
          <h1>${title}</h1>
          <div class="details-badges">
            ${date ? `<span class="badge">${date.slice(0, 4)}</span>` : ''}
            ${runtime ? `<span class="badge">${runtime}</span>` : ''}
            ${seasons ? `<span class="badge">${seasons}</span>` : ''}
            <span class="badge">★ ${d.vote_average ? d.vote_average.toFixed(1) : '—'}</span>
          </div>
          ${genres.length ? `<div class="details-badges">${genres.map(g => `<span class="badge">${g}</span>`).join('')}</div>` : ''}

          <h3>القصة</h3>
          <p>${d.overview || 'ما فيه وصف متوفر لهذا العنوان.'}</p>
        </div>
      </div>
      <footer>RajFlix — تطبيق مصغّر خاص، تأسس بواسطة Rajisma.</footer>
    `;
  }

  function handleError(e) {
    const msg = e.message === 'NO_API_KEY'
      ? 'ما تم إعداد مفتاح TMDB API بعد. راجع ملف config.js.'
      : 'صار خطأ بجلب تفاصيل هذا العنوان.';
    root.innerHTML = `<div class="container"><div class="empty-state" style="margin-top:40px;">${msg}</div></div>`;
  }
})();
