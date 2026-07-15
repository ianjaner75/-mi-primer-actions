// Create a web API using express and JavaScript with routes for products, users, and orders. 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Mi primera interfaz</title>
            <style>
                :root {
                    color-scheme: light;
                    font-family: Arial, Helvetica, sans-serif;
                }

                body {
                    margin: 0;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f4f7fb 0%, #e8eef7 100%);
                    color: #1f2937;
                }

                .container {
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 32px 20px 48px;
                }

                .hero {
                    background: white;
                    border-radius: 20px;
                    padding: 28px;
                    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
                    margin-bottom: 24px;
                }

                h1 {
                    margin: 0 0 12px;
                    font-size: 2rem;
                }

                p {
                    line-height: 1.6;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 16px;
                }

                .card {
                    background: white;
                    border-radius: 18px;
                    padding: 18px;
                    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
                }

                .btns {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 16px;
                }

                a.button {
                    display: inline-block;
                    padding: 10px 14px;
                    border-radius: 999px;
                    text-decoration: none;
                    background: #2563eb;
                    color: white;
                    font-weight: 600;
                }

                a.button.secondary {
                    background: #e5e7eb;
                    color: #111827;
                }

                pre {
                    white-space: pre-wrap;
                    word-break: break-word;
                    background: #0f172a;
                    color: #e2e8f0;
                    padding: 14px;
                    border-radius: 12px;
                    overflow-x: auto;
                }
            </style>
        </head>
        <body>
            <main class="container">
                <section class="hero">
                    <h1>Mi primera interfaz</h1>
                    <p>
                        Esta página te permite ver el proyecto en el navegador.
                        Usa los botones para abrir las rutas de la API o ver los datos.
                    </p>
                    <div class="btns">
                        <a class="button" href="/products">Ver productos</a>
                        <a class="button secondary" href="/users">Ver usuarios</a>
                        <a class="button secondary" href="/orders">Ver pedidos</a>
                    </div>
                </section>

                <section class="grid">
                    <div class="card">
                        <h2>Productos</h2>
                        <pre id="products">Cargando...</pre>
                    </div>
                    <div class="card">
                        <h2>Usuarios</h2>
                        <pre id="users">Cargando...</pre>
                    </div>
                    <div class="card">
                        <h2>Pedidos</h2>
                        <pre id="orders">Cargando...</pre>
                    </div>
                </section>
            </main>

            <script>
                const renderData = async (id, url) => {
                    const response = await fetch(url);
                    const data = await response.json();
                    document.getElementById(id).textContent = JSON.stringify(data, null, 2);
                };

                renderData('products', '/products');
                renderData('users', '/users');
                renderData('orders', '/orders');
            </script>
        </body>
        </html>
    `);
});

// Sample data
let products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
];

let users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
]; 

let orders = [
    { id: 1, userId: 1, productId: 2, quantity: 1 },
    { id: 2, userId: 2, productId: 1, quantity: 3 },
];

// Routes for products
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Routes for users
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Routes for orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

app.post('/orders', (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 