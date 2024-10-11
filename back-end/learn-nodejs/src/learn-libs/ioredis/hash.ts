import Redis from 'ioredis';

const redis = new Redis(`0.0.0.0:6379`);

async function useHash() {
    // Sử dụng HSET để thiết lập các field và giá trị cho hash "user:1000"
    await redis.hset('user:1000', 'name', 'John Doe');
    await redis.hset('user:1000', 'age', 30);
    await redis.hset('user:1000', 'email', 'john@example.com');

    console.log('Hash fields set successfully');

    // Sử dụng HGET để lấy giá trị của field 'name' từ hash "user:1000"
    const name = await redis.hget('user:1000', 'name');
    console.log('Name:', name); // Kết quả sẽ là "John Doe"

    // Sử dụng HGET để lấy giá trị của field 'email' từ hash "user:1000"
    const email = await redis.hget('user:1000', 'email');
    console.log('Email:', email); // Kết quả sẽ là "john@example.com"

    // Lấy giá trị không tồn tại (sẽ trả về null)
    const address = await redis.hget('user:1000', 'address');
    console.log('Address:', address); // Kết quả sẽ là null
    
    await redis.hdel('user:1000', 'age');

    const obj = await redis.hgetall('user:1000');
    console.log('obj:', obj); // { name: 'John Doe', age: '30', email: 'john@example.com' }
}

useHash().catch(console.error);
