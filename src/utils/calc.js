import { CONFIG } from "./config";

function getEngineIndex(engine) {
    if (engine <= 1000) return 0;
    if (engine <= 1500) return 1;
    if (engine <= 1800) return 2;
    if (engine <= 2300) return 3;
    if (engine <= 3000) return 4;
    return 5;
}

function getCustomsFee(priceRub) {
    for (let item of CONFIG.customs_fee_rub) {
        if (item.max === null || priceRub <= item.max) {
            return item.fee;
        }
    }
    return 0;
}

function getAge(year, month) {
    const now = new Date();
    let age = now.getFullYear() - year;
    if (month && (now.getMonth() + 1) < month) {
        age -= 1;
    }
    return age;
}

export function calculate({ priceCNY, engine, year, month, coef }, rates) {

    const cnyRateCBR = rates.CNY;        // для таможни
    const cnyRateReal = rates.CNY * coef; // для клиента
    const eurRate = rates.EUR;

    const priceRubCBR = priceCNY * cnyRateCBR;
    const priceEur = Math.round(priceRubCBR / eurRate);

    const priceRub = priceCNY * cnyRateReal;

    const age = getAge(year, month);
    const engineIndex = getEngineIndex(engine);

    let dutyRub = 0;

    // 🚗 ДО 3 ЛЕТ (ФТС / TKS)
    if (age < 3) {

        let percent;
        let minPerCC;

        if (priceEur <= 8500) {
            percent = 0.54;
            minPerCC = 2.5;
        } else if (priceEur <= 16700) {
            percent = 0.48;
            minPerCC = 3.5;
        } else if (priceEur <= 42300) {
            percent = 0.48;
            minPerCC = 5.5;
        } else if (priceEur <= 84500) {
            percent = 0.48;
            minPerCC = 7.5;
        } else if (priceEur <= 169000) {
            percent = 0.48;
            minPerCC = 15;
        } else {
            percent = 0.48;
            minPerCC = 20;
        }

        const byPercent = priceEur * percent;
        const byEngine = engine * minPerCC;

        const dutyEur = Math.max(byPercent, byEngine);

        dutyRub = Math.round(dutyEur * eurRate);
    }

    // 🚗 3-5 ЛЕТ
    else if (age <= 5) {
        const rate = CONFIG.duty_eur_per_cc["3to5"][engineIndex];
        dutyRub = engine * rate * eurRate;
    }

    // 🚗 5+ ЛЕТ
    else {
        const rate = CONFIG.duty_eur_per_cc["gt5"][engineIndex];
        dutyRub = engine * rate * eurRate;
    }

    const customsFee = getCustomsFee(priceRubCBR);

    const recyclingFee =
        age < 3
            ? CONFIG.recycling_fee_personal_rub.lt3
            : CONFIG.recycling_fee_personal_rub.gte3;

    // расходы по Китаю
    const chinaLogistics = CONFIG.fixed_costs.china_logistics_cny;
    const swiftCNY = Math.round((priceCNY + chinaLogistics) * 0.02); // 2%
    const chinaCostsCNY = chinaLogistics + swiftCNY;
    const chinaCostsRub = chinaCostsCNY * cnyRateReal;

    const total =
        priceRub +
        dutyRub +
        customsFee +
        recyclingFee +
        chinaCostsRub +
        CONFIG.fixed_costs.russia_costs_rub +
        CONFIG.fixed_costs.company_commission_rub;

    return {
        total: Math.round(total),
        dutyRub: Math.round(dutyRub),
        customsFee,
        recyclingFee,
        chinaCostsCNY,
        chinaCostsRub: Math.round(chinaCostsRub),
        priceRub: Math.round(priceRub),
        swiftCNY,
        chinaLogistics,
        companyCommission: CONFIG.fixed_costs.company_commission_rub
    };
}