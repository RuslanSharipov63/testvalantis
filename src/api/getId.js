import { formatDate } from "../helpers/formatDate";
const md5 = require("md5");

export const getId = async (fetchParam) => {
    try {
        let paramsDateUrl = await formatDate();
        let jsonData = fetchParam;
        const response = await fetch(`https://api.valantis.store:41000`, {
            method: "POST",
            headers: {
                "X-Auth": md5(`Valantis_${paramsDateUrl}`),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });
        if (response.ok) {
            let data = await response.text();
            let dataProduct = await JSON.parse(data);
            let dataProductWithoutDuplicate = await [...new Set(dataProduct.result)];
            return dataProductWithoutDuplicate;
        }
        if (!response.ok) {
            return false
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}