const filledArrow = `<svg class="arrow-star__state arrow-star__state--hover" aria-hidden="true" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1012 0.843132C22.4664 0.0942219 23.5336 0.0942239 23.8988 0.843134L25.8437 4.83128C26.1287 5.41583 26.8871 5.57704 27.3853 5.15896L30.7842 2.30666C31.4224 1.77104 32.3974 2.20512 32.4264 3.03782L32.581 7.47221C32.6036 8.12218 33.2309 8.57792 33.8561 8.39862L38.1212 7.17534C38.9221 6.94563 39.6362 7.73872 39.324 8.51125L37.6616 12.6251C37.418 13.2281 37.8056 13.8996 38.4497 13.9901L42.8436 14.6073C43.6687 14.7233 43.9985 15.7382 43.3991 16.317L40.2072 19.3991C39.7393 19.8508 39.8204 20.6219 40.3719 20.9665L44.1349 23.3176C44.8415 23.7591 44.73 24.8205 43.947 25.1054L39.7774 26.6227C39.1663 26.8451 38.9267 27.5825 39.2904 28.1217L41.7718 31.8C42.2378 32.4908 41.7042 33.415 40.873 33.3568L36.4467 33.0471C35.7979 33.0016 35.2791 33.5779 35.3921 34.2183L36.1629 38.5879C36.3076 39.4085 35.4442 40.0358 34.7085 39.6446L30.7909 37.5613C30.2167 37.2559 29.5084 37.5713 29.3511 38.2023L28.2779 42.5077C28.0764 43.3161 27.0325 43.538 26.5196 42.8814L23.788 39.3848C23.3877 38.8723 22.6123 38.8723 22.212 39.3848L19.4804 42.8814C18.9675 43.538 17.9236 43.3161 17.7221 42.5077L16.6489 38.2023C16.4916 37.5713 15.7833 37.2559 15.2091 37.5613L11.2915 39.6446C10.5558 40.0358 9.69241 39.4085 9.83714 38.588L10.6079 34.2183C10.7209 33.5779 10.2021 33.0016 9.55328 33.0471L5.12702 33.3568C4.29584 33.415 3.76224 32.4908 4.22821 31.8L6.70961 28.1217C7.07332 27.5825 6.83372 26.8451 6.22257 26.6227L2.05298 25.1054C1.27 24.8205 1.15845 23.7591 1.86508 23.3176L5.62808 20.9665C6.17964 20.6219 6.26069 19.8508 5.79283 19.3991L2.60087 16.317C2.00148 15.7382 2.33126 14.7233 3.15638 14.6073L7.55031 13.9901C8.19435 13.8996 8.58203 13.2281 8.33836 12.6251L6.67596 8.51125C6.36378 7.73872 7.07789 6.94563 7.87881 7.17534L12.1439 8.39862C12.7691 8.57792 13.3964 8.12218 13.419 7.47222L13.5736 3.03783C13.6026 2.20512 14.5776 1.77104 15.2158 2.30666L18.6147 5.15896C19.1129 5.57704 19.8713 5.41583 20.1563 4.83128L22.1012 0.843132Z" fill="currentColor"/>
<path d="M15 22C14.4477 22 14 22.4477 14 23C14 23.5523 14.4477 24 15 24V23V22ZM15 23V24H31V23V22H15V23ZM31.7071 23.7071C32.0976 23.3166 32.0976 22.6834 31.7071 22.2929L25.3431 15.9289C24.9526 15.5384 24.3195 15.5384 23.9289 15.9289C23.5384 16.3195 23.5384 16.9526 23.9289 17.3431L29.5858 23L23.9289 28.6569C23.5384 29.0474 23.5384 29.6805 23.9289 30.0711C24.3195 30.4616 24.9526 30.4616 25.3431 30.0711L31.7071 23.7071Z" fill="white"/>
</svg>`;

export function arrowSvg() {
  return `<img class="arrow-star__state arrow-star__state--default" src="public/assets/vectors/arrow-default.svg" alt="" />${filledArrow}`;
}

export function arrowStar() {
  return `<span class="arrow-star" aria-hidden="true">${arrowSvg()}</span>`;
}

export function primaryButton(label) {
  return `<button class="primary-button" type="button"><span>${label}</span><span class="simple-arrow" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3.2 11.4 4.4 12.6 11.2 5.8V11h1.6V3.2H5v1.6h5.2z"/></svg></span></button>`;
}

export function eventCard(event) {
  const tags = event.tags.map((tag) => `<span class="card-tag">${tag}</span>`).join('');
  return `<article class="event-card" style="--card-accent:${event.color}">
    <a class="card-link" href="placeholder.html" aria-label="${event.title}"></a>
    <div class="event-photo"><img src="${event.image}" alt="" loading="lazy" /><div class="card-tags">${tags}</div></div>
    <div class="event-info">
      <h3>${event.title}</h3>
      <div class="event-meta"><span>${event.date}</span><span>${event.place}</span></div>
      <div class="event-bottom"><strong>${event.price}</strong>${arrowStar()}</div>
    </div>
  </article>`;
}

export function surveyCard() {
  return `<article class="survey-card">
    <svg class="survey-definitions" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="survey-photo-shape" clipPathUnits="objectBoundingBox">
          <path d="M.817812 .499131 C.918432 .499131 1 .555193 1 .624350 C1 .693435 .918600 .749450 .818123 .749566 C.918600 .749681 1 .805696 1 .874781 .999999 .943937 .918431 1 .817812 1H.182188 C.081569 1 .000001 .943937 0 .874781 C0 .805697 .081398 .749683 .181873 .749566 C.081398 .749449 0 .693434 0 .624350 C0 .555193 .081568 .499131 .182188 .499131 C.081569 .499131 .000001 .443069 0 .373913 C0 .309757 .070199 .256876 .160684 .249563 C.070200 .242250 0 .189374 0 .125219 C0 .056062 .081568 0 .182188 0H.817812 C.918432 0 1 .056062 1 .125219 C1 .189375 .929798 .242251 .839312 .249563 C.929799 .256875 1 .309756 1 .373913 C.999999 .443069 .918431 .499131 .817812 .499131Z" />
        </clipPath>
      </defs>
    </svg>
    <div class="survey-photo" aria-hidden="true"><img src="public/assets/images/survey.png" alt="" loading="lazy" /></div>
    <div class="survey-wash" aria-hidden="true"></div>
    <div class="survey-content">
      <h3>Персонализируйте рекомендации!</h3>
      <button type="button" class="survey-button" data-survey-trigger aria-haspopup="dialog">Пройти опрос</button>
    </div>
  </article>`;
}

export function articleCard(article) {
  const tags = article.tags.map((tag) => `<span class="card-tag">${tag}</span>`).join('');
  return `<article class="article-card" style="--article-accent:${article.color}">
    <a class="card-link" href="placeholder.html" aria-label="${article.title}"></a>
    <div class="article-photo"><img src="${article.image}" alt="" loading="lazy" /><div class="card-tags">${tags}</div></div>
    <div class="article-info">
      <div class="article-copy"><h3>${article.title}</h3><p>${article.description}</p></div>
      <div class="article-bottom"><time>${article.date}</time>${arrowStar()}</div>
    </div>
  </article>`;
}
