let wrapper = document.querySelector('.cards')
const btnSeeMore = document.querySelector('.btn__se-more')
const loading = document.querySelector('.loading')
let cards = document.querySelector('.cards')
const headerLogin = document.querySelector('.header__login')
const modal = document.querySelector('.modal')
const back = document.querySelector('.back')
const modalClose = document.querySelector('.modal__close')


const API_URL = 'https://fakestoreapi.com'


let limitCount = 8
let count = 1


async function fetchData(URL) {
    const data = await fetch(`${URL}/products?limit=${limitCount * count}`)
    console.log(data);
    data
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = 'none'
            btnSeeMore.innerHTML = 'See More'
            btnSeeMore.removeAttribute('disabled')
        })
}
fetchData(API_URL)


function createCard(data) {
    let cards = ''
    data.forEach(product => {
        cards += `
                <div class="card">
                    <div class="card__img">
                        <img src="${product.image}" alt="">
                    </div>
                    <div class="card__icons">
                        <div class="card__icons__img">
                            <img src="./images/savat.svg" alt="">
                        </div>
                        <div class="card__icons__img">
                            <img src="./images/heart.svg" alt="">
                        </div>
                        <div class="card__icons__img">
                            <img src="./images/search.svg" alt="">
                        </div>
                    </div>
                    <h3 class="card__title">${product.title}</h3>
                    <p class="card__price">${product.price}</p>
                    <button class="btn" data-id = "${product.id}" >Kop</button>
                </div>
        `
    });
    wrapper.innerHTML = cards
}


function createLoad(count) {
    let loadingCards = ''
    for (let i = 0; i < count; i++) {
        loadingCards += `
         <div class="loading__item">
            <div class="loading__img bg__animation"></div>
            <div class="loading__title bg__animation"></div>
            <div class="loading__title bg__animation"></div>
        </div>
        `
    };
    loading.innerHTML = loadingCards

}
createLoad(limitCount)


btnSeeMore.addEventListener('click', () => {
    count++
    fetchData(API_URL)
    btnSeeMore.innerHTML = 'Loading....'
    btnSeeMore.setAttribute('disabled', true)
})
cards.addEventListener('click', (e) => {
    if (e.target.className === "btn") {
        let id = e.target.dataset.id
        window.open(`./pages/product.html?productId=${id}`, '_self')
    }
})
headerLogin.addEventListener('click', () => {
    modal.style.display = 'flex'
    back.style.display = 'block'
})
back.addEventListener('click', () => {
    modal.style.display = 'none'
    back.style.display = 'none'
})
modalClose.addEventListener('click', () => {
    modal.style.display = 'none'
    back.style.display = 'none'
})

/* Admin */
const form = document.querySelector('.form')
const userName = document.querySelector('.username')
const password = document.querySelector('.password')
const API_URLL = 'https://dummyjson.com'
let user = {}

form.addEventListener('submit', (e) => {
    console.log('ok');
    e.preventDefault()
    user = {
        username: userName.value,
        password: password.value
    }
    signIn(user)
})

async function signIn(user) {
    await fetch(`${API_URLL}/auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            console.log('res>>', res);
            if (res.message === 'Invalid credentials') {
                return alert('username or password is incorrect')
            }
            localStorage.setItem('x-auth-token', res.token)
            window.open('/pages/admin.html', '_self')

        })
        .catch(err => console.log('err>>', err))
}