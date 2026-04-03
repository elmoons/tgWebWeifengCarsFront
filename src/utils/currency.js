export async function getRates() {

    const res = await fetch(
        "https://www.cbr-xml-daily.ru/daily_json.js"
    );

    const data = await res.json();

    return {
        CNY: data.Valute.CNY.Value,
        EUR: data.Valute.EUR.Value
    };

}