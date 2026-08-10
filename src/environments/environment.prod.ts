export const environment = {
  production: true,
  apiBaseUrl: 'https://alhendalcompany-001-site9.atempurl.com',
  apiEndpoints: {
    auth: {
      login: '/api/Auth/login',
      register: '/api/Auth/register',
      logout: '/api/Auth/logout',
    },
    categories: {
      getAll: '/api/Categories/GetAllCategories',
      getById: '/api/Categories/GetCategoryById',
    },
    products: {
      getAll: '/api/Products/GetAllProducts',
      getById: '/api/Products/GetProductById',
    },
    teawareCategories: {
      getAll: '/api/TeawareCategories/GetAllTeawareCategories',
      getById: '/api/TeawareCategories/GetTeawareCategoryById',
    },
    teawares: {
      getAll: '/api/Teawares/GetAllTeawares',
      getById: '/api/Teawares/GetTeawareById',
    },
    profile: {
      get: '/api/Profile',
      update: '/api/Profile',
      addresses: {
        getAll: '/api/Profile/addresses/GetAddresses',
        getById: '/api/Profile/addresses/GetAddress',
        add: '/api/Profile/addresses/AddAddress',
        update: '/api/Profile/addresses/UpdateAddress',
        delete: '/api/Profile/addresses/DeleteAddress',
      },
    },
    search: '/api/Search',
    cart: {
      get: '/api/Cart',
      add: '/api/Cart/items/AddToCart',
      update: '/api/Cart/items/UpdateItem',
      remove: '/api/Cart/items/RemoveItem',
    },
    wishlist: {
      get: '/api/Wishlist/GetWishlist',
      add: '/api/Wishlist/items/AddItem',
      remove: '/api/Wishlist/items/RemoveItem',
    },
    orders: {
      getMyOrders: '/api/Orders/GetMyOrders',
      getById: '/api/Orders/GetOrder',
      checkout: '/api/Orders/Checkout',
      cancel: '/api/Orders/CancelOrder',
    },
  },
};
