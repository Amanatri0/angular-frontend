import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';
import { Products } from './model/productTypes';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { Cart } from './model/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';

export type EcommerceState = {
  products: Products[];
  category: string;
  isLoading: boolean;
  wishlistItems: Products[];
  cartItems: Cart[];
};

const initialState: EcommerceState = {
  products: [],
  category: 'all',
  isLoading: false,
  wishlistItems: [],
  cartItems: [],
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ products, category, wishlistItems, cartItems }) => ({
    // The filtering logic now lives in the store!
    filteredProducts: computed(() => {
      const currentCategory = category();
      const allProducts = products();
      if (currentCategory === 'all') return allProducts;
      return allProducts.filter((p) => p.category === currentCategory);
    }),

    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),

  withMethods(
    (store, toaster = inject(Toaster), dialog = inject(MatDialog), http = inject(HttpClient)) => ({
      updateCategory(category: string) {
        patchState(store, { category });
      },

      addToWishlist: (product: Products) => {
        const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.productid === product.productid)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updateWishlistItems });
        toaster.success('Product Added to wishlist');
      },

      removeFromWishlist: (product: Products) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.productid !== product.productid),
        });

        toaster.success('Product removed from wishlist');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
        toaster.success('Wishlist cleared');
      },

      addToCart: (product: Products, quantity = 1) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((i) => i.product.productid === product.productid);

        const updateCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({
            product,
            quantity,
          });
        });

        patchState(store, { cartItems: updateCartItems });
        toaster.success(
          existingItemIndex !== -1 ? 'Product added again' : 'Product added to the Cart'
        );
      },

      setItemQuantity(params: { productId: number; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.productid === params.productId);

        if (index === -1) {
          return;
        }
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      removeFromCart(product: Products) {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.productid !== product.productid),
        });
      },

      // To fetch all the products in the database
      async loadProducts() {
        patchState(store, { isLoading: true });

        try {
          const products = await lastValueFrom(
            http.get<Products[]>('http://localhost:5198/api/product/all')
          );

          patchState(store, { products, isLoading: false });
        } catch (error) {
          patchState(store, { isLoading: false });
          console.error(error);
        }
      },

      // To place order
      async proceedToCheckout() {
        const items = store.cartItems();

        if (items.length === 0) {
          toaster.error('Your cart is empty');
          return;
        }

        patchState(store, { isLoading: true });

        try {
          const orderRequests = items.map((item) => {
            const payload = {
              UserId: 1,
              ProductId: item.product.productid,
              Quantity: item.quantity,
            };

            return lastValueFrom(http.post('http://localhost:5198/api/order/create', payload));
          });

          await Promise.all(orderRequests);

          patchState(store, { cartItems: [] });

          toaster.success('Order placed successfully!');

          const updatedProducts = await lastValueFrom(
            http.get<Products[]>('http://localhost:5198/api/product/all')
          );
          patchState(store, { products: updatedProducts });
        } catch (error) {
          console.error('Checkout failed:', error);
          toaster.error('Failed to place order. Check stock availability.');
        } finally {
          patchState(store, { isLoading: false });
        }
      },
    })
  )
);
