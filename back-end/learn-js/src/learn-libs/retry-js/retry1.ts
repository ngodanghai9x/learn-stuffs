import axios from 'axios';
// import { OperationOptions } from 'retry';
import * as retry from 'retry';
// const { OperationOptions } = retry;
console.log('🚀 ~ retry:', retry);

// Cấu hình retry
const retryOptions: retry.OperationOptions = {
    retries: 3,
    minTimeout: 500,
    maxTimeout: 1000,
};

async function fetchData() {
    // const apiUrl = 'https://cf-ipfs.com/ipfs/Qmabps8r4nDwCiijT4xx6gm5QBKQ2LELXxaT5PJHKgJbbp'; // Thay thế URL này bằng URL API của bạn
    let apiUrl =
        'https://fake-haind.ipfs.nftstorage.link/';
    const operation = retry.operation(retryOptions);

    operation.attempt(async (currentAttempt) => {
        try {
            if (currentAttempt === 2) {
                apiUrl =
                    'https://bafkreidngihbtklrf4gxq4tirboxdtnhk23ah5ourdkwnjgl2o3hytu4cq.ipfs.nftstorage.link/';
            }
            const response = await axios.get(apiUrl);
            console.log('Data:', response.data);
        } catch (error: any) {
            if (operation.retry(error)) {
                console.log(`Retry attempt: ${currentAttempt}`);
                return;
            }
            console.error('Failed to fetch data after multiple attempts:', error);
        }
    });
}

fetchData();
