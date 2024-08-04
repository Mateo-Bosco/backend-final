const socket = io();

socket.on('products', products =>{
    const tbody = document.getElementById('products-body');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = tbody.insertRow();

        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.status ? 'Activiado': 'Desactivado'}</td>
        <td>${product.thumbnails > 0 ? product.thumbnails[0] : 'No hay imagen'}</td>
        `;
    });
});

const form = document.getElementById('product-form');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const product = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        category: category
    };

    socket.emit('addProduct', product);
    form.requestFullscreen();
});