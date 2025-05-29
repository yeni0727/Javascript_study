const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTAyODM4ODM0MzUyNTczMTRjOWFiODQ3MTAxYjAwYyIsIm5iZiI6MTc0ODM5Mzk5NS4yMywic3ViIjoiNjgzNjYwMGJhMzJjNjllNjFjMDU1ZWEyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cSY5NOcTYGpxWtzEe6Mkyqi8eKbFGyYhs_f30rLFuEQ',
   },
}

const url = 'https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=1&with_original_language=ko'

const getTvShows = async () => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      //2열 10행
      for (let i = 0; i < 20; i += 2) {
         let rowHtml = '<div class="row">'
         for (let j = 0; j < 2; j++) {
            const index = i + j
            const show = results[index]
            rowHtml += `
               <div class="col-sm-6 p-2">
                  <div class="card">
                <a href="./detail_tv.html?series_id=${show.id}">
        <img src="${show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : './images/person.png'}" class="card-img-top poster" alt="${show.name}" />
      </a>
                     </a>
                     <div class="card-body">
                        <p class="card-text title">${show.name}</p>
                        <p class="card-text average">${Number(show.vote_average) === 0 ? '미반영' : show.vote_average.toFixed(1) + '점'}</p>
                        <p>${show.overview.length > 141 ? show.overview.slice(0, 130) + '...' : show.overview}</p>

                     </div>
                  </div>
               </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
         container.innerHTML = rowsHtml
      }
   } catch (error) {
      console.error('에러발생:', error)
   }
}

getTvShows()
