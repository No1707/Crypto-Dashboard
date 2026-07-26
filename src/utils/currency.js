const CURRENCY_SIGNS = {
    usd: '$',
    eur: '€',
    jpy: '¥',
    gbp: '£',
    chf: 'CHF',
    cad: 'CA$',
    nzd: 'NZ$',
}

export function getCurrencySign(currency) {
    return CURRENCY_SIGNS[currency.toLowerCase()] ?? ''
}
