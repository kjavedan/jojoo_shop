import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { getUserCart, addToCart, updateCart, deleteFromCart } from '@/api/cart'
import { useCartStore } from '@/stores/cart';


export const useCartLogic = () => {

  //routers
  const router = useRouter()

  //store
  const userStore = useUserStore()
  const cartStore = useCartStore()

  const { userDetails } = storeToRefs(userStore)

  //refs
  const cartItemQty = ref(0);
  const isCheckoutBtn = ref(false);
  const cartId = ref(null);
  const loading = ref(false)


  //funcs
  const handleClick = (id) => {
    handleAddToCart(id);
    isCheckoutBtn.value = true;
  };

  const handleIncrease = (id) => {
    handleUpdateCart(id, cartItemQty.value + 1);
  };

  const handleDecrease = (id) => {
    handleUpdateCart(id, cartItemQty.value - 1);

    if (cartItemQty.value === 1) {
      handleDeleteFromCart();
    }
    if (cartItemQty.value <= 0) {
      isCheckoutBtn.value = false;
    }
  };

  const handleCheckout = () => {
    cartItemQty.value = 0;
    isCheckoutBtn.value = false;
    router.push({ name: 'cart' });
  };

  const handleAddToCart = async (id) => {
   
    const userId = userDetails.value._id;
    try {
      const res = await addToCart({ userId, productId: id, qty: 1 });
      if (res.status === 201) {
        cartItemQty.value = 1;
        fetchUserCartData(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFromCart = async (id) => {
    try {
      const res = await deleteFromCart(cartId.value);
      if (res.status === 200) {
        cartItemQty.value = 0;
        isCheckoutBtn.value = false;
        fetchUserCartData(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCart = async (id, qty) => {
    try {
      const res = await updateCart(cartId.value, { qty });
      if (res.status === 200) {
        fetchUserCartData(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  const fetchUserCartData = async (id) => {
    try {
      const res = await getUserCart(userDetails.value?._id);
      loading.value = true
      if (res.status === 200) {
        cartStore.updateStoreCart(res.data)
        const isHeldItemExistInCart = res.data.cartData.find(
          (item) => item.productId === id
        );
        if (isHeldItemExistInCart) {
          cartId.value = isHeldItemExistInCart._id;
          cartItemQty.value = isHeldItemExistInCart.qty;
          isCheckoutBtn.value = true;
        }
        loading.value = false
    }
    } catch (error) {
        loading.value = false
        console.log(error);
    }
  };


  return {
    cartItemQty,
    isCheckoutBtn,
    handleClick,
    handleIncrease,
    handleDecrease,
    handleCheckout,
    handleAddToCart,
    handleDeleteFromCart,
    handleUpdateCart,
    fetchUserCartData,
    loading,
  };
};
