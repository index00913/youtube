const frame = document.querySelector('section');
const api_key = 'AIzaSyDqvoC8xc_hHGMQLtNaUT7GBsbUTB_uHyo';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 50;
const desc_len = 180;

//일정 글자수 이상일때 글자짜르고 말줄임표 붙이기
//문자열.substr(시작위치,자를 글자수)

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > 20 ? (desc = desc.substr(0, 120) + '...') : desc;

			//날자값 가공
			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tags += `
    <article>
      <h2>${
				data.snippet.title.length > tit_len
					? data.snippet.title.substr(0, tit_len) + '...'
					: data.snippet.title
			}</h2>
      <div class='txt'>
        <p>${desc}</p>
        <span>${data.snippet.publishedAt.split('T')}</span>
      </div>
      <div class='pic'>
        <img src='${data.snippet.thumbnails.standard.url}' />
      </div>
    </article>
    `;
		});

		frame.innerHTML = tags;
	});
