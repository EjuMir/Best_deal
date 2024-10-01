import { Rating } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import ProductsCounter from '../../Components/ProductCounter/ProductsCounter';
import { addToCart } from '../../features/CartSlice/CartSlice';
import CommentModal from '../../Components/CommentModal/CommentModal';
import { AuthContext } from '../../AuthProvider/AuthProvider';


const Details = () => {
    const products = useLoaderData();
    const { _id } = useParams();
    const product = products?.find(product => product._id === _id);
    // console.log(product);

    const {user} = useContext(AuthContext)


     
    // set quality from details
    const [quantity, setQuality] = useState(1)
    // console.log(quantity);


    const [open, setOpen] = useState(false);
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // dispatch products to redux
    const dispatch = useDispatch()

    // add product to redux store
    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, cartQuantity: quantity }));
    };



    return (
        <div className='flex-1 lg:flex items-start '>
            <Helmet>
                <title>Best Deal | {product?.productName}</title>
            </Helmet>
            <div className='lg:w-8/12 flex-1 lg:flex '>
                <div className='lg:w-1/2 p-3'>
                    {/* path indication */}
                    <p className='text-[#775050] dark:text-white  text-lg font-normal'>
                        <Link to='/'>Home</Link> {'>'} Kitchen Appliances {'>'} Oven
                    </p>

                    {/* View comments */}
                    <div className='flex items-center gap-3 justify-end'>
                        <Link onClick={handleOpen} className='text-[#775050] dark:text-white  text-lg font-normal underline' to="">
                            view comments
                        </Link>
                        <span className="block text-xs font-medium tracking-widest uppercase text-white ">
                            Ratings :{product.ratings} <Rating name="half-rating" size="small" defaultValue={product.ratings} precision={0.1} />

                        </span>
                        {/* Use the modal component */}
                        <CommentModal open={open} handleClose={handleClose}  userName={user?.displayName} photo={user?.photoURL} productId={_id} />
                    </div>
                    <div>
                        <Carousel showArrows={true} showThumbs={true}>
                            <div>
                                <img src={product.productImage} />

                            </div>
                            <div>
                                <img src={product.productImage} />

                            </div>
                            <div>
                                <img src={product.productImage} />

                            </div>
                            <div>
                                <img src={product.productImage} />

                            </div>
                        </Carousel>
                    </div>
                    <h1 className='dark:text-white'>This counter button is not working , have to work on this</h1>
                    <div className='flex justify-center gap-6'>

                        <ProductsCounter
                            key={product._id}
                            product={product}
                            setQuality={setQuality}
                            quality={quantity}
                        ></ProductsCounter>

                        <button onClick={() => handleAddToCart(product)} className='bg-[#d9cfaf] rounded-[86px] text-black text-sm font-bold px-4 py-2'>Add To Cart </button>
                        {/* <button className='bg-black rounded-[86px] text-white text-sm font-bold px-4 py-2'>Add To Wish List </button> */}
                    </div>
                    <div className='text-center mt-4'>

                        <Link to={`/single-checkout/${_id}`} onClick={() => handleBuyNow(product)} className='bg-[#ff6b1c] rounded-[86px] text-white text-sm font-bold px-8 py-2'>
                            Buy Now
                        </Link>
                    </div>
                </div>
                <div className='p-3 lg:w-1/2'>
                    <h3 className='text-[#775050] dark:text-white  text-2xl font-normal'>{product.productName}</h3>
                    <h3 className='text-[#ff6b1c] dark:text-white  text-3xl font-bold py-4'>${product.price}</h3>
                    <hr className='border-2 border-[#1d2236] w-full' />
                    <p className='text-[#775050] dark:text-white  text-lg font-normal pt-2'>Brand: {product.brandName}</p>
                    <p className='text-[#775050] dark:text-white  text-lg font-normal'>Description: {product.description}</p>

                </div>
            </div>
            <div className='lg:w-4/12 h-full bg-[#d9d9d9] p-2 dark:bg-[#34394C]'>
                <h3 className='text-white text-2xl font-bold'>More suggestions :</h3>
                <div className='dark:bg-[#D6DFF2] flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div className="flex-1">
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between w-full'>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                                <Rating name="half-rating" size="small" defaultValue={product.ratings} precision={0.1} />
                            </span>
                            <h5 className='text-[#1d2236] text-xl font-bold'>${product.price}</h5>
                        </div>
                    </div>
                </div>
                <div className='dark:bg-[#D6DFF2] flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div className="flex-1">
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between w-full'>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                                <Rating name="half-rating" size="small" defaultValue={product.ratings} precision={0.1} />
                            </span>
                            <h5 className='text-[#1d2236] text-xl font-bold'>${product.price}</h5>
                        </div>
                    </div>
                </div>
                <div className='dark:bg-[#D6DFF2] flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div className="flex-1">
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between w-full'>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                                <Rating name="half-rating" size="small" defaultValue={product.ratings} precision={0.1} />
                            </span>
                            <h5 className='text-[#1d2236] text-xl font-bold'>${product.price}</h5>
                        </div>
                    </div>
                </div>
                <div className='dark:bg-[#D6DFF2] flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div className="flex-1">
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between w-full'>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                                <Rating name="half-rating" size="small" defaultValue={product.ratings} precision={0.1} />
                            </span>
                            <h5 className='text-[#1d2236] text-xl font-bold'>${product.price}</h5>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Details;