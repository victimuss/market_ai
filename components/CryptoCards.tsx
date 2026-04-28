import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import CipherDecodeText from './CipherDecodeText';
import axios from 'axios';

interface Coin {
    id: string;
    symbol: string;
    priceUsd: string;
    changePercent24Hr: string;
}

export default function CryptoCards() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPrices = async () => {
        try {
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 7,
                    page: 1,
                    sparkline: false,
                }
            });

            const mappedCoins = response.data.map((coin: any) => ({
                id: coin.id,
                symbol: coin.symbol.toUpperCase(),
                priceUsd: coin.current_price.toString(),
                changePercent24Hr: coin.price_change_percentage_24h.toString(),
            }));

            setCoins(mappedCoins);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 30000);
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price: string) => {
        const num = parseFloat(price);
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchPrices();
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#CCFF00" />
                <Text style={styles.loaderText}>SYNCING WITH BLOCKCHAIN...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#CCFF00" />
            }
        >
            {coins.map((item, index) => {
                const isUp = parseFloat(item.changePercent24Hr) > 0;
                const accentColor = isUp ? '#CCFF00' : '#FF00E6';

                return (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.row}>
                            <CipherDecodeText
                                text={item.symbol}
                                style={styles.coinTicker}
                                startDelay={300 + index * 100}
                                repeatInterval={0}
                            />
                            <View style={[styles.changeBadge, { backgroundColor: `${accentColor}15` }]}>
                                <Text style={[styles.change, { color: accentColor }]}>
                                    {isUp ? '▲' : '▼'} {Math.abs(parseFloat(item.changePercent24Hr)).toFixed(2)}%
                                </Text>
                            </View>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.currency}>$</Text>
                            <Text style={styles.price}>{formatPrice(item.priceUsd)}</Text>
                        </View>

                        <View style={styles.progressBarBg}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    {
                                        width: `${Math.min(Math.abs(parseFloat(item.changePercent24Hr)) * 10, 100)}%`,
                                        backgroundColor: accentColor
                                    }
                                ]}
                            />
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
    },
    scrollContent: {
        paddingBottom: 40,
        gap: 16,
    },
    loader: {
        marginTop: 100,
        alignItems: 'center',
    },
    loaderText: {
        color: '#CCFF00',
        marginTop: 15,
        fontFamily: 'monospace',
        fontSize: 12,
        letterSpacing: 2,
    },
    card: {
        backgroundColor: 'rgba(20, 20, 20, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    coinTicker: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '900',
        fontFamily: 'monospace',
        letterSpacing: 1,
    },
    changeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    change: {
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '700',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    currency: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 18,
        marginRight: 4,
        marginTop: 4,
    },
    price: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '300',
        fontFamily: 'monospace',
        letterSpacing: -1,
    },
    progressBarBg: {
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginTop: 20,
        width: '100%',
        borderRadius: 1.5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 1.5,
    }
});
