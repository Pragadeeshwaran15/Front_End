import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import  {toast} from 'react-toastify';
import Pagination from 'react-js-pagination';

function Home(){
    const dispatch = useDispatch();
    const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null);
    const setCurrentPageNo = (pageNo) =>{

        setCurrentPage(pageNo)
       
    }
    //catogery function
    const handleCategoryClick = (categoryName) => {
        // Set the selected category when a button is clicked
        setCategory(categoryName);
        // Reset current page to 1 when category changes
        setCurrentPage(1);
    }

    useEffect(()=>{
        if(error) {
            return toast.error(error,{
                position: 'bottom-center'
            })
        }
        dispatch(getProducts(null, null, category,null, currentPage)) 
    }, [error, dispatch, currentPage,,category])


    return (
        <Fragment>
            <div className="button d-flex justify-content-around mt-2">
            
            <button type="button" className="Catogery" onClick={()=>handleCategoryClick("Mobile")}>Mobiles</button>
            <button type="button" className="Catogery" onClick={()=>handleCategoryClick("Accessories")}>Accessories</button>
            <button type="button" className="Catogery" onClick={()=>handleCategoryClick("Electronics")}>Electronics</button>
            <button type="button" className="Catogery" onClick={()=>handleCategoryClick("Sports")}>Sports</button>
            <button type="button" className="Catogery" onClick={()=>handleCategoryClick("Laptops")}>Laptops</button>
            <button type="button" className="Catogery" onClick={()=>handleCategoryClick("Headphones")}>Headphone</button>
          </div>
            {loading ? <Loader/>:
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading"> Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            { products && products.map(product => (
                                <Product col={3} key={product._id}  product={product}/>
                            ))}
                        
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage?
                    <div className="d-flex justify-content-center mt-5">
                           <Pagination 
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                           />     
                    </div> : null }
                </Fragment>
           }
        </Fragment>
    )
}

export default Home
