// USER ACTIVITY ANALYTICS CHALLENGE
// =================================

// Problem: Given an array of user activity logs, return the top 3 most active users
// with their activity breakdown

const activityLogs = [
    { userId: 'user1', action: 'login', timestamp: 1634567890 },
    { userId: 'user2', action: 'purchase', timestamp: 1634567891 },
    { userId: 'user1', action: 'view', timestamp: 1634567892 },
    { userId: 'user3', action: 'login', timestamp: 1634567893 },
    { userId: 'user1', action: 'purchase', timestamp: 1634567894 },
    { userId: 'user2', action: 'login', timestamp: 1634567895 },
    { userId: 'user4', action: 'view', timestamp: 1634567896 },
    { userId: 'user1', action: 'view', timestamp: 1634567897 },
    { userId: 'user3', action: 'purchase', timestamp: 1634567898 },
    { userId: 'user2', action: 'view', timestamp: 1634567899 },
];

// Expected Output:
// [
//   { userId: 'user1', totalActivities: 4, breakdown: { login: 1, view: 2, purchase: 1 } },
//   { userId: 'user2', totalActivities: 3, breakdown: { purchase: 1, login: 1, view: 1 } },
//   { userId: 'user3', totalActivities: 2, breakdown: { login: 1, purchase: 1 } }
// ]

// IMPLEMENT YOUR SOLUTION HERE:
function getTopActiveUsers(logs = [], topN = 3) {
    // Your implementation here
    const userMap = {};
    logs.forEach((u) => {
        try {
            if (u && u.userId && !userMap[u.userId]) {
                // console.log('🚀 ~ t ~ map:', { map: userMap, u });
                userMap[u.userId] = [u];
            } else {
                const clone = [...(userMap[u.userId] || [])];
                clone.push(u);
                userMap[u.userId] = clone;
            }
        } catch (error) {
            // console.log('🚀 EEE:', { map: userMap, u });
            throw error;
        }
    });
    // console.log('🚀 ~ getTopActiveUsers ~ map:', userMap);

    const result = Object.keys(userMap)
        .map((userId) => {
            const userLogs = userMap[userId] || [];
            // console.log("🚀 ~ getTopActiveUsers ~ userLogs:", userLogs)
            const actionMap = {};
            userLogs.forEach((u) => {
                try {
                    if (u && u.action && !actionMap[u.action]) {
                        // console.log('🚀 ~ t ~ map22:', { map: actionMap, u });
                        actionMap[u.action] = [u];
                    } else {
                        const clone = [...(actionMap[u.action] || [])];
                        clone.push(u);
                        actionMap[u.action] = clone;
                    }
                } catch (error) {
                    // console.log('🚀 EEE222:', { map: actionMap, u });
                    throw error;
                }
            });

            // console.log('🚀 ~ getTopActiveUsers ~ actionMap:', actionMap);
            const breakdown = {};
            Object.keys(actionMap).forEach((action) => {
                const actionArr = actionMap[action];
                breakdown[action] = actionArr.length;
            });
            return {
                userId,
                totalActivities: userLogs?.length || 0,
                breakdown,
            };
        })
        .sort((a, b) => b.totalActivities - a.totalActivities);

    if (topN) {
        result.length = topN;
    }

    return result.filter((o) => !!o);
}

// TEST CASES
// ==========

function runTests() {
    console.log('🧪 Running Tests...\n');

    // Test 1: Basic functionality
    console.log('Test 1: Basic functionality');
    const result1 = getTopActiveUsers(activityLogs);
    console.log('Result:', JSON.stringify(result1, null, 2));

    const expected1 = [
        { userId: 'user1', totalActivities: 4, breakdown: { login: 1, view: 2, purchase: 1 } },
        { userId: 'user2', totalActivities: 3, breakdown: { purchase: 1, login: 1, view: 1 } },
        { userId: 'user3', totalActivities: 2, breakdown: { login: 1, purchase: 1 } },
    ];

    console.log('Expected:', JSON.stringify(expected1, null, 2));
    console.log('✅ Test 1:', deepEqual(result1, expected1) ? 'PASSED' : 'FAILED');
    console.log('---');
    // Test 2: Empty array
    console.log('Test 2: Empty array');
    const result2 = getTopActiveUsers([]);
    console.log('Result:', JSON.stringify(result2, null, 2));
    console.log('✅ Test 2:', result2.length === 0 ? 'PASSED' : 'FAILED');
    console.log('---');

    // return 1;
    // Test 3: Top N parameter
    console.log('Test 3: Top N parameter (top 2)');
    const result3 = getTopActiveUsers(activityLogs, 2);
    console.log('Result:', JSON.stringify(result3, null, 2));
    console.log(
        '✅ Test 3:',
        result3.length === 2 && result3[0].userId === 'user1' ? 'PASSED' : 'FAILED',
    );
    console.log('---');

    // Test 4: Single user
    console.log('Test 4: Single user multiple actions');
    const singleUserLogs = [
        { userId: 'user1', action: 'login', timestamp: 1634567890 },
        { userId: 'user1', action: 'view', timestamp: 1634567891 },
        { userId: 'user1', action: 'purchase', timestamp: 1634567892 },
    ];
    const result4 = getTopActiveUsers(singleUserLogs);
    console.log('Result:', JSON.stringify(result4, null, 2));
    console.log(
        '✅ Test 4:',
        result4.length === 1 && result4[0].totalActivities === 3 ? 'PASSED' : 'FAILED',
    );
    console.log('---');

    // Test 5: Tie in activity count
    console.log('Test 5: Users with same activity count');
    const tiedLogs = [
        { userId: 'userA', action: 'login', timestamp: 1 },
        { userId: 'userA', action: 'view', timestamp: 2 },
        { userId: 'userB', action: 'login', timestamp: 3 },
        { userId: 'userB', action: 'purchase', timestamp: 4 },
    ];
    const result5 = getTopActiveUsers(tiedLogs);
    console.log('Result:', JSON.stringify(result5, null, 2));
    console.log(
        '✅ Test 5:',
        result5.length === 2 && result5.every((u) => u.totalActivities === 2) ? 'PASSED' : 'FAILED',
    );
    console.log('---');

    // Performance test
    console.log('Test 6: Performance with large dataset');
    const largeLogs = [];
    for (let i = 0; i < 10000; i++) {
        largeLogs.push({
            userId: `user${i % 100}`,
            action: ['login', 'view', 'purchase'][i % 3],
            timestamp: i,
        });
    }

    const startTime = performance.now();
    const result6 = getTopActiveUsers(largeLogs);
    const endTime = performance.now();

    console.log(`Performance: ${endTime - startTime}ms for 10,000 records`);
    console.log('Top user activities:', result6[0]?.totalActivities);
    console.log(
        '✅ Test 6:',
        endTime - startTime < 100 ? 'PASSED (Good Performance)' : 'WARNING (Slow Performance)',
    );
}

// Helper function for deep equality check
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (!obj1 || !obj2) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

// Run the tests
runTests();
