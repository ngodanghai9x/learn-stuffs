import Redis from 'ioredis';

const redis = new Redis(`0.0.0.0:6379`);

async function useGeoCommands() {
    // Sử dụng GEOADD để thêm các tọa độ địa lý vào một key
    await redis.geoadd('locations', 13.361389, 38.115556, 'Palermo');
    await redis.geoadd('locations', 15.087269, 37.502669, 'Catania');

    console.log('Geo locations added successfully');

    // Tính khoảng cách giữa hai địa điểm (Palermo và Catania) bằng KM
    const distance = await redis.geodist('locations', 'Palermo', 'Catania', 'KM');
    console.log('Distance between Palermo and Catania:', distance, 'KM');

    // Lấy tọa độ của một địa điểm (Palermo)
    const position = await redis.geopos('locations', 'Palermo');
    console.log('Coordinates of Palermo:', position);

    // Tìm các địa điểm trong bán kính 200 KM từ Palermo
    const nearbyLocations = await redis.georadius(
        'locations',
        13.361389,
        38.115556,
        200,
        'KM',
        'WITHDIST',
    );
    console.log('Locations within 200 KM from Palermo:', nearbyLocations);

    // Tìm địa điểm trong bán kính 100 KM từ Catania
    const nearbyCatania = await redis.georadiusbymember('locations', 'Catania', 100, 'KM');
    console.log('Locations within 100 KM from Catania:', nearbyCatania);
    return redis.disconnect();
}

useGeoCommands().catch(console.error);
