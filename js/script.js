let name = document.getElementById('name');
let price = document.getElementById('price');
let rating = document.getElementById('rating');

// view
let tbodyview = document.getElementById('view');

let isedit = false;
let isindex;
const getdata = () => {
    let data = JSON.parse(localStorage.getItem ('Product'));

    if(data){
        return data
    }else{  
        return [] ;
    }
}
let storage = getdata();

const addData = () => {
    event.preventDefault();

    let ProductDetails = {
        id: isindex ? isindex : Math.floor(Math.random() * 10000),
        name: name.value,
        price: price.value,
        quantity: 1, 
        totalPrice: parseFloat(price.value),
        rating: rating.value,
    };
    
    if(isedit){

        let data = [...storage];

        const updatedData = data.map((record) => {
            if (record.id === isindex) {
                return ProductDetails;
            } else {
                return record;
            }
        });

        storage = updatedData;

        isedit = false;
        isindex = undefined ;
    }else{
        storage = [...storage, ProductDetails];

    }

    localStorage.setItem('Product' , JSON.stringify(storage));

    name.value = "";
    price.value = "";
    rating.value = "";

    dataview();
    
}
// EditData
const EditData  = (id) => {

    // console.log("Ankur");

    let data = [...storage];

    let singleRec = data.filter((data) => {
        return data.id == id;

    });

    name.value = singleRec[0].name;
    price.value = singleRec[0].price;
    rating.value = singleRec[0].rating;

    isedit = true;
    isindex = id

}

// edit

const deleteData = (id) => {
    // console.log("deleteData")
    let data = [...storage];

    let deleteData = data.filter((del) => {
        return del.id !== id;
    });
    localStorage.setItem('Product', JSON.stringify(deleteData));

    storage = deleteData;

    dataview();


}

const dataview = () => {
    tbodyview.innerHTML = "";

    storage.forEach((item) => {
        let total = item.price * item.quantity;

        tbodyview.innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1"></td>
            <td>${total.toFixed(2)}</td>
            <td>${item.rating}</td>
            <td>
                <button class="btn btn-primary" onclick="EditData(${item.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteData(${item.id})">Delete</button>
            </td>
        </tr>`;
    });
};

// updataQuntity
const updateQuantity = (id, quantity) => {
    let index = storage.findIndex(item => item.id === id);
    storage[index].quantity = parseInt(quantity);
    storage[index].totalPrice = parseFloat(storage[index].price) * parseInt(quantity);
    localStorage.setItem('Product', JSON.stringify(storage));
    dataview();
};


dataview ();

