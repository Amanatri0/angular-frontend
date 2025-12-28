import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Products } from './model/productTypes';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { Cart } from './model/cart';

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

  withMethods((store, toaster = inject(Toaster), http = inject(HttpClient)) => ({
    // Method to update the category from any component
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

    // Method to fetch products
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          http.get<{ message: string; data: Products[] }>('http://localhost:5198/api/product/all')
        ),
        tap((response) => {
          patchState(store, {
            products: response.data || [],
            isLoading: false,
          });
        })
      )
    ),
  }))
);
