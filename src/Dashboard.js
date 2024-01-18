import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import BlocksAnalytics from './Small Components/BlocksAnalytics'
import { FaClipboard, FaThumbsUp, FaThumbsDown, FaFaceSmile, FaFaceFrown, FaMoneyBill, FaBagShopping } from 'react-icons/fa6'
import SmallBlocksAnalytics from './Small Components/SmallBlocksAnalytics'
import { PieChart } from '@mui/x-charts/PieChart';
import { Chart } from "react-google-charts";


export default function Dashboard({ username }) {
    const [totalProduct, setTotalProduct] = useState('0')
    const [products, setProducts] = useState()

    const totalSoldProducts = () => {
        if (products && products.length > 0) {
            const quantities = products.map(product => product.rating.count);
            const total = quantities.reduce((accumulator, current) => accumulator + current, 0);
            return total;
        }
        return '0';
    }

    const totalRevenue = () => {
        if (products && products.length > 0) {
            const totalRevenue = products.map(product => product.price * product.rating.count).reduce((accumulator, current) => accumulator + current, 0);
            return totalRevenue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        }
        return '$0.00';
    }

    const mostPurchased = () => {
        if (products && products.length > 0) {
            const countsArray = products.map((product) => ({ count: product.rating.count, title: product.title }));
            const sortedCounts = countsArray.slice().sort((a, b) => b.count - a.count);
            return sortedCounts[0].title;
        }
        return 'None';
    };

    const topRated = () => {
        if (products && products.length > 0) {
            const rates = products.map((product) => ({ rate: product.rating.rate, title: product.title }));
            const sortedCounts = rates.slice().sort((a, b) => b.rate - a.rate);
            return sortedCounts[0].title;
        }
        return 'None';
    }

    const leastPurchased = () => {
        if (products && products.length > 0) {
            const counts = products.map((product) => ({ count: product.rating.count, title: product.title }));
            const sortedCounts = counts.slice().sort((a, b) => a.count - b.count);
            return sortedCounts[0].title;
        }
        return 'None';
    }

    const leastRated = () => {
        if (products && products.length > 0) {
            const rates = products.map((product) => ({ rate: product.rating.rate, title: product.title }));
            const sortedCounts = rates.slice().sort((a, b) => a.rate - b.rate);
            return sortedCounts[0].title;
        }
        return 'None';
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get('https://fakestoreapi.com/products');
                setProducts(productsResponse.data);
                setTotalProduct(productsResponse.data.length);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const generateData = () => {
        if (products && products.length > 0) {
            if (products && products.length > 0) {
                const categoryRatingCounts = {};

                products.forEach((product) => {
                    const category = product.category;
                    const ratingCount = product.rating.count;

                    if (categoryRatingCounts[category]) {
                        categoryRatingCounts[category] += ratingCount;
                    } else {
                        categoryRatingCounts[category] = ratingCount;
                    }
                });
                const chartData = Object.entries(categoryRatingCounts).map(([category, totalRatingCount]) => ([
                    category,
                    totalRatingCount,
                ]));
                chartData.unshift(['Total Rating', 'Category'])
                return chartData;
            }
        }
        return [];
    }
    
    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col w-full'>
                    <Navbar username={username} title="Dashboard" subtitle="Here is the overview for your shop" />
                    <Chart
                        chartType="PieChart"
                        data={generateData()}
                        width={"100%"}
                        height={"400px"}
                    />
                    {/* <PieChart
                            colors={['red', 'blue', 'green', 'yellow']}
                            series={[
                                {
                                    data: generateData(),
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { color: 'gray' },
                                },
                            ]}
                            width={600 }
                            height={200}
                        /> */}

                    <div className='grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-3 w-full'>
                        <BlocksAnalytics icon={<FaClipboard className='text-4xl' />} title={'Total Products'} value={totalProduct} otherinfo={'many more to come...'} />
                        <BlocksAnalytics icon={<FaMoneyBill className='text-4xl' />} title={'Total Revenue'} value={totalRevenue()} otherinfo={`many more to come...`} />
                        <div className='md:col-span-1 xl:col-span-2'>
                            <BlocksAnalytics icon={<FaBagShopping className='text-4xl' />} title={'Total Product Sold'} value={totalSoldProducts()} otherinfo={'Products'} />
                        </div>
                    </div>

                    <div className='grid grid-cols-4 sm:grid-cols-1 xl:grid-cols-2 gap-5 mt-6 w-full'>
                        <SmallBlocksAnalytics icon={<FaFaceSmile className='text-7xl' />} title={'Most Purchased Product'} value={mostPurchased()} />
                        <SmallBlocksAnalytics icon={<FaThumbsUp className='text-8xl' />} title={'Top Rated Product'} value={topRated()} />
                        <SmallBlocksAnalytics icon={<FaFaceFrown className='text-4xl sm:text-5xl md:text-4xl xl:text-6xl' />} title={'Least Purchased Product'} value={leastPurchased()} />
                        <SmallBlocksAnalytics icon={<FaThumbsDown className='text-6xl' />} title={'Least Rated Product'} value={leastRated()} />
                    </div>
                </div>
            </div>
        </>

    )
}
