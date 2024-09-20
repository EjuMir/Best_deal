import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Details = () => {
    const products = useLoaderData();
    const { _id } = useParams();
    const product = products.find(product => product._id === _id);
    return (
        <div className='flex items-start pt-16'>
            <div className='w-8/12 flex '>
                <div className='w-1/2 p-3'>
                    <p className='text-[#775050] text-lg font-normal'><Link to='/'>Home</Link> > Kitchen Appliances > Oven </p>
                    <div className='flex items-center gap-3 justify-end'>
                        <a className='text-[#775050] text-lg font-normal underline' href="">view comments</a>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
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
                    <div className='flex justify-center gap-6'>
                        <button className='bg-[#d9cfaf] rounded-[86px] text-black text-sm font-bold px-4 py-2'>Add To Cart </button>
                        <button className='bg-black rounded-[86px] text-white text-sm font-bold px-4 py-2'>Add To Wish List </button>
                    </div>
                    <div className='text-center mt-4'>
                        <button className='bg-[#ff6b1c] rounded-[86px] text-white text-sm font-bold px-8 py-2'>Buy Now</button>
                    </div>
                </div>
                <div className='p-3 w-1/2'>
                    <h3 className='text-[#775050] text-2xl font-normal'>{product.productName}</h3>
                    <h3 className='text-[#ff6b1c] text-3xl font-bold py-4'>${product.price}</h3>
                    <hr className='border-2 border-[#1d2236] w-full' />
                    <p className='text-[#775050] text-lg font-normal pt-2'>Brand: {product.brandName}</p>
                    <p className='text-[#775050] text-lg font-normal'>Description: {product.description}</p>

                </div>
            </div>
            <div className='w-4/12 h-full bg-[#d9d9d9] p-2'>
            <h3 className='text-white text-2xl font-bold'>More suggestions :</h3>
                <div className='flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div>
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between'>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <h5 className='text-[#1d2236] text-xl font-bold'>{product.price}</h5>

                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div>
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between'>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <h5 className='text-[#1d2236] text-xl font-bold'>{product.price}</h5>

                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div>
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between'>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <h5 className='text-[#1d2236] text-xl font-bold'>{product.price}</h5>

                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div>
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between'>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <h5 className='text-[#1d2236] text-xl font-bold'>{product.price}</h5>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;