import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { IoSaveOutline } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ScrollRestoration } from "react-router-dom";
import Swal from "sweetalert2";
import CartCard from "../../Components/CartCard/CartCard";
import CheckOutForm from "../../Components/CheckOutForm/CheckOutForm";
import PaymentModal from "../../Components/Modals/PaymentModal";
import NothingInCart from "../../Components/NothingInCart/NothingInCart";
import { removeAllFromCartlist } from "../../features/CartSlice/CartSlice";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { localDate } from './../../utils/useBDdateTime';
import useAxiosSecure from "../../hooks/useAxiosSecure";



const CartPage = () => {

    const axiosCommon = useAxiosCommon()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const userEmail = user?.email


    // cart data from redux store
    const cart = useSelector((state) => state.cart)

    const cartProducts = cart.cartIteams

    const dispacth = useDispatch()



    // Calculate total quantity and total amount
    const totalQuantity = cart?.cartIteams?.reduce((total, item) => total + item?.cartQuantity, 0);

    const totalAmount = cart?.cartIteams?.reduce((total, item) => {
        const price = item?.price;
        const discount = item?.discount ? item.price * (item.discount / 100) : 0; // Calculate discount if available
        const finalPrice = price - discount;
        return total + (item?.cartQuantity * finalPrice);
    }, 0);

    // Apply discount 
    const discount = 0.00 * totalAmount;
    const grandTotal = totalAmount - discount;

    // state for contact information
    const [contactInfo, setContactInfo] = useState(null)

    // contact info
    const onSubmit = async (data) => {

        // fetch data from the form
        const { address, contact, name, paymentMethod } = data;
        const trackingNumber = contact + Date.now()
        const data2 = { address, contact, name, paymentMethod, trackingNumber };
        // console.log(data, data2)

        {
            paymentMethod !== "Cash on delivery"
                ? setContactInfo(data)
                : setContactInfo(data2)
        }
    }

    // insert checkout data for "Cash on delivery"
    const orderDate = localDate(new Date());
    // const orderDate = new Date().toUTCString();
    const items = [cart.cartIteams];
    const status = 'Ordered';
    const paymentMethod = contactInfo?.paymentMethod || "CoD";

    const booking = { orderDate, items, totalAmount, status, paymentMethod };
    const codBooking = { ...booking, ...contactInfo };

    console.log(contactInfo, booking, codBooking)


    // clear all products from cartList
    const handleClearCartList = () => {

        Swal.fire({
            title: `Do you want to remove your Cart list?`,
            text: ` It will remove ${cart?.cartIteams?.length} items from your cart `,
            imageUrl: "https://i.ibb.co.com/rpHtZmy/oh-no-message-bubble-sticker-vector-removebg-preview.png",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
            showCancelButton: true,
            confirmButtonColor: "#1D2236",
            cancelButtonColor: "#775050",
            confirmButtonText: "Yes, Delete All!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Cart is now Empty!",
                    icon: "success"
                });
                dispacth(removeAllFromCartlist())
            }
        });
    }


    const cartItem = { userEmail, cartProducts }

    // save and update cart
    const handleSaveCart = () => {

        const res = axiosCommon.post(`/cartList`, cartItem)
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
                    // loggedOut()
                    toast.success('Cart Saved');
                    // localStorage.clear()
                }
            })
            .catch((error) => {
                // If the error response exists, display the message from the server
                if (error.response) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage); // Show the server's error message in a toast
                }
            });

    }

    // post CoD status
    const handleCoDStatus = async () => {

        try {
            // input status to user
            await axiosSecure.post(`/purchaseHistory/${user?.email}`, booking)
            await axiosSecure.post(`/billingAddress/${user?.email}`, contactInfo)
            // input shippingInformation for vendor
            await axiosSecure.post(`/ordersReq/${user?.email}`, codBooking)
        }
        catch (err) {

        }
    }

    return (
        <div className=" mx-auto p-5 gap-y-5 md:gap-5">
            <Helmet>
                <title>Best Deal | Cart list</title>
            </Helmet>
            <ScrollRestoration></ScrollRestoration>

            {/*Left Side menubar / categorybar  */}
            {/* <div className="">
                <LeftMenubar></LeftMenubar>
            </div> */}

            {/* cart list */}
            <div className="w-full  mx-auto lg:w-3/4 flex flex-col lg:flex-row gap-5 justify-around ">
                <div className="w-full lg:w-[65%] ">
                    {
                        cart?.cartIteams?.length === 0 ?
                            <div><NothingInCart /></div> :
                            <div>
                                <div>
                                    {cart?.cartIteams?.map(product => (
                                        <CartCard
                                            key={product?._id}
                                            product={product}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-4">

                                    <div onClick={handleSaveCart} className="flex btn items-center dark:text-white gap-2 text-lg  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]">
                                        <IoSaveOutline />
                                        <h1>Save Cart</h1>
                                    </div>

                                    <div onClick={handleClearCartList} className="flex btn items-center dark:text-white gap-2 text-lg  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]">
                                        <MdDeleteSweep />
                                        <h1>Clear Cartlist</h1>
                                    </div>
                                </div>
                            </div>
                    }
                </div>

                {/* Total bill Table */}
                <div className="flex-grow" >
                    <div className=" bg-[rgb(217,217,217)] dark:bg-[#34394C] dark:text-white  h-fit">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-white dark:text-black dark:bg-[#D6DFF2] bg-[#775050]">Quantity</th>
                                        <th className="text-white dark:text-black dark:bg-[#D6DFF2] bg-[#775050]">Total Amounts</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black dark:text-white">
                                    {/* Quantity & Total Amounts */}
                                    <tr>
                                        <td>Item {totalQuantity} pcs</td>
                                        <td>$ {totalAmount?.toFixed(2)}</td>
                                    </tr>
                                    {/* Discount */}
                                    <tr className="dark:bg-[#34394C]">
                                        <td>Discount</td>
                                        <td>0%</td>
                                    </tr>
                                    {/* Grand Total */}
                                    <tr>
                                        <td>Grand Total</td>
                                        <td>$ {grandTotal?.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* payment */}
                    {
                        // cart?.cartIteams?.length === 0 ? ''
                        //     : 
                            <div>
                                {/* address form */}
                                <CheckOutForm
                                    onSubmit={onSubmit}
                                    contactInfo={contactInfo}
                                ></CheckOutForm>


                                {/* payment method */}
                                {
                                    contactInfo?.paymentMethod === "Card"
                                    && <PaymentModal
                                        CheckoutPrice={parseInt(grandTotal.toFixed(2))}
                                        contactInfo={contactInfo}
                                        handleClearCartList={handleClearCartList}
                                    />
                                }
                                {
                                    contactInfo?.paymentMethod === "Cash on delivery"
                                    && <button
                                        className="mt-8 w-full btn block px-8 py-2.5  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]"
                                    // onClick={() => handleCoDStatus()}
                                    >
                                        {/* {(loading) ? <TbFidgetSpinner size={20} className="animate-spin w-full" /> : (!changeInvoice ? 'Checkout' : 'Invoice')} */}
                                        Proceed
                                    </button>
                                }

                            </div>
                    }

                </div>

            </div>
        </div>
    );
};

export default CartPage;