import { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView } from 'react-native';

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
        <ActivityIndicator size="large" color="#0000ff" />
    ) : (
        <ScrollView>
            {processData().map(item => (
                <View key={item.id} style={{ padding: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.formattedDate}</Text>
                </View>
            ))}
        </ScrollView>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Lazy Component</Text>
            <Button title="Click me" onPress={handleClick} />
            {renderedData}
            <View style={{ marginTop: 20 }}>
                <Text>Count: {count}</Text>
                <Button title="Increment Count" onPress={() => setCount(count + 1)} />
            </View>
        </View>
    );
}

export default LazyComponent;