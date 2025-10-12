'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user } = useUser()
    const { getToken } = useAuth()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    // i18n language state (en | my)
    const [lang, setLang] = useState('en')

    // Centralized translation strings. Add keys as needed.
    const translations = {
        en: {
            home: 'Home',
            shop: 'Shop',
            aboutUs: 'About Us',
            contactUs: 'Contact Us',
            reportWaste: 'Report Waste',
            sellerDashboard: 'Seller Dashboard',
            account: 'Account',
            myOrders: 'My Orders',
            products: 'Products',
            cart: 'Cart',
            company: 'Company',
            privacyPolicy: 'Privacy Policy',
            getInTouch: 'Get in touch',
            welcomeTitle: "Welcome To Eco-Hive, Let's make our Earth Less Polluted with Recycling",
            welcomeOffer: 'Recycle. Shop. Repeat',
            login: 'Log in',
            signUp: 'Sign Up',
            buySellTitle: 'Buy and sell recyclable items to save our planet!',
            buySellOffer: 'Catch the items with a reasonable price',
            exploreHandmade: 'Explore Handmade Products',
            handmadeOffer: 'Handmade, Heartmade',
            orderNow: 'Order Now',
            exploreDeals: 'Explore Deals',
            shopNow: 'Shop Now',
            popularProducts: 'Popular products',
            seeMore: 'See more',
            mostBuyProducts: 'Most Bought Products',
            buyNow: 'Buy now',
            subscribeHeadline: 'Subscribe now & get 20% off',
            subscribeSub: 'Join the Eco-Hive community today! Get exclusive updates, early access to eco-friendly products, and enjoy 20% off your first order.',
            subscribePlaceholder: 'Enter your email',
            subscribeButton: 'Subscribe',
            reportBannerTitle: 'A Cleaner City Starts with You: Report Waste.',
            reportBannerSubtitle: 'Submit a ticket via the map to report excess waste in your district',
            report: 'Report',
            footerAbout: 'Eco-Hive is a digital marketplace designed to make sustainability simple and rewarding. From repurposed handmade goods to recyclable raw materials, you can shop, sell, and give waste a new life. Citizens can also report recyclable rubbish in public spaces with geotagged photos, helping municipal collectors recycle faster and keep our streets clean. By uniting people, businesses, and city services, Eco-Hive drives community engagement, a circular economy, and smarter urban living.'
            ,aboutHeadline: 'About Us',
            aboutBody: 'EcoHive is an innovative platform connecting buyers and sellers while empowering communities to report waste directly to municipal authorities. Tag waste locations on a live map, highlight environmental concerns, and help create cleaner cities. Shop, report, and make a difference with EcoHive!',
            aboutPoint1: 'Buy and sell products easily and securely.',
            aboutPoint2: 'Report waste by tagging locations on an interactive map.',
            aboutPoint3: 'All reports are sent to municipal authorities for action.',
            aboutPoint4: 'Join us in making your city cleaner and greener!',
            contactHeadline: 'Contact Us',
            contactBody: 'Have questions, feedback, or need support? Reach out to the EcoHive team and we’ll be happy to help!',
            contactEmail: 'Email',
            contactPhone: 'Phone',
            contactAddress: 'Address'
        },
        my: {
            home: 'ပင်မစာမျက်နှာ',
            shop: 'ဆိုင်',
            aboutUs: 'ကျွန်ုပ်တို့အကြောင်း',
            contactUs: 'ဆက်သွယ်ရန်',
            reportWaste: 'အမှိုက် အချက်ပေးရန်',
            sellerDashboard: 'ရောင်းချသူ ဒက်ရှ်ဘုတ်',
            account: 'အကောင့်',
            myOrders: 'အော်ဒါများ',
            products: 'ပစ္စည်းများ',
            cart: 'ဈေးလှည်း',
            company: 'ကုမ္ပဏီ',
            privacyPolicy: 'ကိုယ်ရေးကာကွယ်မှု မူဝါဒ',
            getInTouch: 'ဆက်သွယ်ရန်',
            welcomeTitle: 'Eco-Hive မှ ကြိုဆိုပါသည်ပြန်လည် အသုံးပြုခြင်းဖြင့် ကမ္ဘာပတ်ဝန်းကျင်ကို ထိန်းသိမ်းကာကွယ်ကြပါစို့',
            welcomeOffer: 'ပြန်သုံး၊ ဈေးဝယ်၊ ထပ်လုပ်',
            login: 'အကောင့်ဝင်',
            signUp: 'အကောင့်ဖန်တီး',
            buySellTitle: 'ပြန်လည်အသုံးပြုနိုင်သည့် ပစ္စည်းများ ဝယ်ယူ၍ ကမ္ဘာမြေကို ကယ်တင်ကြပါစို့!',
            buySellOffer: 'တန်ဖိုးသင့်ပစ္စည်းများ ရယူနိုင်ပါပြီ',
            exploreHandmade: 'လက်မှုပစ္စည်းများအား လေ့လာမှာနိုင်ပါပြီ',
            handmadeOffer: 'လက်မှု နှင့် နှလုံးမှု',
            orderNow: 'မှာယူရန်',
            exploreDeals: 'အထူးအခွင့်အလမ်းများ လေ့လာရန်',
            shopNow: 'အခု ဝယ်ပါ',
            popularProducts: 'လူကြိုက်များ သော ပစ္စည်းများ',
            seeMore: 'နောက်ထပ် ကြည့်ရန်',
            mostBuyProducts: 'အများဆုံး ဝယ်ယူခဲ့သည့် ပစ္စည်းများ',
            buyNow: 'ယခု ဝယ်မည်',
            subscribeHeadline: 'ယခု Subscribe လုပ်ပြီး ၂၀% လျှော့စျေး ရယူပါ',
            subscribeSub: 'Eco-Hive ကိုယနေ့ ပါဝင်ပါ! သီးသန့်သတင်းများ၊ သစ်လွင်သော ပစ္စည်းများကို အစောဆုံးရယူပြီး ပထမဆုံးမှာယူမှုမှာ ၂၀% လျှော့စျေး ရယူပါ။',
            subscribePlaceholder: 'Email ထည့်ပါ',
            subscribeButton: 'Subscribe',
            reportBannerTitle: 'သင်နှင့် စတင်ပါ မြို့ကို သန့်ရှင်းအောင် အမှိုက်ကို အချက်ပေးပါ',
            reportBannerSubtitle: 'မြေပုံမှတစ်ဆင့် သင်၏ နေရာဒေသရှိ အလွန်များသည့် အမှိုက်ကို တိုင်ပြပါ',
            report: 'တိုင်ပြမည်',
            footerAbout: 'Eco-Hive သည် သဘာဝအရင်းအမြစ် ထိန်းသိမ်းမှုကို လွယ်ကူ၍ အကျိုးရှိစွာ ဆောင်ရွက်နိုင်ရန် ရည်ရွယ်ထားသော ဒစ်ဂျစ်တယ် စျေးကွက်ဖြစ်ပါသည်။ပြန်လည်အသုံးပြုနိုင်သော လက်မှုပစ္စည်းများမှစ၍ သဘာဝပစ္စည်းများအထိ ဝယ်ယူရောင်းချနိုင်ပြီး အမှိက်ကို အသစ်အဖြစ်အသုံးချနိုင်ပါသည်။မြိုပေါ်တွင် တွေ့ရှိသော အမှိက်မျိုးစုံကို ဓာတ်ပုံနှင့် တည်နေရာဖြင့် တိုင်ကြားပေးနိုင်သဖြင့် မူပိုင်အာဏာရှိ ဝန်ထမ်းများအနေဖြင့် စနစ်တကျစုဆောင်း ပြန်လည်အသုံးပြုရာ၌ မြန်ဆန်စေပါသည်။ လူထု၊ စီးပွားရေးလုပ်ငန်းများ နှင့် မြိုပိုင် ဝန်ဆောင်မှုများကို ညှိနှိင်းပေးခြင်းကြောင့် ကွန်ယက်စက်ဝိုင်း စီးပွားရေးနှင့် ပိုမို ထိရောက်သော မြိုပြဘဝကို တိုးတက်စေပါသည်။'
            ,aboutHeadline: 'ကျွန်ုပ်တို့အကြောင်း',
            aboutBody: 'EcoHive သည် ဝယ်ယူရောင်းချသူများကို ချိတ်ဆက်ပေးနေရာမျိုးသာ မဟုတ်ဘဲ လူထုမှ အမှိုက်ပြဿနာများကို တိုက်ရိုက် မြို့ခံအာဏာပိုင်များထံ သတင်းပို့နိုင်စေသော ဖန်တီးဆန်းသစ်ထားသော ပလက်ဖောင်းဖြစ်ပါသည်။ မြေပုံပေါ်တွင် အမှိုက်နေရာများကို တိုင်ပြခြင်းဖြင့် ပတ်ဝန်းကျင်ပတ်သက်သည့် စိုးရိမ်အကြောင်းအရာများကို မူးဝွေ့ဖော်ထုတ်ကာ မြို့ကို ပိုမိုသန့်ရှင်းစေရာ အကူအညီပေးနိုင်ပါသည်။ ဝယ်ပါ၊ တိုင်ပြပါ၊ ကမ္ဘာအတွက် အကျိုးပြုပါ။',
            aboutPoint1: 'ပစ္စည်းများကို လုံခြုံစိတ်ချစွာ ဝယ်ယူ ရောင်းချနိုင်သည်။',
            aboutPoint2: 'အမှိုက်ကို အပြန်အလှန် အပြင်အဆင်မြေပုံပေါ်မှ တိုင်ပြနိုင်သည်။',
            aboutPoint3: 'တိုင်ကြားချက်များအားလုံးကို မြို့ပါတ်ဝန်ထမ်းများသို့ ပေးပို့ပေးပါသည်။',
            aboutPoint4: 'သင့်မြို့ကို  သန့်ရှင်းအောင် ကျွန်ုပ်တို့နှင့် ပူးပေါင်းပါ။',
            contactHeadline: 'ဆက်သွယ်ရန်',
            contactBody: 'မေးခွန်း၊ မှတ်ချက် သို့မဟုတ် အကူအညီ လိုအပ်ပါသလား? EcoHive အဖွဲ့ကို ဆက်သွယ်နိုင်ပါသည်။',
            contactEmail: 'အီးမေးလ်',
            contactPhone: 'ဖုန်း',
            contactAddress: 'လိပ်စာ'
        }
    }

    const t = (key) => translations[lang]?.[key] || translations.en[key] || key

    const toggleLanguage = () => setLang(prev => prev === 'en' ? 'my' : 'en')

    // persist language preference
    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('eco-lang') : null;
        if (stored && (stored === 'en' || stored === 'my')) setLang(stored);
    }, [])
    useEffect(() => {
        if (typeof window !== 'undefined') localStorage.setItem('eco-lang', lang)
    }, [lang])

    const fetchProductData = async () => {
        try {
            
            const {data} = await axios.get('/api/product/list')

            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
        try {

            if (user.publicMetadata.role === 'seller') {
                setIsSeller(true)
            }

            const token = await getToken()

            const { data } = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.user)
                setCartItems(data.user.cartItems)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const addToCart = async (itemId) => {

        if (!user) {
            return toast('Please login',{
                icon: '⚠️',
              })
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        if (user) {
            try {
                const token = await getToken()
                await axios.post('/api/cart/update', {cartData}, {headers:{Authorization: `Bearer ${token}`}} )
                toast.success('Item added to cart')
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        if (user) {
            try {
                const token = await getToken()
                await axios.post('/api/cart/update', {cartData}, {headers:{Authorization: `Bearer ${token}`}} )
                toast.success('Cart Updated')
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])


    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        lang, toggleLanguage, t
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}