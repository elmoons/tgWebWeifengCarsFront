export const CONFIG = {
    currency: {
        markup_percent_default: 2.5
    },

    fixed_costs: {
        china_logistics_cny: 12500,
        russia_costs_rub: 85000
    },

    duty_eur_per_cc: {
        "3to5": [1.5, 1.7, 2.5, 2.7, 3.0, 3.6],
        "gt5": [3.0, 3.2, 3.5, 4.8, 5.0, 5.7],
        "lt3_min": [3.2, 3.5, 5.5, 7.5, 15.0, 20.0]
    },

    customs_fee_rub: [
        { max: 200000, fee: 1067 },
        { max: 450000, fee: 2134 },
        { max: 1200000, fee: 4269 },
        { max: 2700000, fee: 11746 },
        { max: 4200000, fee: 16524 },
        { max: 5500000, fee: 21344 },
        { max: 7000000, fee: 27540 },
        { max: null, fee: 30000 }
    ],

    recycling_fee_personal_rub: {
        lt3: 3400,
        gte3: 5200
    }
};