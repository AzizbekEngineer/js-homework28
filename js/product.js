const API_URL = 'https://fakestoreapi.com'
let productCards = document.querySelector('.product__cards')
const loading = document.querySelector('.loading')



async function fetchData(URL) {
    let param = new URLSearchParams(window.location.search)
    let id = param.get('productId')
    console.log('ok');

    const data = await fetch(`${URL}/products/${id}`)
    console.log(data);
    data
        .json()
        .then(res => createContent(res))
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = 'none'
        })
}
fetchData(API_URL)

function createContent(data) {
    console.log(data);
    productCards.innerHTML = `
                <div class="product__card">
                    <div class="product__card__img">
                        <img  src="${data.image}"
                        alt="">
                        <br>
                    </div>
                    <div class="product__info">
                        <h3><b>Name:</b>${data.title}</h3>
                        <p><b>Price:</b>${data.price}</p>
                        <p><b>Count:</b>${data.rating.count}</p>
                        <p><b>Rate:</b>${data.rating.rate}</p>
                        <p><b>Category:</b>${data.category}</p>
                        <p><b>Product Info:</b>${data.description}</p>
                    </div>
                </div>
    `
}
// {
//     "createdAt": "2024-04-24T05:07:25.248Z",
//         "updatedAt": "2024-04-24T02:20:00.347Z",
//             "name": "sweet grains",
//                 "img": "https://cdn.pixabay.com/photo/2012/06/27/15/02/candy-50838_640.jpg",
//                     "unit": "kg",
//                         "info": "delicious and colorful sweet grains",
//                             "size": 10,
//                                 "category": "sweetness",
//                                     "price": "30000 so'm",
//                                         "id": "17"
// }