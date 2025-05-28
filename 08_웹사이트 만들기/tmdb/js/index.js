const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTAyODM4ODM0MzUyNTczMTRjOWFiODQ3MTAxYjAwYyIsIm5iZiI6MTc0ODM5Mzk5NS4yMywic3ViIjoiNjgzNjYwMGJhMzJjNjllNjFjMDU1ZWEyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cSY5NOcTYGpxWtzEe6Mkyqi8eKbFGyYhs_f30rLFuEQ',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = '' //모든 row를 담을 변수

      //5행 4열
      //results.lenght = 20
      //5번 반복 => row를 5개 만들어준다
      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">' //하나의row를담을 변수
         //4번 반복 => col을 4개 만들어준다
         for (let j = 0; j < 4; j++) {
            const index = i + j
            // if (index >= results.lenght) break //results배열을 벗어나면 중단

            const movie = results[index]

            rowHtml += `
                       <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="#">
                           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="poster" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${movie.vote_average.toFixed(1)}점</p>
                        </div>
                     </div>
                 </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러발생:', error)
   }
}

getPlayingMovies(url)
