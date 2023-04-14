const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
    }).format(amount / 100);
}

export default formatPrice;