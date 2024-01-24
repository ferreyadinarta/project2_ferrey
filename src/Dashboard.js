import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import BlocksAnalytics from './Small Components/BlocksAnalytics'
import { FaClipboard, FaThumbsUp, FaThumbsDown, FaFaceSmile, FaFaceFrown, FaMoneyBill, FaBagShopping } from 'react-icons/fa6'
import SmallBlocksAnalytics from './Small Components/SmallBlocksAnalytics'
import { Chart } from "react-google-charts";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material'


export default function Dashboard({ username }) {
    const [totalProduct, setTotalProduct] = useState(<Box sx={{ width: '100%' }}><LinearProgress /> </Box>)
    const [products, setProducts] = useState()
    const [chartData, setChartData] = useState(null)

    const totalSoldProducts = () => {
        if (products && products.length > 0) {
            const quantities = products.map(product => product.rating.count);
            const total = quantities.reduce((accumulator, current) => accumulator + current, 0);
            return total;
        }
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>);
    }

    const totalRevenue = () => {
        if (products && products.length > 0) {
            const totalRevenue = products.map(product => product.price * product.rating.count).reduce((accumulator, current) => accumulator + current, 0);
            return totalRevenue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        }
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>);
    }

    const mostPurchased = () => {
        if (products && products.length > 0) {
            const countsArray = products.map((product) => ({ count: product.rating.count, title: product.title }));
            const sortedCounts = countsArray.slice().sort((a, b) => b.count - a.count);
            return sortedCounts[0].title;
        }
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>);
    };

    const topRated = () => {
        if (products && products.length > 0) {
            const rates = products.map((product) => ({ rate: product.rating.rate, title: product.title }));
            const sortedCounts = rates.slice().sort((a, b) => b.rate - a.rate);
            return sortedCounts[0].title;
        }
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>);
    }

    const leastPurchased = () => {
        if (products && products.length > 0) {
            const counts = products.map((product) => ({ count: product.rating.count, title: product.title }));
            const sortedCounts = counts.slice().sort((a, b) => a.count - b.count);
            return sortedCounts[0].title;
        }
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>);
    }

    const leastRated = () => {
        if (products && products.length > 0) {
            const rates = products.map((product) => ({ rate: product.rating.rate, title: product.title }));
            const sortedCounts = rates.slice().sort((a, b) => a.rate - b.rate);
            return sortedCounts[0].title;
        }
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>);
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

    useEffect(() => {
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
            chartData.unshift(['Category', 'Total Rating']);  // Fix the order of labels
            setChartData(chartData);
        }
    }, [products]);

    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col w-full md:px-0'>
                    <div className='sm:fixed sm:z-[20] sm:bg-white'>
                        <Navbar username={username} title="Dashboard" subtitle="Here is the overview for your shop" />
                    </div>
                    {
                        chartData === null
                            ?
                            <div className='text-xl text-amber-500 my-auto ml-[40rem] lg:mx-auto lg:my-[20rem]'>
                                <CircularProgress />
                            </div>
                            :
                            <div className='mx-auto sm:-ml-8 sm:mt-5'>
                                <Chart
                                    chartType="PieChart"
                                    data={chartData}
                                    width={"500px"}
                                    height={"300px"}
                                />
                            </div>
                    }

                    <div className='grid grid-cols-3 -mt-16 z-[10] sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-3 lg:ml-0 lg:w-full lg:p-5 px-10'>
                        <BlocksAnalytics icon={<FaClipboard className='text-4xl' />} title={'Total Products'} value={totalProduct} otherinfo={'many more to come...'} />
                        <BlocksAnalytics icon={<FaMoneyBill className='text-4xl' />} title={'Total Revenue'} value={totalRevenue()} otherinfo={`many more to come...`} />
                        <div className='md:col-span-1 xl:col-span-2'>
                            <BlocksAnalytics icon={<FaBagShopping className='text-4xl' />} title={'Total Product Sold'} value={totalSoldProducts()} otherinfo={'Products'} />
                        </div>
                    </div>

                    <div className='grid grid-cols-4 sm:grid-cols-1 xl:grid-cols-2 gap-5 mt-6 lg:ml-0 lg:w-full xl:ml-16 lg:p-5 px-10'>
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
