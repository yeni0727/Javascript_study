const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTAyODM4ODM0MzUyNTczMTRjOWFiODQ3MTAxYjAwYyIsIm5iZiI6MTc0ODM5Mzk5NS4yMywic3ViIjoiNjgzNjYwMGJhMzJjNjllNjFjMDU1ZWEyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cSY5NOcTYGpxWtzEe6Mkyqi8eKbFGyYhs_f30rLFuEQ',
   },
}

const urlParams = new URLSearchParams(location.search)
const tvId = urlParams.get('series_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR&page=1&with_original_language=ko`

const mainContainer = document.querySelector('main .container')

const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
       <div class="row">
         <div class="col-sm-3" style="text-align:center">
           <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%" />
         </div>
         <div class="col-sm-9 movie-detail">
           <h2>${data.name}</h2>
           <p>원제 ${data.original_name}, ${data.original_language}</p>
           <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</p>
           <ul class="movie-info">
             <li>최근방영일 ${data.last_air_date}</li>
             <li>처음방영일 ${data.first_air_date}</li>
           </ul>
           <br/>
           <p>${data.overview}</p>
         </div>
       </div>`

      mainContainer.innerHTML += rowHtml

      //시즌
      let seasonsHtml = '<div style="margin-top:30px;"'
      data.seasons.forEach((season) => {
         const seasonNum = season.season_number
         const airDate = season.air_date || '방영일 정보 없음'
         const vote = season.vote_average ? season.vote_average.toFixed(1) : '미반영'
         seasonsHtml += `<p>시즌${seasonNum} (평점 ${vote}) 보러가기 - ${airDate} 방영</p>`
      })

      seasonsHtml += '</div>'

      mainContainer.innerHTML += seasonsHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailTv(tvDetailUrl)
