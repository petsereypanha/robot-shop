import { APP_BASE_HREF } from '@angular/common';
  import { CommonEngine } from '@angular/ssr';
  import express from 'express';
  import { fileURLToPath } from 'node:url';
  import { dirname, join, resolve } from 'node:path';
  import bootstrap from './src/main.server';

  interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  interface CartItem {
    productId: number;
    quantity: number;
    product: any;
  }

  interface Product {
    id: number;
    description: string;
    name: string;
    imageName: string;
    category: string;
    price: number;
    discount: number;
  }

  const users: Record<string, User> = {
    "jim@joesrobotshop.com": {
      firstName: "Jim",
      lastName: "Cooper",
      email: "jim@joesrobotshop.com",
      password: "very-secret",
    },
    "joe@joesrobotshop.com": {
      firstName: "Joe",
      lastName: "Eames",
      email: "joe@joesrobotshop.com",
      password: "super-secret",
    },
  };

  let cart: CartItem[] = [];
  let products: Product[] = [
    {
      id: 1,
      description:
        "A robot head with an unusually large eye and teloscpic neck -- excellent for exploring high spaces.",
      name: "Large Cyclops",
      imageName: "head-big-eye.png",
      category: "Heads",
      price: 1220.5,
      discount: 0.2,
    },
    {
      id: 17,
      description: "A spring base - great for reaching high places.",
      name: "Spring Base",
      imageName: "base-spring.png",
      category: "Bases",
      price: 1190.5,
      discount: 0,
    },
    {
      id: 6,
      description:
        "An articulated arm with a claw -- great for reaching around corners or working in tight spaces.",
      name: "Articulated Arm",
      imageName: "arm-articulated-claw.png",
      category: "Arms",
      price: 275,
      discount: 0,
    },
    {
      id: 2,
      description:
        "A friendly robot head with two eyes and a smile -- great for domestic use.",
      name: "Friendly Bot",
      imageName: "head-friendly.png",
      category: "Heads",
      price: 945.0,
      discount: 0.2,
    },
    {
      id: 3,
      description:
        "A large three-eyed head with a shredder for a mouth -- great for crushing light medals or shredding documents.",
      name: "Shredder",
      imageName: "head-shredder.png",
      category: "Heads",
      price: 1275.5,
      discount: 0,
    },
    {
      id: 16,
      description:
        "A single-wheeled base with an accelerometer capable of higher speeds and navigating rougher terrain than the two-wheeled variety.",
      name: "Single Wheeled Base",
      imageName: "base-single-wheel.png",
      category: "Bases",
      price: 1190.5,
      discount: 0.1,
    },
    {
      id: 13,
      description: "A simple torso with a pouch for carrying items.",
      name: "Pouch Torso",
      imageName: "torso-pouch.png",
      category: "Torsos",
      price: 785,
      discount: 0,
    },
    {
      id: 7,
      description:
        "An arm with two independent claws -- great when you need an extra hand. Need four hands? Equip your bot with two of these arms.",
      name: "Two Clawed Arm",
      imageName: "arm-dual-claw.png",
      category: "Arms",
      price: 285,
      discount: 0,
    },
    {
      id: 4,
      description: "A simple single-eyed head -- simple and inexpensive.",
      name: "Small Cyclops",
      imageName: "head-single-eye.png",
      category: "Heads",
      price: 750.0,
      discount: 0,
    },
    {
      id: 9,
      description:
        "An arm with a propeller -- good for propulsion or as a cooling fan.",
      name: "Propeller Arm",
      imageName: "arm-propeller.png",
      category: "Arms",
      price: 230,
      discount: 0.1,
    },
    {
      id: 15,
      description: "A rocket base capable of high speed, controlled flight.",
      name: "Rocket Base",
      imageName: "base-rocket.png",
      category: "Bases",
      price: 1520.5,
      discount: 0,
    },
    {
      id: 10,
      description: "A short and stubby arm with a claw -- simple, but cheap.",
      name: "Stubby Claw Arm",
      imageName: "arm-stubby-claw.png",
      category: "Arms",
      price: 125,
      discount: 0,
    },
    {
      id: 11,
      description:
        "A torso that can bend slightly at the waist and equiped with a heat guage.",
      name: "Flexible Gauged Torso",
      imageName: "torso-flexible-gauged.png",
      category: "Torsos",
      price: 1575,
      discount: 0,
    },
    {
      id: 14,
      description: "A two wheeled base with an accelerometer for stability.",
      name: "Double Wheeled Base",
      imageName: "base-double-wheel.png",
      category: "Bases",
      price: 895,
      discount: 0,
    },
    {
      id: 5,
      description:
        "A robot head with three oscillating eyes -- excellent for surveillance.",
      name: "Surveillance",
      imageName: "head-surveillance.png",
      category: "Heads",
      price: 1255.5,
      discount: 0,
    },
    {
      id: 8,
      description: "A telescoping arm with a grabber.",
      name: "Grabber Arm",
      imageName: "arm-grabber.png",
      category: "Arms",
      price: 205.5,
      discount: 0,
    },
    {
      id: 12,
      description: "A less flexible torso with a battery gauge.",
      name: "Gauged Torso",
      imageName: "torso-gauged.png",
      category: "Torsos",
      price: 1385,
      discount: 0,
    },
    {
      id: 18,
      description:
        "An inexpensive three-wheeled base. only capable of slow speeds and can only function on smooth surfaces.",
      name: "Triple Wheeled Base",
      imageName: "base-triple-wheel.png",
      category: "Bases",
      price: 700.5,
      discount: 0,
    },
  ];

  export function app(): express.Express {
    const server = express();
    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = resolve(serverDistFolder, '../browser');
    const indexHtml = join(serverDistFolder, 'index.server.html');

    const commonEngine = new CommonEngine();

    server.set('view engine', 'html');
    server.set('views', browserDistFolder);

    // Middleware for parsing JSON
    server.use(express.json());

    // API Routes
    server.get('/api/products', (req, res) => {
      res.json(products);
    });

    server.get('/api/products/:id', (req, res) => {
      const productId = parseInt(req.params.id);
      const product = products.find(p => p.id === productId);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    });

    server.get('/api/products/category/:category', (req, res) => {
      const category = req.params.category;
      const categoryProducts = products.filter(p => p.category === category);
      res.json(categoryProducts);
    });

    server.get('/api/cart', (req, res) => {
      res.json(cart);
    });

   server.post('/api/cart', (req, res) => {
     const { productId, quantity = 1 } = req.body;
     const product = products.find(p => p.id === productId);

     if (!product) {
       res.status(404).json({ error: 'Product not found' });
       return;
     }

     const existingItem = cart.find((item: CartItem) => item.productId === productId);

     if (existingItem) {
       existingItem.quantity += quantity;
     } else {
       cart.push({ productId, quantity, product });
     }

     res.json({ message: 'Item added to cart', cart });
   });

    server.delete('/api/cart/:productId', (req, res) => {
      const productId = parseInt(req.params.productId);
      cart = cart.filter((item: CartItem) => item.productId !== productId);
      res.json({ message: 'Item removed from cart', cart });
    });

    server.put('/api/cart/:productId', (req, res) => {
      const productId = parseInt(req.params.productId);
      const { quantity } = req.body;
      const item = cart.find((item: CartItem) => item.productId === productId);

      if (item) {
        item.quantity = quantity;
        res.json({ message: 'Cart updated', cart });
      } else {
        res.status(404).json({ error: 'Item not found in cart' });
      }
    });

    server.delete('/api/cart', (req, res) => {
      cart = [];
      res.json({ message: 'Cart cleared' });
    });

    // Serve static files from /browser
    server.get('*.*', express.static(browserDistFolder, {
      maxAge: '1y'
    }));

    // All regular routes use the Angular engine
    server.get('*', (req, res, next) => {
      const { protocol, originalUrl, baseUrl, headers } = req;

      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
    });

    return server;
  }

  function run(): void {
    const port = process.env['PORT'] || 4000;

    const server = app();
    server.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  }

  run();
