import axios from 'axios';
import axiosRetry from 'axios-retry';

// Cấu hình retry cho axios với axios-retry
axiosRetry(axios, {
    retries: 3, // Số lần thử lại tối đa
    retryCondition: (error) => {
        // Kiểm tra điều kiện để thử lại (mặc định là bất kỳ lỗi nào)
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
    retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 10000; // Thời gian chờ trước khi thử lại (ms)
    },
});

async function fetchData() {
    // const apiUrl = 'https://cf-ipfs.com/ipfs/Qmabps8r4nDwCiijT4xx6gm5QBKQ2LELXxaT5PJHKgJbbp'; // Thay thế URL này bằng URL API của bạn
    const apiUrl =
        'https://3bafkreidngihbtklrf4gxq4tirboxdtnhk23ah5ourdkwnjgl2o3hytu4cq.ipfs.nftstorage.link/';

    try {
        const response = await axios.get(apiUrl);
        console.log('Data:', response.data);
    } catch (error) {
        console.error('Failed to fetch data:', error?.message);
    }
}

fetchData();
