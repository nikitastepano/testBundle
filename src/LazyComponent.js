import { useState, useEffect } from 'react';

function LazyComponent() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const generateLargeArray = () => {
        let array = [];
        for (let i = 0; i < 1000; i++) {
            array.push({
                id: i,
                value: `Item number ${i}`,
                randomValue: Math.random(),
                date: new Date().toISOString(),
                longString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + 'A'.repeat(100)
            });
        }
        return array;
    };

    const processData = () => {
        let processedData = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let processedItem = {
                ...item,
                title: item.value.toUpperCase(),
                description: item.longString.split(' ').slice(0, 5).join(' ') + '...',
                formattedDate: new Date(item.date).toLocaleString(),
            };
            processedData.push(processedItem);
        }
        return processedData;
    };

    const complexCalculation = () => {
        let result = 0;
        for (let i = 0; i < 100000; i++) {
            result += Math.sin(i) * Math.cos(i);
        }
        return result;
    };

    useEffect(() => {
        const fetchData = () => {
            setTimeout(() => {
                const fetchedData = generateLargeArray();
                setData(fetchedData);
                setLoading(false);
            }, 2000);
        };

        fetchData();
    }, []);

    const handleClick = () => {
        const value = complexCalculation();
        console.log('Calculation result:', value);
    };

    const renderedData = loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {processData().map(item => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <small>{item.formattedDate}</small>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <h1>Lazy Component</h1>
            <button onClick={handleClick}>Click me</button>
            {renderedData}
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
            </div>
        </div>
    );
}

export default LazyComponent;